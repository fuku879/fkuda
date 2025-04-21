import React, { JSX } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import { ExpenseCategory, IncomeCategory } from "../../types";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HailIcon from "@mui/icons-material/Hail";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
    食費: <FastfoodIcon fontSize="small" />,
    日用品: <AlarmIcon fontSize="small" />,
    住居費: <HomeWorkIcon fontSize="small" />,
    交際費: <HailIcon fontSize="small" />,
    娯楽: <SportsTennisIcon fontSize="small" />,
    交通費: <TrainIcon fontSize="small" />,
    給与: <AttachMoneyIcon fontSize="small" />,
    副収入: <AddBusinessIcon fontSize="small" />,
    お小遣い: <PriceCheckIcon fontSize="small" />,
};

export default IconComponents;
