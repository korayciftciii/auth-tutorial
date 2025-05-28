"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"



export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

}