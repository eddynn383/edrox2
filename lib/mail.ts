import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.APP_URL;


export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "mail@auth-masterclass-tutorial.com",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`,
    });
};

export const sendPassResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/reset-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/email-validation?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    });
};
