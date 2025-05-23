import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Drawer,
    Grid2,
    List,
    ListItem,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DailySummary from "./DailySummary.tsx";

import { formatCurrency } from "../utils/formatting.ts";
import { theme } from "../theme/theme";
import Grid from "@mui/material/Grid2";
import { Transaction } from "../types/index.ts";
import IconComponents from "./common/IconComponents.tsx";

interface TransactionMenuProps {
    dailyTransactions: Transaction[];
    currentDay: string;
    onAddTransactionForm: () => void;
    onSelectTransaction: (transaction: Transaction) => void;
}
const TransactionMenu = ({
    dailyTransactions,
    currentDay,
    onAddTransactionForm,
    onSelectTransaction,
}: TransactionMenuProps) => {
    const menuDrawerWidth = 320;
    return (
        <Drawer
            sx={{
                width: menuDrawerWidth,
                "& .MuiDrawer-paper": {
                    width: menuDrawerWidth,
                    boxSizing: "border-box",
                    p: 2,
                    top: 64,
                    height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
                },
            }}
            variant={"permanent"}
            anchor={"right"}
        >
            <Stack sx={{ height: "100%" }} spacing={2}>
                {/* date */}
                <Typography fontWeight={"fontWeightBold"}>
                    日時： {currentDay}
                </Typography>
                <DailySummary dailyTransactions={dailyTransactions} />
                {/* detail title and detail add button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                    }}
                >
                    {/* left text and icon */}
                    <Box display="flex" alignItems="center">
                        <NotesIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">内訳</Typography>
                    </Box>
                    {/* add right button */}
                    <Button
                        startIcon={<AddCircleIcon />}
                        color="primary"
                        onClick={onAddTransactionForm}
                    >
                        内訳を追加
                    </Button>
                </Box>
                {/* transaction display */}
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                    <List aria-label="取引履歴">
                        <Stack spacing={2}>
                            {dailyTransactions.map((transaction) => (
                                <ListItem disablePadding key={transaction.id}>
                                    <Card
                                        sx={{
                                            width: "100%",
                                            backgroundColor:
                                                transaction.type === "income"
                                                    ? (theme) =>
                                                          theme.palette
                                                              .incomeColor.light
                                                    : (theme) =>
                                                          theme.palette
                                                              .expenseColor
                                                              .light,
                                            // (theme) =>

                                            //     theme.palette.expenseColor
                                            //         .light,
                                        }}
                                        onClick={() =>
                                            onSelectTransaction(transaction)
                                        }
                                    >
                                        <CardActionArea>
                                            <CardContent>
                                                <Grid
                                                    container
                                                    spacing={1}
                                                    alignItems="center"
                                                    wrap="wrap"
                                                >
                                                    {/* <Grid item xs={1}> */}
                                                    <Grid size={{ xs: 1 }}>
                                                        {/* icon */}
                                                        {
                                                            IconComponents[
                                                                transaction
                                                                    .category
                                                            ]
                                                        }
                                                    </Grid>
                                                    <Grid size={{ xs: 2.5 }}>
                                                        <Typography
                                                            variant="caption"
                                                            display="block"
                                                            gutterBottom
                                                        >
                                                            {
                                                                transaction.category
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4 }}>
                                                        <Typography
                                                            variant="body2"
                                                            gutterBottom
                                                        >
                                                            {
                                                                transaction.content
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4.5 }}>
                                                        <Typography
                                                            gutterBottom
                                                            textAlign={"right"}
                                                            color="text.secondary"
                                                            sx={{
                                                                wordBreak:
                                                                    "break-all",
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                transaction.amount
                                                            )}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </ListItem>
                            ))}
                        </Stack>
                    </List>
                </Box>
            </Stack>
        </Drawer>
    );
};
export default TransactionMenu;
