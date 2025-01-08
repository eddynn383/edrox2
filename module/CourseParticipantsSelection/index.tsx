"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogTrigger, Card, DialogFooter, Button, Avatar } from "@/components";
import { CourseParticipantsSelectionProps } from "./interface";
import msx from "@/styles/module.module.scss"
import { assignUsersOnGroup } from "@/data/groups";
import { assignUsersToGroup } from "@/actions/group";

const CourseParticipantsSelection = ({ courseId, groupId, users, children }: CourseParticipantsSelectionProps) => {
    const [open, setOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [isPending, setIsPending] = useState(false)


    const handleSelectUser = (userId: string) => {
        setSelectedUsers((prevUsersIds) =>
            prevUsersIds.includes(userId)
                ? prevUsersIds.filter((id) => id !== userId) // Remove if already present
                : [...prevUsersIds, userId]                 // Add if not present
        );
    };

    const handleSubmit = () => {
        // console.log("handleSubmit its clicked")
        assignUsersToGroup(groupId, selectedUsers)
    }

    // console.log("selectedUsers: ", selectedUsers)
    // console.log(open)
    return (
        <div className={msx["chapters"]}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose participants</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        {
                            users.map((user: any) => (
                                <Card mode="outline" key={user.id} onClick={() => handleSelectUser(user.id)}>
                                    <Avatar src={user.image} size="XS" shape="rounded" />
                                    {user.name}
                                </Card>
                            ))
                        }
                    </DialogBody>
                    <DialogFooter>
                        <Button mode="solid" variant="accent" status="brand" content="text" onClick={handleSubmit}>
                            Assign
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { CourseParticipantsSelection }