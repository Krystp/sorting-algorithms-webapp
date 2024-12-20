import { createTheme } from "@mui/material";

export default createTheme({
    palette: {
        primary: {
            main: "#16365C",
        },
        secondary: {
            main: "#16365C"
        },
        text: {
            light: "#f5f5f5",
            primary: "#16365C",
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                size: "small",
                variant: "outlined",
                margin: "dense",
                fullWidth: true,
                InputLabelProps: {
                    shrink: true,
                    color: 'primary'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: "small",
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    color: "#fff"
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        },
        MuiCard: {
            variants:[
                {
                    props: {variant: 'shaded'},
                    style: {
                        backgroundColor: "#E0E0D9", 
                        borderRadius: '10px',
                    }
                },
            ]
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#16365C',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }
            }
        }
    }
})