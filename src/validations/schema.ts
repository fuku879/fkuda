import { z } from "zod";

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"]),
    date: z.string().min(1, { message: "日付は必須です" }),
    amount: z.number().min(1, { message: "金額は１円以上で！" }),
    content: z
        .string()
        .min(1, { message: "内容を入力して下さい" })
        .max(50, { message: "内容は５０文字以内に！" })
        .optional(),

    category: z.union([
        z.literal(""),
        z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費"]),
        z.enum(["給与", "副収入", "お小遣い"]),
    ]),
    // .refine((val) => val !== "", { message: "カテゴリを選択してください" }),
});

export type Schema = z.infer<typeof transactionSchema>;
