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
    components: {
        Card: {
            baseStyle: {
                container: {
                    backgroundColor: "white",
                    _dark: {
                        backgroundColor: "gray.800",
                    },
                },
            },
        },
    },
});

export default customTheme;
