"use client"

import { useState } from "react";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { DataEditModalProps } from "./interface";
import msx from "@/styles/module.module.scss"

const DataEditModal = ({ trigger, actions, title, children, open, setOpen }: DataEditModalProps) => {

    // console.log(open)
    return (
        <div className={msx["chapters"]}>
            <Dialog open={open} onOpenChange={setOpen}>
                {
                    trigger &&
                    <DialogTrigger asChild>
                        {trigger}
                    </DialogTrigger>
                }
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                    {
                        actions &&
                        <DialogFooter>
                            {actions}
                        </DialogFooter>
                    }
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { DataEditModal }