"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
    return <Toaster
        toastOptions={{
            success: {
                style: {
                    background: 'var(--accent-success-400)',
                    color: 'var(--accent-success-100)'
                },
            },
            error: {
                style: {
                    background: 'var(--accent-fail-400)',
                    color: 'var(--accent-fail-100)'
                },
            },
        }}
    />
};
