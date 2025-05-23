import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations.ts";
import { formatCurrency } from "../utils/formatting.ts";

interface MonthlySummaryProps {
    monthlyTransactions: Transaction[];
}

const MonthlySummary = ({ monthlyTransactions }: MonthlySummaryProps) => {
    console.log(monthlyTransactions);
    const { income, expense, balance } =
        financeCalculations(monthlyTransactions);

    return (
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
            {/* income */}
            <Grid size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.incomeColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}
                >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
                            <Typography>income</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWightBold"}
                            sx={{
                                wordBreak: "break-word",
                                fontSize: {
                                    xs: ".8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        >
                            ${formatCurrency(income)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* expense */}
            <Grid size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.expenseColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}
                >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
                            <Typography>expense</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWightBold"}
                            sx={{
                                wordBreak: "break-word",
                                fontSize: {
                                    xs: ".8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        >
                            ${formatCurrency(expense)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* balance */}
            <Grid size={{ xs: 4 }} display={"flex"} flexDirection={"column"}>
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.balanceColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}
                >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                            <Typography>balance</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant="h5"
                            fontWeight={"fontWightBold"}
                            sx={{
                                wordBreak: "break-word",
                                fontSize: {
                                    xs: ".8rem",
                                    sm: "1rem",
                                    md: "1.2rem",
                                },
                            }}
                        >
                            ${formatCurrency(balance)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MonthlySummary;
