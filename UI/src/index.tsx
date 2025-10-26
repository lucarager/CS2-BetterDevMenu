import { ModRegistrar } from "cs2/modding";

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

const register: ModRegistrar = (moduleRegistry) => {
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
            top: 0;
            left: 0;
            bottom: 0;
            right: 5vw;
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
            width: 66%;
        }

        .${debugUIClasses["output-column"]} {
            width: 33%;
        }

        .${debugUIClasses["output-column"]} .${debugUIClasses["scrollable"]} {
            height: 100%;
        }

        .${debugUIClasses["output-column"]} .${scrollableClasses["content"]} {
            height: 100%;
        }

        .${debugUIClasses["output-column"]} .${debugUIClasses["output"]} {
            min-height: 100%;
            background: rgba(14, 18, 36, 0.82);
        }


        .${debugUIClasses["tab-bar"]} {
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.25);
            padding-left: 0;
            padding-right: 0;
            width: 200rem;
            overflow-x: auto;
            overflow-y: scroll;
            flex-wrap: nowrap;
        }

        .${debugUIClasses["tab-bar"]}: {
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.25);
            padding-left: 0;
            padding-right: 0;
            width: 200rem;
            flex-wrap: nowrap;
        }

        .${debugUIClasses["tab-bar"]} > button {
            border: none;
            text-align: left;
            font-size: 1em;
            padding-left: 16rem;
            padding-right: 16rem;
            padding-top: 4rem;
            padding-bottom: 4rem;
            font-weight: 600;
        }

        .${debugUIClasses["debug-ui"]} * {
            font-family: "Overpass", "Noto Sans", "Noto Sans KR", "Noto Sans JP", "Noto Sans SC", "Noto Sans TC", "Noto Sans Thai", "Noto Sans Hebrew", "Noto Sans Arabic", "Noto Sans Bengali", "Noto Sans Devanagari";
            font-weight: 500;
        }

        .${debugUIClasses["scrollable"]} * {
            --contentPadding: 20rem;
        }


        .${debugUIClasses["scrollable"]} .${scrollableClasses.content} > * {
            margin-bottom: 10rem;
        }
    `;

    document.getElementsByTagName("head")[0].appendChild(style);
};

export default register;
