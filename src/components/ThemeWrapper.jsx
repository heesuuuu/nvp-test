// components/ThemeWrapper.jsx
"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
    direction: "ltr",
    palette: {
        primary: {
            main: "#1E88E5",
        },
    },
});

export default function ThemeWrapper({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
