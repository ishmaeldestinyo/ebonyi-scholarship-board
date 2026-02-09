export type ColorProps = {
  name: string;
};

export const Colors = {
  // Primary Brand Colors
  saffronColor: "#fcb929",
  deepForestGreen: "#0a4c3d",
  chiliRed: "#c70e1d",

  // Accent Colors
  higlightHover: "#E2a517",
  secondaryLight: "#fff6d6",
  secondaryBorder: "#ffd369",

  // Flat fallback for legacy components
  backgroundColor: "#ffffff",

  // Theme Backgrounds
  light: {
    background: "#ffffff",
    foreground: "#0a4c3d", // deepForestGreen as primary text
    border: "#eaeaea",
    surface: "#fffaf0", // very soft tone
  },

  dark: {
    background: "#0a4c3d", // deep forest green
    foreground: "#ffffff",
    border: "#265e55",
    surface: "#102c26", // darker card or surface bg
  },
};
