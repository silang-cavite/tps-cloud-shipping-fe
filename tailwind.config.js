module.exports = {
    purge: [
        "./src/**/*.html",
        "./public/index.html",
        "./src/**/*.{js,ts, jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screen: {
                "max-xl": { 
                    max: "1440px" 
                },
                "max-lg": { 
                    max: "1024px" 
                },
                "max-md": { 
                    max: "768px" 
                },
                "max-sm": { 
                    max: "425px" 
                },
                "max-xs": { 
                    max: "320px" 
                }
            },
            height: {
              navigation: "15vh",
              hero: "85vh",
              footer: "30vh",
            },
            minHeight: {
              navigation: "15vh",
              hero: "85vh",
              footer: "30vh"
            },
            maxHeight: {
              navigation: "95px",
              hero: "1080px",
              footer: "30vh",
            },
            colors: {
              'green-neon-light': '#24CA85',
            },
            fontFamily: {
                montserrat: ["Montserrat"]
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("kutty"),
    ],
};
