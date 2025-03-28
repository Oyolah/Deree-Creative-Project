import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
        brand: {
            500: "#319795", // Teal color
        },
    },
    fonts: {
        body: "Inter, sans-serif",
        heading: "Inter, sans-serif",
    },
});

export default customTheme;
