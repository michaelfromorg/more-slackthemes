#!/usr/bin/env python3
"""
Convert Slack themes from paracycle/slackthemes to the new Slack design system format. Outputs a CSV with the converted themes.

This script was used to kickstart my Notion database.

Run via `uv`, i.e., `uv run --with requests --with PyYAML --with typing-extensions scripts/paracycle.py`.

The new Slack theme system uses four main colors:

- System Navigation: Primary navigation color
- Selected Items: Color for selected/active items
- Presence Indication: Online/presence status color
- Notifications: Color for notification badges

Plus an optional window gradient setting.
"""

import csv
import sys
from pathlib import Path
from typing import List, TypedDict

import requests  # type: ignore
import yaml  # type: ignore
from typing_extensions import NotRequired  # type: ignore


# Type definitions to match TypeScript interfaces
class Submitter(TypedDict):
    name: str
    link: NotRequired[str]


class SlackTheme(TypedDict):
    name: str
    colors: str  # Comma-separated color values
    submitter: NotRequired[Submitter]
    tags: NotRequired[List[str]]


class ModernSlackTheme(TypedDict):
    name: str
    system_navigation: str
    selected_items: str
    presence_indication: str
    notifications: str
    window_gradient: bool
    darker_sidebars: bool
    submitter: NotRequired[Submitter]
    tags: NotRequired[List[str]]


def fetch_themes() -> List[SlackTheme]:
    """Fetch themes from the paracycle GitHub repository."""
    url = (
        "https://raw.githubusercontent.com/paracycle/slackthemes/master/data/themes.yml"
    )
    response = requests.get(url)
    response.raise_for_status()

    raw_themes = yaml.safe_load(response.text)
    return [
        {
            "name": theme["name"],
            "colors": theme["colors"],
            "submitter": {
                "name": "paracycle",
                "link": "https://github.com/paracycle/slackthemes",
            },
            "tags": ["paracycle"],
        }
        for theme in raw_themes
    ]


def convert_theme(theme: SlackTheme) -> ModernSlackTheme:
    """Convert old theme format to new Slack design system.

    The old format had these colors in order:
    Column BG, Menu BG, Active Item, Active Item Text, Hover Item,
    Text Color, Active Presence, Mention Badge

    New format uses:
    System Navigation, Selected Items, Presence Indication, Notifications
    """
    colors = theme["colors"].split(",")

    return {
        "name": theme["name"],
        "system_navigation": colors[1].strip(),  # Use Menu BG as system nav
        "selected_items": colors[2].strip(),  # Use Active Item
        "presence_indication": colors[6].strip(),  # Use Active Presence
        "notifications": colors[7].strip(),  # Use Mention Badge
        "window_gradient": False,  # Default to False
        "darker_sidebars": False,  # Default to False
        "submitter": theme.get("submitter"),
        "tags": theme.get("tags", []),
    }


def write_csv(themes: List[ModernSlackTheme], output_path: Path) -> None:
    """Write converted themes to CSV file."""
    fieldnames = [
        "Name",
        "System Navigation",
        "Selected Items",
        "Presence Indication",
        "Notifications",
        "Window Gradient",
        "Darker Sidebars",
        "Submitter Name",
        "Submitter Link",
        "Tags",
    ]

    with output_path.open("w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for theme in themes:
            # Flatten the structure for CSV
            row = {
                "Name": theme["name"],
                "System Navigation": theme["system_navigation"],
                "Selected Items": theme["selected_items"],
                "Presence Indication": theme["presence_indication"],
                "Notifications": theme["notifications"],
                "Window Gradient": theme["window_gradient"],
                "Darker Sidebars": theme["darker_sidebars"],
                "Submitter Name": theme["submitter"]["name"]
                if "submitter" in theme
                else "",
                "Submitter Link": theme["submitter"].get("link", "")
                if "submitter" in theme
                else "",
                "Tags": ",".join(theme.get("tags", [])),
            }
            writer.writerow(row)


def main() -> None:
    # Setup paths
    script_path = Path(__file__)
    output_path = script_path.parent / "paracycle.csv"

    try:
        # Fetch and convert themes
        print("Fetching themes...")
        old_themes = fetch_themes()

        print("Converting themes to new format...")
        modern_themes = [convert_theme(theme) for theme in old_themes]

        print(f"Writing {len(modern_themes)} themes to CSV...")
        write_csv(modern_themes, output_path)

        print(f"Conversion complete! Output saved to: {output_path}")

    except requests.RequestException as e:
        print(f"Error fetching themes: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error during conversion: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
