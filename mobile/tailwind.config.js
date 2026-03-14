module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#d4a373", // Keeping your gold/brown color
                accent: "#10b981", // Keeping the green accent
                dark: "#0b0d09",
            },
        },
    },
    plugins: [],
}
