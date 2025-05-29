"use server"

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/maiil";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas"
import { error } from "console";
import * as z from "zod"
import { success } from "zod/v4";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found!" }
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset password email sent!" }
}