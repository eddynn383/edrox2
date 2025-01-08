"use server"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Badge, Button, Checkbox, Cover, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components";
import { getAllUsers } from "@/data/users";
import { PageBody } from "@/module/PageBody";
import { PageHeader } from "@/module/PageHeader";
import { TableManager } from "@/module/TableManager";
import { ColumnDef } from "@tanstack/react-table";
import { Home, MoreVertical, Trash2 } from "lucide-react";
import csx from "@/styles/component.module.scss"
import page from "@/styles/page.module.css"
import { usersCols } from "@/lib/table-headers";

const Page = async () => {
    const PageTitle = "User management"
    const PageDescription = "Manage your team members and their account permission here."
    const PageBreadcrumb = [{
        id: "b1",
        href: "/",
        title: "Home",
        children: <Home />,
        separator: "true"
    }, {
        id: "b2",
        title: "Users",
        children: "Users",
        separator: "false"
    }]

    const users = await getAllUsers()

    // console.log("Users: ", users)

    return (
        <>
            <PageHeader title={PageTitle} description={PageDescription} breadcrumb={PageBreadcrumb} />
            <PageBody>
                <div className={page.center}>
                    <TableManager data={users} columns={usersCols} target="name" />
                </div>
            </PageBody>
        </>
    );
}

export default Page;