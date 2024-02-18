import { Avatar, Icon, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button, LogOut } from "@/components";
import Link from "next/link";

import ProfileAvatar from "@/public/assets/images/profile-avatar.png";

import { ProfileProps } from "./interface";
import sx from "@/styles/component.module.scss";
import { signOut } from "next-auth/react";

const Profile = ({ size, user, onLogout }: ProfileProps) => {

    const role = user?.role?.toUpperCase()

    return (
        <>
            <div className={sx["profile"]} data-size={size} >
                <div className={sx["profile-left"]}>
                    <span className={sx["profile-name"]}>{user?.name ? user?.name : user?.email}</span>
                    {size !== "S" && <span className={sx["profile-role"]}>{role}</span>}
                </div>
                <div className={sx["profile-right"]}>
                    <Avatar src={user?.image ? user.image : ProfileAvatar} alt={user?.email} size={size} type="circle" />
                    <DropdownMenu >
                        <DropdownMenuTrigger className={sx["button"]} data-variant="primary" data-shade="100" data-size="S" data-content="icon">
                            <Icon name="chevron-down" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" shade="200">
                            <DropdownMenuItem>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/my-purchases">My Purchases</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut>Logout</LogOut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}

export { Profile }