import { themeVariables } from "./themeVariables";

export interface CustomTheme {
    variables: Record<(typeof themeVariables)[number]["name"], string>;
}

export const ExampleTheme: CustomTheme = {
    variables: {
        "--panelColorNormal": "rgba(0,0,0,1)",
    },
};
