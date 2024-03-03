import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { ChapterCreationProps } from "./interface";
import ChapterInitialCreation from "@/module/ChapterInitialCreation"
import { Plus } from "lucide-react";
import ChaptersList from "../ChaptersList";
import sxm from "@/styles/module.module.scss"
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";

const ChapterCreation = ({ chapters, courseId }: ChapterCreationProps) => {
    const [open, setOpen] = useState(false)

    console.log(open)
    return ( 
        <>
            <div className={sxm["page-content-left"]}>

            </div>
            <ScrollArea>
                <div className={sxm["page-content-right"]}>
                    <ChaptersList data={chapters} />
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button mode="solid" variant="primary" shade="200" status="default" size="M" >
                                <Plus /> Add chapter
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New chapter</DialogTitle>
                            </DialogHeader>
                            <div>
                                <ChapterInitialCreation 
                                    courseId={courseId} 
                                    actions={
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button shade="200" >Cancel</Button>
                                            </DialogClose>
                                            <Button variant="accent" type="submit">Create</Button>
                                        </DialogFooter>
                                    } 
                                    onOpen={setOpen}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </ScrollArea>
        </>
    );
}

export default ChapterCreation