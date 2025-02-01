// types/json.d.ts
declare module "*/themes.json" {
  const value: Array<{
    name: string;
    systemNavigation: string;
    selectedItems: string;
    presenceIndication: string;
    notifications: string;
    windowGradient: boolean;
    darkerSidebars: boolean;
    submitterName?: string;
    submitterLink?: string;
    tags?: string;
  }>;
  export default value;
}
