const teamThemes = {
    kia: {
        primaryColor: "#E30113", // Red/Bright Red
        secondaryColor: "#05141F", // Navy Black
        textColor: "#FFFFFF"
    },
    lotte: {
        primaryColor: "#002955", // Navy
        secondaryColor: "#DC0226", // Red accent
        gradient: "linear-gradient(135deg, #041E42 20%, #1c3d6e 100%)", // Rich Navy Gradient
        textColor: "#FFFFFF"
    },
    doosan: {
        primaryColor: "#131230", // Navy/Black
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF"
    },
    ssg: {
        primaryColor: "#CE0E2D", // Red
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF"
    },
    samsung: {
        primaryColor: "#074CA1", // Blue
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF"
    },
    kt: {
        primaryColor: "#000000", // Black
        secondaryColor: "#EC1C24", // Red accent
        gradient: "linear-gradient(135deg, #000000 20%, #2c2c2c 100%)", // Premium Dark Gradient
        textColor: "#FFFFFF"
    },
    hanwha: {
        primaryColor: "#F37321", // Orange
        secondaryColor: "#000000",
        textColor: "#FFFFFF" // Orange/Black contrast might need white text on orange if dark enough, or black. F37321 is bright orange, white text is OK, but black might be safer. Let's stick to White for now as it's a hero background gradient.
    },
    lg: {
        primaryColor: "#C30452", // Magenta/Red
        secondaryColor: "#000000",
        textColor: "#FFFFFF"
    },
    kiwoom: {
        primaryColor: "#820024", // Burgundy
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF"
    },
    nc: {
        primaryColor: "#315288", // Navy
        secondaryColor: "#AF917B", // Gold
        textColor: "#FFFFFF"
    },
    default: {
        primaryColor: "#FFFFFF", // White main
        secondaryColor: "#FFD700", // Yellow accent
        gradient: "linear-gradient(135deg, #FFFFFF 0%, #F0E68C 50%, #98FB98 100%)", // White -> Khaki (Yellowish) -> PaleGreen
        textColor: "#333333" // Dark text for light background
    },
};

export default teamThemes;
