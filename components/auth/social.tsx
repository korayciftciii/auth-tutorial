"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                style={{ cursor: 'pointer' }}
                size={'lg'}
                variant="outline"
                className=""
                onClick={() => {
                    // Handle Google login
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
                    // Handle GitHub login
                }}
            >
                <FaGithub className="h-5 w-5" />
                GitHub
            </Button>
        </div>
    );
}