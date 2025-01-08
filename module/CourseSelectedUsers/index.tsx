"use client"

import { Dialog, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogTrigger, Card, DialogFooter, Button, Avatar, CardHeader, CardContent, CardFooter, Text, ScrollArea } from "@/components";
import { CourseSelectedUsersProps } from "./interface";
import selectedUsers from "./course-selected-users.module.css"
import { CourseParticipantsSelection } from "../CourseParticipantsSelection";
import { Trash2 } from "lucide-react";

const CourseSelectedUsers = ({ courseId, groupId, groupUsers, users }: CourseSelectedUsersProps) => {

    return (
        <ScrollArea>
            <div className={selectedUsers.container}>
                <div className={selectedUsers.content} >
                    {
                        groupUsers?.map((data: any) => {
                            const user = data.user;
                            const { id, name, image } = user
                            const initials = user.name?.split(" ").map((name: string) => name[0]).join('')
                            return (
                                <Card key={id} mode="outline" padding="300" gap="300" orientation="horizontal" align="center">
                                    <CardHeader>
                                        <Avatar src={image || ""} text={!image ? initials : ""} size="L" shape="rounded" />
                                    </CardHeader>
                                    <CardContent gap="100">
                                        <Text size="M">{name}</Text>
                                        <Text size="XS">Level 1</Text>
                                    </CardContent>
                                    <CardFooter>
                                        <Button mode="text" variant="primary" status="fail" size="S" content="icon"><Trash2 /></Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className={selectedUsers.footer}>
                    <CourseParticipantsSelection courseId={courseId} groupId={groupId} users={users}>
                        <Button variant="accent" status="brand">Add participants</Button>
                    </CourseParticipantsSelection>
                </div>
            </div>
        </ScrollArea>
    );
}

export { CourseSelectedUsers }