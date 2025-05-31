"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackurl");
    const hadnlerProvider = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                style={{ cursor: 'pointer' }}
                size={'lg'}
                variant="outline"
                className=""
                onClick={() => {
                    hadnlerProvider('google')
                }}
            >
                <FcGoogle className="h-5 w-5" />
                Google
            </Button>
            <Button
                style={{ cursor: 'pointer' }}
                size={'lg'}
                variant="outline"
                className=""
                onClick={() => {
                    hadnlerProvider("github")
                }}
            >
                <FaGithub className="h-5 w-5" />
                GitHub
            </Button>
        </div>
    );
}