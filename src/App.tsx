import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Report from "./pages/Report.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import { theme } from "./theme/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index.ts";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.ts";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting.ts";
import { Schema } from "./validations/schema.ts";

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    //we can check if error or not
    function isFireStoreError(
        err: unknown
    ): err is { code: string; message: string } {
        return typeof err === "object" && err !== null && "code" in err;
    }

    // console.log(currentMonth);
    // const a = format(currentMonth, "yyyy-MM");
    // console.log(a);

    //get firebase data all
    useEffect(() => {
        const fecheTransactions = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "Transactions")
                );
                console.log(querySnapshot);
                const transactionsData = querySnapshot.docs.map((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    return {
                        ...doc.data(),
                        id: doc.id,
                    } as Transaction;
                });
                console.log(transactionsData);
                setTransactions(transactionsData);
            } catch (err) {
                //error
                if (isFireStoreError(err)) {
                    console.error("firestore error is", err);
                    // console.error("firebase error message is", err.message);
                    // console.error("firebase error code is", err.code);
                } else {
                    console.error("general error is:", err);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fecheTransactions();
    }, []);

    console.log(transactions);
    console.log(isLoading);

    //get this month data
    const monthlyTransactions = transactions.filter((transaction) => {
        return transaction.date.startsWith(formatMonth(currentMonth));
    });

    //for preserve process
    const handleSaveTransaction = async (transaction: Schema) => {
        console.log(transaction);
        try {
            //preserve data in fire store
            // Add a new document with a generated id.
            const docRef = await addDoc(
                collection(db, "Transactions"),
                transaction
            );
            console.log("Document written with ID: ", docRef.id);

            const newTransaction = {
                id: docRef.id,
                ...transaction,
            } as Transaction;
            console.log(newTransaction);
            setTransactions((prevTransaction) => [
                ...prevTransaction,
                newTransaction,
            ]);
        } catch (err) {
            if (isFireStoreError(err)) {
                console.error("fire store error is", err);
                // console.error("firebase error message is", err.message);
                // console.error("firebase error code is", err.code);
            } else {
                console.error("general error is:", err);
            }
        }
    };

    const handleDeleteTransaction = async (
        transactionIds: string | readonly string[]
    ) => {
        //delete fire store data
        try {
            const idsToDelete = Array.isArray(transactionIds)
                ? transactionIds
                : [transactionIds];
            console.log(idsToDelete);

            for (const id of idsToDelete) {
                //delete fire store data
                await deleteDoc(doc(db, "Transactions", id));
            }
            // const filteredTransactions = transactions.filter(
            //     (transaction) => transaction.id !== transactionId
            // );

            const filteredTransactions = transactions.filter(
                (transaction) => !idsToDelete.includes(transaction.id)
            );
            console.log(filteredTransactions);
            setTransactions(filteredTransactions);
        } catch (err) {
            if (isFireStoreError(err)) {
                console.error("fire store error is", err);
            } else {
                console.error("general error is:", err);
            }
        }
    };
    //process renew
    const handleUpdateTransaction = async (
        transaction: Schema,
        transactionId: string
    ) => {
        try {
            //renew fire store
            const docRef = doc(db, "Transactions", transactionId);

            // Set the "capital" field of the city 'DC'
            await updateDoc(docRef, transaction);
            //renew front
            const updatedTransactions = transactions.map((t) =>
                t.id === transactionId ? { ...t, ...transaction } : t
            ) as Transaction[];
            console.log(updatedTransactions);
            setTransactions(updatedTransactions);
        } catch (err) {
            if (isFireStoreError(err)) {
                console.error("fire store error is", err);
            } else {
                console.error("general error is:", err);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route
                            path="/"
                            element={
                                <Home
                                    monthlyTransactions={monthlyTransactions}
                                    setCurrentMonth={setCurrentMonth}
                                    onSaveTransaction={handleSaveTransaction}
                                    onDeleteTransaction={
                                        handleDeleteTransaction
                                    }
                                    onUpdateTransaction={
                                        handleUpdateTransaction
                                    }
                                />
                            }
                        />
                        <Route
                            path="/report"
                            element={
                                <Report
                                    currentMonth={currentMonth}
                                    setCurrentMonth={setCurrentMonth}
                                    monthlyTransactions={monthlyTransactions}
                                    isLoading={isLoading}
                                    onDeleteTransaction={
                                        handleDeleteTransaction
                                    }
                                />
                            }
                        />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
