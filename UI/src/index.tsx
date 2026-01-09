import { ModRegistrar, ModuleRegistryExtend } from "cs2/modding";
import { initialize } from "vanilla/Components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

/**
    debug-ui:
        debugging
        "debug-ui"
        debugUi
        inspector
        "output-column"
        outputColumn
        output
        "tab-bar"
        tabBar
        "title-bar"
        titleBar
        title
        scrollable

    scrollable:
        scrollable
        viewport
        content
        x
        y
        "track-visible-y"
        trackVisibleY
        track
        "track-visible-x"
        trackVisibleX
        thumb
        pressed
        "bottom-padding"
        bottomPadding
        "hint-item"
        hintItem
 */

import icon from "./range.svg";
import { FocusDisabled } from "cs2/input";

export const DevMenuWrapper: ModuleRegistryExtend = (Component) => {
    const PlatterMouseToolOptionsComponent = (props: any) => {
        const { children, ...otherProps } = props || {};
        const initialWidth = window.innerWidth * 0.45;
        const maxWidth = window.innerWidth * 0.8;
        const minWidth = window.innerWidth * 0.2;
        const [leftWidth, setLeftWidth] = useState(initialWidth);
        const [isDragging, setIsDragging] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        // Function to handle the drag (mousemove event)
        const handleMouseMove = useCallback((e: MouseEvent) => {
            if (containerRef.current) {
                const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
                if (newWidth > minWidth && newWidth < maxWidth) {
                    setLeftWidth(newWidth);
                }
            }
        }, []);

        // Function to stop the drag (mouseup event)
        const handleMouseUp = useCallback(() => {
            setIsDragging(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }, [handleMouseMove]);

        // Function to start the drag (mousedown event on the gutter)
        const handleMouseDown = useCallback(() => {
            setIsDragging(true);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }, [handleMouseMove, handleMouseUp]);

        useEffect(() => {
            // This function runs when the component unmounts
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }, [handleMouseMove, handleMouseUp]);

        return (
            <>
                <div className={styles.panel_container} ref={containerRef}>
                    <div className={styles.left} style={{ width: leftWidth }}>
                        <Component {...otherProps}>{children}</Component>
                    </div>
                    <FocusDisabled>
                        <div
                            className={[styles.gutter, isDragging ? styles.active : null].join(" ")}
                            onMouseDown={handleMouseDown}>
                            <img className={styles.icon} src={icon} />
                        </div>
                    </FocusDisabled>
                </div>
            </>
        );
    };

    return PlatterMouseToolOptionsComponent;
};

const register: ModRegistrar = (moduleRegistry) => {
    initialize(moduleRegistry);

    moduleRegistry.extend("game-ui/debug/components/debug-ui.tsx", "DebugUI", DevMenuWrapper);

    const debugUIClasses = moduleRegistry.registry.get(
        "game-ui/debug/components/debug-ui.module.scss",
    )?.classes;
    const scrollableClasses = moduleRegistry.registry.get(
        "game-ui/common/scrolling/scrollable.module.scss",
    )?.classes;
    const panelBackdropClasses = moduleRegistry.registry.get(
        "game-ui/common/panel/panel-backdrop.module.scss",
    )?.classes;

    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
        .${debugUIClasses["debug-ui"]} {
            top: 8rem;
            left: 8rem;
            bottom: 8rem;
            right: 8rem;
            display: flex;
            flex-direction: row;
        }

        body.${panelBackdropClasses["backdrop-visible"]} .${debugUIClasses["debugging"]} {
            opacity: 0.5;
            pointer-events: none !important;
        }

        body.${panelBackdropClasses["backdrop-visible"]} .${debugUIClasses["debugging"]} * {
            pointer-events: none !important;
        }

        .${debugUIClasses["inspector"]} {
            flex-direction: row;
            width: 100%;
            background: transparent;
        }

        .${debugUIClasses["inspector"]} .${debugUIClasses["scrollable"]} {
            flex-direction: row;
            width: 100%;
        }

        // APPEARANCE
        .${debugUIClasses["inspector"]} .${debugUIClasses["scrollable"]},
        .${debugUIClasses["output-column"]} .${debugUIClasses["output"]},
        .${debugUIClasses["tab-bar"]} {
            box-shadow: 0px 0px 16rem 0px rgb(0, 0, 0, 0.6);
            background: rgba(9, 13, 21, 0.6);
            backdrop-filter:  var(--panelBlur);
            border-radius: 8rem;
        }
        .${debugUIClasses["tab-bar"]} {
            background: rgba(9, 13, 21, 0.6);
        }
        .${debugUIClasses["inspector"]} .${debugUIClasses["scrollable"]}, {
            background: rgba(9, 13, 21, 0.6);
        }
        .${debugUIClasses["output-column"]} .${debugUIClasses["output"]} {
            background: rgba(9, 13, 21, 0.95);
        }

        .${debugUIClasses["output-column"]} {
            width: 30vw;
            margin-left: 8rem;
            border-radius: 8rem;
            pointer-events: none;
        }

        .${debugUIClasses["output-column"]} > .${scrollableClasses["track"]} {
            pointer-events: auto;
        }

        .${debugUIClasses["output-column"]} .${debugUIClasses["scrollable"]} {
            height: 100%;
        }

        .${debugUIClasses["output-column"]} .${scrollableClasses["content"]} {
            height: 100%;
        }

        .${debugUIClasses["output-column"]} .${debugUIClasses["output"]} {
            min-height: 100%;
            pointer-events: auto;
        }

        .${debugUIClasses["tab-bar"]} {
            flex-direction: column;
            padding-left: 0;
            padding-right: 0;
            width: 200rem;
            overflow-x: auto;
            overflow-y: scroll;
            flex-wrap: nowrap;
            margin-right: 8rem;
        }

        .${debugUIClasses["tab-bar"]} > button {
            border: none;
            text-align: left;
            font-size: 1em;
            padding-left: 12rem;
            padding-right: 8rem;
            padding-top: 3rem;
            padding-bottom: 3rem;
            font-weight: 600;
        }

        .${debugUIClasses["debug-ui"]} * {
            font-family: "Overpass", "Noto Sans", "Noto Sans KR", "Noto Sans JP", "Noto Sans SC", "Noto Sans TC", "Noto Sans Thai", "Noto Sans Hebrew", "Noto Sans Arabic", "Noto Sans Bengali", "Noto Sans Devanagari";
            font-weight: 500;
        }

        .${debugUIClasses["scrollable"]} * {
            --contentPadding: 20rem;
        }

        .${debugUIClasses["inspector"]} > .${scrollableClasses["scrollable"]} > .${scrollableClasses.content} {
            padding: 20rem;
            padding-right: 24rem;
        }

        .${debugUIClasses["inspector"]} .${scrollableClasses["scrollable"]} .${scrollableClasses.content} > * {
            margin-bottom: 10rem;
        }
    `;

    document.getElementsByTagName("head")[0].appendChild(style);
};

export default register;
