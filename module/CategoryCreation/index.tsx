"use client"

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { CategoryCreationForm } from "../CategoryCreationForm";
import { CategoryCreationProps } from "./interface";
import dialog from "@/components/Dialog/dialog.module.css"
import { Spinner } from "@/components/Spinner";

export const CategoryCreation = ({ }: CategoryCreationProps) => {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button mode="solid" variant="accent" status="brand" size="M" >
                    <Plus /> New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Category</DialogTitle>
                    <DialogDescription>Use the fields below to create a new category</DialogDescription>
                </DialogHeader>
                <DialogBody>
                    <CategoryCreationForm
                        className={dialog.form}
                        actions={
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button mode="text">Cancel</Button>
                                </DialogClose>
                                <Button variant="accent" status="brand" type="submit">{isPending ? <Spinner /> : "Create"}</Button>
                            </DialogFooter>
                        }
                        onPendingChange={(isPending) => {
                            setIsPending(isPending)
                        }}
                        onOpen={setOpen}
                    />
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}