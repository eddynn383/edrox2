"use client"

import { useCallback } from "react"
import { Button, ToastAction } from "@/components"
import { useToast } from "@/hooks/useToast"
import { Eye, SidebarClose, SidebarOpen } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useLocalStorage } from "@uidotdev/usehooks";

const Preview = () => {

    const { toast } = useToast()

    const previewHandler = () => {
        // alert("Course Preview was triggered successfully!")
        toast({
            title: "Preview",
            description: "You have opened the preview mode",
            duration: 3000,
            mode: "solid",
            status: "warning",
            icon: "info",
            action: <ToastAction status="warning" altText="Try again" onClick={() => alert("Course Preview was triggered successfully!")}>Try again</ToastAction>,
        })
    }

    return (
        <>
            <Button mode="outline" onClick={previewHandler}><Eye /> Preview</Button>
        </>
    )
}

const SidePanelToggle = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const playlist = searchParams.get("playlist")

    const [sidePanelState, setSidePanelState] = useLocalStorage("SidePanelState", true)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return (
        <div data-active={sidePanelState}>
            <Button mode="outline" content="icon" selected={sidePanelState} onClick={() => {
                setSidePanelState(!sidePanelState)
            }}>
                {sidePanelState && <SidebarOpen />}
                {!sidePanelState && <SidebarClose />}
            </Button>
        </div>
        // <>
        //     <Button mode="outline" content="icon" selected={playlist === "on" ? true : false} onClick={() => {
        //         router.push(pathname + '?' + createQueryString('playlist', playlist === "on" ? "off" : "on"))
        //     }}>
        //         {playlist === "on" && <SidebarOpen />}
        //         {playlist === "off" && <SidebarClose />}
        //     </Button>
        // </>
    )
}

export { Preview, SidePanelToggle }
