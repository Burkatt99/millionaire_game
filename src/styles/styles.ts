import { PALLETE } from "./pallete";

export const COLORS = {
  WHITE: PALLETE.white,
  BACKGROUND: {
    DEFAULT: PALLETE.white,
    ACCENT: PALLETE.orange_5,
    NEUTRAL: PALLETE.black_5,
    SUCCESS: PALLETE.green_5,
    DANGER: PALLETE.red_5,
  },
  TEXT: {
    PRIMARY: PALLETE.black,
    SECONDARY: PALLETE.black_40,
    ACCENT: PALLETE.orange_100,
    INVERSE: PALLETE.white,
  },
  ICONS: {
    DEFAULT: PALLETE.black,
  },
  BORDER: {
    DEFAULT: PALLETE.black_40,
    WARNING: PALLETE.orange_100,
    DANGER: PALLETE.red_100,
    SUCCESS: PALLETE.green_100,
  },
  BUTTONS: {
    INACTIVE: PALLETE.orange_100,
    HOVER: PALLETE.orange_80,
    PRESSED: PALLETE.orange_120,
  },
};
