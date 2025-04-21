import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations.ts";
import { formatCurrency } from "../utils/formatting.ts";

interface DailySummaryProps {
    dailyTransactions: Transaction[];
}

const DailySummary = ({ dailyTransactions }: DailySummaryProps) => {
    const { income, expense, balance } = financeCalculations(dailyTransactions);
    return (
        <Box>
            <Grid container spacing={2}>
                {/*income */}
                <Grid size={{ xs: 8 }} display="flex">
                    <Card
                        sx={{
                            bgcolor: (theme) => theme.palette.grey[100],
                            flexGrow: 1,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body2"
                                noWrap
                                textAlign="center"
                            >
                                収入
                            </Typography>
                            <Typography
                                // color={(theme) =>
                                //     theme.palette.incomeColor.main
                                // }
                                textAlign="right"
                                fontWeight="bold"
                                sx={{ wordBreak: "break-all" }}
                            >
                                ¥{formatCurrency(income)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/*expense */}
                <Grid size={{ xs: 8 }} display={"flex"}>
                    <Card
                        sx={{
                            bgcolor: (theme) => theme.palette.grey[100],
                            flexGrow: 1,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body2"
                                noWrap
                                textAlign="center"
                            >
                                支出
                            </Typography>
                            <Typography
                                // color={(theme) => theme.palette.expenseColor.main}
                                textAlign="right"
                                fontWeight="fontWeightBold"
                                sx={{ wordBreak: "break-all" }}
                            >
                                ¥{formatCurrency(expense)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* balance */}
                <Grid size={{ xs: 8 }} display={"flex"}>
                    <Card
                        sx={{
                            bgcolor: (theme) => theme.palette.grey[100],
                            flexGrow: 1,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body2"
                                noWrap
                                textAlign="center"
                            >
                                残高
                            </Typography>
                            <Typography
                                // color={(theme) => theme.palette.balanceColor.main}
                                textAlign="right"
                                fontWeight="fontWeightBold"
                                sx={{ wordBreak: "break-all" }}
                            >
                                ¥{formatCurrency(balance)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
export default DailySummary;
