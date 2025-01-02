import { Button, Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components"
import { Plus } from "lucide-react"

const CreateManyModal = () => {
    return (
        <Dialog
        >
            <DialogTrigger asChild>
                <Button mode="solid" variant="accent" status="brand" size="M" >
                    <Plus /> Create
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a...</DialogTitle>
                    {/* <DialogDescription>Use the fields below to create a new category</DialogDescription> */}
                </DialogHeader>
                <DialogBody>

                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}

export { CreateManyModal }