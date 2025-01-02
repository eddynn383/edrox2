"use client"

import { useToast } from "@/hooks/useToast"
import {
    Icon,
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components"

import toast from "@/components/Toast/toast.module.css"
import { CircleAlert, CircleCheck, Info, MailWarning, MessageCircleWarning, ShieldAlert, TriangleAlert } from "lucide-react"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, mode, status, icon, action, ...props }) {
                return (
                    <Toast key={id} mode={mode} status={status} {...props}>
                        {
                            icon &&
                            <div className={toast.left}>
                                {
                                    icon === "info" &&
                                    <Info size={24} />
                                }
                                {
                                    icon === "circle-check" &&
                                    <CircleCheck size={24} />
                                }
                                {
                                    icon === "circle-alert" &&
                                    <CircleAlert size={24} />
                                }
                                {
                                    icon === "triangle-alert" &&
                                    <TriangleAlert size={24} />
                                }
                                {
                                    icon === "shield-alert" &&
                                    <ShieldAlert size={24} />
                                }
                                {
                                    icon === "message-circle-warning" &&
                                    <MessageCircleWarning size={24} />
                                }
                                {
                                    icon === "mail-warning" &&
                                    <MailWarning size={24} />
                                }
                            </div>
                        }
                        <div className={toast.center}>
                            {
                                title &&
                                <ToastTitle>{title}</ToastTitle>
                            }
                            {
                                description &&
                                <ToastDescription>{description}</ToastDescription>
                            }
                        </div>
                        {
                            action &&
                            <div className={toast.right}>
                                {action}
                            </div>
                        }
                        <ToastClose status={status} />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
