"use client"

import { Button, Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, TabsContent, TabsList, TabsTrigger } from "@/components";
import toolbar from "./toolbar.module.css"
import { Tabs, Text } from "@/components";
import { Check, CheckCheck, Film, Heading, Image as ImageIcon, ImagePlay, ListChecks, ListTodo, Plus, Text as TextIcon } from "lucide-react";
import button from "@/components/Button/button.module.css"
import { useState } from "react";


export const ContentToolbar = () => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            {
                !visible && 
                <Button className={`${button.container}`} mode="solid" variant="accent" content="icon" onClick={() => setVisible(true)}><Plus /></Button>
            }
            {
                visible &&
                <div className={toolbar.container}>
                    <Tabs defaultValue="text">
                        <TabsList>
                            <TabsTrigger value="text">
                                <TextIcon />
                                <Text size="M">Text</Text>
                            </TabsTrigger>
                            <TabsTrigger value="media">
                                <ImagePlay />
                                <Text size="M">Media</Text>
                            </TabsTrigger>
                            <TabsTrigger value="quiz">
                                <ListTodo />
                                <Text size="M">Quiz</Text>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="text">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Heading />
                                <Text size="M">Heading</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <TextIcon />
                                <Text size="M">Paragraph</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <ListChecks />
                                <Text size="M">Quiz</Text>
                            </Button>
                        </TabsContent>
                        <TabsContent value="media">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <ImageIcon />
                                <Text size="M">Image</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Film />
                                <Text size="M">Video</Text>
                            </Button>
                        </TabsContent>
                        <TabsContent value="quiz">
                            <Button mode="outline" variant="primary" content="icon-text">
                                <Check />
                                <Text size="M">Single choice</Text>
                            </Button>
                            <Button mode="outline" variant="primary" content="icon-text">
                                <CheckCheck />
                                <Text size="M">Multiple choice</Text>
                            </Button>
                        </TabsContent>
                    </Tabs>
                    {/* <Button mode="solid" variant="accent" content="icon-text">
                        <PlusCircle />
                        <Text size="M">Add section</Text>
                    </Button> */}
                </div>
            }
        </>
    );
}