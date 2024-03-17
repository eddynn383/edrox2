import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button, LogOut } from "@/components";
import Link from "next/link";

import ProfileAvatar from "@/public/assets/images/profile-avatar.png";

import { ProfileProps } from "./interface";
import sx from "@/styles/component.module.scss";

const Profile = ({ size, user }: ProfileProps) => {

    const role = user?.role?.toUpperCase()

    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className={sx["profile"]} data-size={size} >
                        <div className={sx["profile-left"]}>
                            <Avatar src={user?.image ? user.image : ProfileAvatar} alt={user?.email} size={size} type="circle" />
                        </div>
                        <div className={sx["profile-right"]}>
                            <span className={sx["profile-name"]}>{user?.name ? user?.name : user?.email}</span>
                            {size !== "S" && <span className={sx["profile-role"]}>{role}</span>}
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
                    <DropdownMenuItem hasChild>
                        <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut>Logout</LogOut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export { Profile }