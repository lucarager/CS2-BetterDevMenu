import React from "react";
import { Panel } from "cs2/ui";
import styles from "./styles.module.scss";
import { VT } from "vanilla/Components";
import { themeVariables } from "./themeVariables";
import { CustomTheme } from "theme";

const loadTheme = (theme: CustomTheme) => {
    Object.entries(theme.variables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
};

export const ThemeEditor: React.FC<{
    var?: string;
}> = (props) => {
    return <></>;

    const DimensionInput: React.FC<{ name: string; value: string }> = ({ name, value }) => {
        return <input name={name} value={value} type="text" />;
    };

    const ColorInput: React.FC<{ name: string; value: string }> = ({ name, value }) => {
        return (
            <div className={styles.input}>
                <label className={styles.input__color__label}>{name}</label>
                <div className={styles.input__color__preview}></div>
                <input
                    className={styles.input__color__input}
                    name={name}
                    value={value}
                    type="text"
                />
            </div>
        );
    };

    const colorVars = themeVariables.filter((v) => v.type == "color");
    const dimensionVars = themeVariables.filter((v) => v.type == "dimension");

    return (
        <div className={styles.wrapper}>
            <Panel
                className={styles.panel}
                theme={{
                    ...VT.panel,
                    header: styles.header,
                }}
                header={<div>Theme Editor</div>}>
                <div className={styles.content}>
                    <h3>Colors</h3>
                    {colorVars.map((variable, i) => {
                        return (
                            <div key={i} className={styles.row}>
                                <ColorInput
                                    name={variable.name}
                                    value={variable.defaultValue.toString()}
                                />
                            </div>
                        );
                    })}
                    <h3>Dimensions</h3>
                    {dimensionVars.map((variable, i) => {
                        return (
                            <div key={i} className={styles.row}>
                                <DimensionInput
                                    name={variable.name}
                                    value={variable.defaultValue.toString()}
                                />
                            </div>
                        );
                    })}
                </div>
            </Panel>
        </div>
    );
};
