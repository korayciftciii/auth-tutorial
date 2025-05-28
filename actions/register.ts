"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas/index";
import { db } from "@/lib/db"; // Assuming you have a database connection setup
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid input", issues: validatedFields.error.issues };
    }

    const { email, password, name, surname } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already in use" };
    }
    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            surname
        },
    });

    const verificationToken = await generateVerificationToken(email);


    return { success: "Confirmation email sent!" };
};