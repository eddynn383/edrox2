import Link from "next/link";
import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button, LogOut, DropdownMenuSubTrigger, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubContent } from "@/components";

import ProfileAvatar from "@/public/assets/images/profile-avatar.png";

import { Mail, MessageSquare, PlusCircle, UserPlus } from "lucide-react";
import { ProfileProps } from "./interface";
import profile from "./profile.module.css"

const Profile = ({ size, user }: ProfileProps) => {

    const role = user?.role?.toUpperCase()

    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className={profile.container} data-size={size} >
                        <div className={profile.left}>
                            <Avatar src={user?.image ? user.image : ProfileAvatar} alt={user?.email} size={size} shape="rounded" />
                        </div>
                        <div className={profile.right}>
                            <span className={profile.name}>{user?.name ? user?.name : user?.email}</span>
                            {size !== "S" && <span className={profile.role}>{role}</span>}
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" shade="200">
                    <DropdownMenuItem hasChild>
                        <Link href="/settings/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem hasChild>
                        <Link href="/my-purchases">My Purchases</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent shade="200">
                                <DropdownMenuItem>
                                    <Mail />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem hasChild>
                        <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem hasChild>
                        <LogOut>Logout</LogOut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export { Profile }