import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import {
    amber,
    blue,
    cyan,
    deepOrange,
    green,
    lightBlue,
    lightGreen,
    pink,
    purple,
    red,
} from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
        // incomeCategoryColor:{
        //     給与:string,
        //     副収入:string,
        //     給料:string,
        // };
        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }

    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;

        incomeCategoryColor?: Record<IncomeCategory, string>;
        expenseCategoryColor?: Record<ExpenseCategory, string>;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue",Arial,sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },

    palette: {
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        balanceColor: {
            main: green[500],
            light: green[300],
            dark: green[700],
        },

        incomeCategoryColor: {
            給与: lightBlue[600],
            副収入: cyan[200],
            お小遣い: pink[100],
        },
        expenseCategoryColor: {
            食費: deepOrange[500],
            日用品: lightGreen[200],
            住居費: amber["A700"],
            交際費: pink[500],
            娯楽: cyan[200],
            交通費: purple[400],
        },
    },
});
