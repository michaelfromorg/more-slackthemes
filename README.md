# Slack Themes 🎨

A modern web application for browsing, sharing, and generating Slack themes. Built with Next.js, React, and TypeScript.

[![Built with Next.js](https://img.shields.io/badge/Built_with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styled-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black?style=flat-square)](https://ui.shadcn.com)

Inspired by [Slack Themes](https://slackthemes.com).

## Features

- Browse and search Slack themes
- Generate themes from workspace logos
- Live theme preview with Slack interface simulation
- Responsive design with mobile support
- Keyboard navigation
- Quick theme copying and application

## Getting Started

### Prerequisites

- Node.js 22.x or higher (`lts/jod` is recommended via `nvm`)
- npm, yarn, or pnpm

### Installation

1. Clone the repository.

    ```bash
    gh repo clone michaelfromorg/more-slackthemes
    cd slack-themes
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Start the development server.

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

Within `src/`.

```plaintext
├── app/                   # Next.js app directory
├── components/
│   ├── layout/            # Layout components
│   ├── themes/            # Theme-related components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── store/                 # State management
└── public/                # Static assets
```

## Technologies

- Language: [TypeScript](https://typescriptlang.org)
- Framework: [Next.js](https://nextjs.org)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- Components: [shadcn/ui](https://ui.shadcn.com)
- State: [Zustand](https://github.com/pmndrs/zustand)
- Colors: [chroma.js](https://gka.github.io/chroma.js)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'A description of the changes'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## Development

### Building for Production

```bash
npm run build
```

The project will be built to the `out` directory for static deployment.

### Deployment

This is a static site that can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. The current deployment uses GitHub Pages.

## Need Help?

If you have questions or run into issues, please check the [Issues](https://github.com/michaelfromorg/more-slackthemes/issues) page or create a new issue.

## Author

- [@michaelfromyeg](https://github.com/michaelfromyeg)

---

"Slack Themes" is not affiliated with Slack in any way, shape, or form.
