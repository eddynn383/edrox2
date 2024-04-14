"use client"

import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { Button } from "../Button";
import { PlaylistToggleProps } from "./interface";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PlaylistToggle = ({}: PlaylistToggleProps) => {
    const router = useRouter();
    const searchParam = useSearchParams();

    

    const toggleHandler = () => {
        if (searchParam.get("playlist") === "off") {
            router.push("?playlist=on")
        } else {
            router.push("?playlist=off")
        }
    }

    return ( 
        <Button variant="accent" content="icon" size="S" onClick={toggleHandler}>
            {
                searchParam.get("playlist") === "on" &&
                <ArrowRightToLine />
            }
            {
                searchParam.get("playlist") === "off" &&
                <ArrowLeftToLine />
            }
        </Button>

    );
}
 
export { PlaylistToggle };