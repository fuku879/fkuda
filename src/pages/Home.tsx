import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary.tsx";
import Calendar from "../components/Calendar.tsx";
import TransactionMenu from "../components/TransactionMenu.tsx";
import TransactionForm from "../components/TransactionForm.tsx";
import { Transaction } from "../types/index.ts";
import { format } from "date-fns";
import { Schema } from "../validations/schema.ts";

interface HomeProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
    onSaveTransaction: (transaction: Schema) => Promise<void>;
    onDeleteTransaction: (
        transactionId: string | readonly string[]
    ) => Promise<void>;
    onUpdateTransaction: (
        transaction: Schema,
        transactionId: string
    ) => Promise<void>;
}

const Home = ({
    monthlyTransactions,
    setCurrentMonth,
    onSaveTransaction,
    onDeleteTransaction,
    onUpdateTransaction,
}: HomeProps) => {
    const today = format(new Date(), "yyyy-MM-dd");
    //console.log(today);
    const [currentDay, setCurrentDay] = useState(today);
    const [isEntryDrawerOpen, setIsisEntryDrawerOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);
    //you get a data of a day
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });
    //console.log(dailyTransactions);

    const CloseForm = () => {
        setIsisEntryDrawerOpen(!isEntryDrawerOpen);
        setSelectedTransaction(null);
    };

    //close or open proceed(when I pressed the button)
    const handleAddTransactionForm = () => {
        if (selectedTransaction) {
            setSelectedTransaction(null);
        } else {
            setIsisEntryDrawerOpen(!isEntryDrawerOpen);
        }
    };

    //the process when we selected transaction
    const handleSelectTransaction = (transaction: Transaction) => {
        console.log(transaction);
        setIsisEntryDrawerOpen(true);
        setSelectedTransaction(transaction);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* left */}
            <Box sx={{ flexGrow: 1 }}>
                <MonthlySummary monthlyTransactions={monthlyTransactions} />
                <Calendar
                    monthlyTransactions={monthlyTransactions}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentDay={setCurrentDay}
                    currentDay={currentDay}
                    today={today}
                />
            </Box>
            {/* right  */}
            <Box>
                <TransactionMenu
                    dailyTransactions={dailyTransactions}
                    currentDay={currentDay}
                    onAddTransactionForm={handleAddTransactionForm}
                    onSelectTransaction={handleSelectTransaction}
                />
                <TransactionForm
                    onCloseForm={CloseForm}
                    isEntryDrawerOpen={isEntryDrawerOpen}
                    currentDay={currentDay}
                    onSaveTransaction={onSaveTransaction}
                    selectedTransaction={selectedTransaction}
                    onDeleteTransaction={onDeleteTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    onUpdateTransaction={onUpdateTransaction}
                />
            </Box>
        </Box>
    );
};

export default Home;
