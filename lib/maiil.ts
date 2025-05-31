import { Resend } from "resend"

const domain = process.env.NEXT_APP_PUBLIC_URL;
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verification Code",
        html:
            `<p>Your verification token <b>${token}</b> please do not share your code to anyone else!</p>
         <p>This code will be expire in 5 minutes</p>
        `
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
};


export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html:
            `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
         <p>This verification link will be expire in 5 minutes</p>
        `
    });
};