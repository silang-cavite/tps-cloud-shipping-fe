module.exports = {
    purge: [
        "./src/**/*.html",
        "./public/index.html",
        "./src/**/*.{js,ts, jsx,tsx}",
        "./src/Components/**/*.{js,jsx,ts,tsx}",
        "./src/Components/*.{js,jsx,ts,tsx}",
        "./src/Routes/**/*.{js,jsx,ts,tsx}",
        "./src/Routes/*.{js,jsx,ts,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screen: {
                "max-xl": {
                    max: "1440px",
                },
                "max-lg": {
                    max: "1024px",
                },
                "max-md": {
                    max: "768px",
                },
                "max-sm": {
                    max: "425px",
                },
                "max-xs": {
                    max: "320px",
                },
            },
            height: {
                navigation: "15vh",
                hero: "85vh",
                footer: "30vh",
            },
            minHeight: {
                navigation: "15vh",
                hero: "85vh",
                footer: "30vh",
            },
            maxHeight: {
                navigation: "95px",
                hero: "1080px",
                footer: "30vh",
            },
            colors: {
                "green-neon-light": "#24CA85",
            },
            fontFamily: {
                montserrat: ["Montserrat"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography"),
        require("kutty"),
        require("daisyui"),
    ],
    daisyui: {
        styled: true,
        themes: false,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        // themes: [
        //     {
        //         mytheme: {
        //             primary: "#570df8",
        //             "primary-focus": "#4506cb",
        //             "primary-content": "#ffffff",
        //             secondary: "#f000b8",
        //             "secondary-focus": "#bd0091",
        //             "secondary-content": "#ffffff",
        //             accent: "#37cdbe",
        //             "accent-focus": "#2aa79b",
        //             "accent-content": "#ffffff",
        //             neutral: "#3d4451",
        //             "neutral-focus": "#2a2e37",
        //             "neutral-content": "#ffffff",
        //             "base-100": "#ffffff",
        //             "base-200": "#f9fafb",
        //             "base-300": "#d1d5db",
        //             "base-content": "#1f2937",
        //             info: "#2094f3",
        //             success: "#009485",
        //             warning: "#ff9900",
        //             error: "#ff5724",
        //         },
        //     },
        // ],
    },
};
