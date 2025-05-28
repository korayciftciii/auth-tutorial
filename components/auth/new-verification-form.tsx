"use client"
import { BeatLoader } from "react-spinners"
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {

    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <div>
            <CardWrapper
                headerLabel="Confirming your verification"
                backButtonLabel="Back to Login"
                backButtonHref="/auth/login"
            >
                <div className="flex items-center w-full justify-center">

                </div>
            </CardWrapper>
        </div>
    );
}