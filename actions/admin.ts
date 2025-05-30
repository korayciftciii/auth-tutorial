"use server"

import { currentRoleServer } from "@/lib/auth"
import { UserRole } from "@prisma/client";
import { error } from "console";
import { success } from "zod/v4";

export const admin = async () => {
    const role = await currentRoleServer();
    if (role === UserRole.ADMIN) {
        return { success: "Allowed!" }
    }
    return { error: "Fobidden" }
}