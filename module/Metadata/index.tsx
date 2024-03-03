import { ChangeEvent, useState } from "react";

import { z } from "zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from "@/components";
import { Plus, Trash2 } from "lucide-react";
import { MetadataSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sxm from "@/styles/module.module.scss"
import sxc from "@/styles/component.module.scss"

type MetadataType = {
    [key: string]: string;
    key: string;
    value: string;
}

const Metadata = () => {
    const [data, setData] = useState<MetadataType[]>([{ key: "", value: "" }])
    const [error, setError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof MetadataSchema>>({
        resolver: zodResolver(MetadataSchema),
        defaultValues: {
            key: "", 
            value: ""
        }
    });

    const addRowHandler = (values: z.infer<typeof MetadataSchema>) => {
        console.log(values)
        // if (data.length === 1 || !MetadataSchema.safeParse(data[data.length - 1])) {
        //     return;
        // }
        // const dataValidation = MetadataSchema.safeParse(data)
        // console.log("data: ", data)
        // console.log(dataValidation)
        
        // if (data[data.length - 1].key) {
        //     // form.setError("key", () => {
        //     //     return error: "bla bla bla"
        //     // })
        //     setError("Please fill the row before")
        // }

        // if (!dataValidation.success) {
        //     // return { error: "Invalid email!"}
        // }

        setData([...data, { key: "", value: "" }]);
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {

        const { name, value } = e.target

        const onChangeVal = [...data];
        onChangeVal[i][name] = value;
        setData(onChangeVal);

        // const updatedData = data.map((item, index) => index === i ? { ...item, [name]: value } : item);
        // setData(updatedData);
    }

    const deleteHandler = (i: number) => {
        // const deleteVal = [...data]
        // deleteVal.splice(i, 1)
        if (data.length === 1) {
            return; // Do not allow deletion if only one row is present
        }
        const updatedData = data.filter((_, index) => index !== i);
        setData(updatedData)
    }

    return ( 
        <div className={sxm["metadata"]}>
            <Form {...form}>
                <form className={sxm["metadata-form"]} onSubmit={form.handleSubmit(addRowHandler)}>
                    <div className={sxm["metadata-title"]}>
                        <Label>Metadata</Label>
                        <Button variant="primary" shade="200" size="S" content="icon" type="submit" ><Plus /></Button>
                    </div>
                    <div className={sxm["metadata-content"]}>
                        {
                            data.map((row, i) => (                        
                                <div className={sxm["metadata-row"]} key={i}>
                                    {/* <Input sizes="S" shade="200" name="key" value={row.key} placeholder="Key" onChange={(e) => changeHandler(e, i)} />
                                    <Input sizes="S" shade="200" name="value" value={row.value} placeholder="Value" onChange={(e) => changeHandler(e, i)} /> */}
                                    <FormField
                                        control={form.control}
                                        name="key"
                                        render={({ field }) => {
                                            console.log(field)
                                            return (
                                                <FormItem data-cols="1">
                                                    <FormLabel hidden>Key</FormLabel>
                                                    <FormMessage icon="alert-triangle" />
                                                    <FormControl>
                                                        <Input {...field} value={row.key} sizes="S" shade="200" type="text" name="key" placeholder="Key" onChange={(e) => changeHandler(e, i)} />
                                                        {/* <Input
                                                            {...field}
                                                            shade="200"
                                                            type="text"
                                                            name="title"
                                                            placeholder="Eg. Introduction in front-end technologies"
                                                        // status={!success && !error ? "default" : success && !error ? "success" : !success && error ? "error" : "default"}
                                                        /> */}

                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="value"
                                        render={({ field }) => {
                                            return (
                                                <FormItem data-cols="1">
                                                    <FormLabel hidden>Value</FormLabel>
                                                    {/* {<FormMessage icon="alert-triangle" />} */}
                                                    <FormControl>
                                                        <Input {...field} value={row.value} sizes="S" shade="200" name="value" placeholder="Value" onChange={(e) => changeHandler(e, i)} />
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <Button size="S" variant="primary" shade="200" status="fail" content="icon" onClick={() => deleteHandler(i)}><Trash2 /></Button>
                                </div>
                            ))
                        }
                        <p>{JSON.stringify(data)}</p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
 
export default Metadata;