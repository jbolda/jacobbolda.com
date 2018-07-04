import Typography from "typography";
import lawtonTheme from "typography-theme-lawton";

const typography = new Typography(lawtonTheme);

const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };
