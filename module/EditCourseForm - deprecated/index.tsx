'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CourseDescriptionSchema } from '@/schemas'
import { Button, Dropzone, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Label, Progress, RadioGroup, RadioGroupItem, ScrollArea, Textarea } from '@/components'
import Metadata from '../Metadata'

import psx from "@/styles/page.module.scss";
import msx from "@/styles/module.module.scss";
import csx from "@/styles/component.module.scss";

const steps = [
    {
        id: 'Step 1',
        name: 'Personal Information',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: 'Address',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    {
        id: 'Step 3',
        name: 'test',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { id: 'Step 3', name: 'Complete' }
]

interface FormCourseDetailsProps {
    courseId: string;
    categories?: any;
    defaultValues?: any;
}

type Form = z.infer<typeof CourseDescriptionSchema>

export default function EditCourseForm({courseId, defaultValues, categories}: FormCourseDetailsProps) {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [priceType, setPriceType] = useState<"fixed" | "discount">("fixed");
    const [progress, setProgress] = useState(25)
    const delta = currentStep - previousStep

    const form = useForm<Form>({
        resolver: zodResolver(CourseDescriptionSchema),
        defaultValues
    })

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = form


    const processForm: SubmitHandler<Form> = data => {
        console.log("its triggered")
        console.log("Process Form Data: ", data)
        reset()
    }

    type FieldName = keyof Form

    const next = async () => {
        // const fields = steps[currentStep].fields
        // const output = await trigger(fields as FieldName[], { shouldFocus: true })

        // if (!output) return

        if (currentStep < steps.length - 1) {
            // if (currentStep === steps.length - 2) {
            //     await handleSubmit(processForm)()
            // }
            setPreviousStep(currentStep)
            setProgress(prev => prev + 25)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setProgress(prev => prev - 25)
            setCurrentStep(step => step - 1)
        }
    }

    return (
        <>
            <div className={psx["body-content-outer"]}>
                <Progress value={progress} style={{ "height": "2px" }} data-status={"success"}/>            
                <div className={psx["body-content"]}>
                    <div className={psx["body-content-left"]}>
                        <ScrollArea>
                            <section className={msx["course-details-form"]}>
                                {currentStep === 0 && (
                                    <motion.div
                                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <Form {...form}>
                                            <form onSubmit={handleSubmit(processForm)}>
                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem data-cols="2">
                                                            <div className={csx["form-row-details"]}>
                                                                <FormLabel>Description</FormLabel>
                                                                {<FormDescription>Define the course description</FormDescription>}
                                                                {<FormMessage icon="alert-triangle" />}
                                                            </div>
                                                            <FormControl>
                                                                <Textarea {...field} value={field.value} name="description" shade="200" placeholder="Add details here" resize="vertical" />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormItem data-cols="2">
                                                    <div className={csx["form-row-details"]}>
                                                        <FormLabel>Image</FormLabel>
                                                        {<FormDescription>Use the drag&drop area to upload your image</FormDescription>}
                                                        {<FormMessage icon="alert-triangle" />}
                                                    </div>
                                                    <FormControl>
                                                        <Dropzone 
                                                            endpoint="courseImage"
                                                            onChange={
                                                                (url) => {
                                                                    if (url) {
                                                                        // onSubmit({ imageUrl: url });
                                                                        console.log("this is profile image url: ", url)
                                                                    }
                                                                }
                                                            }
                                                        />
                                                    </FormControl>
                                                </FormItem>  
                                                
                                                {/* <FormField
                                                    control={form.control}
                                                    name="price"
                                                    render={({ field }) => {
                                                        
                                                        return (
                                                            <FormItem data-cols="2">
                                                                <div className={csx["form-row-details"]}>
                                                                    <FormLabel>Price</FormLabel>
                                                                    {<FormDescription>Set up your course price</FormDescription>}
                                                                    {<FormMessage icon="alert-triangle" />}
                                                                </div>
                                                                <div className={csx["form-row-items"]}>
                                                                    <RadioGroup orientation="horizontal" defaultValue="fixed">
                                                                        <div className={csx["radiogroup-item"]}>
                                                                            <RadioGroupItem value="fixed" id="r1" mode="outline" shade="200" onChange={() => setPriceType("fixed")} />
                                                                            <Label className={csx["radiobox-label"]} htmlFor="r1">Fixed price</Label>
                                                                        </div>
                                                                        <div className={csx["radiogroup-item"]}>
                                                                            <RadioGroupItem value="discount" id="r2" mode="outline" shade="200" onChange={() => setPriceType("discount")} />
                                                                            <Label className={csx["radiobox-label"]} htmlFor="r2">Discounted price</Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                    {
                                                                        priceType === "fixed" && 
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                shade="200"
                                                                                type="text"
                                                                                name="price"
                                                                                placeholder="0"
                                                                            />
                                                                        </FormControl>                          
                                                                    }
                                                                    {
                                                                        priceType === "discount" && 
                                                                        <FormControl>
                                                                            <>
                                                                                <Input
                                                                                    {...field}
                                                                                    shade="200"
                                                                                    type="text"
                                                                                    name="price"
                                                                                    placeholder="0"
                                                                                />
                                                                                <Input
                                                                                    {...field}
                                                                                    shade="200"
                                                                                    type="text"
                                                                                    name="discount"
                                                                                    placeholder="0"
                                                                                />
                                                                            </>
                                                                        </FormControl>                          
                                                                    }
                                                                </div>
                                                            </FormItem>
                                                        )
                                                    }}
                                                /> */}
                                                
                                                <FormItem data-cols="2">
                                                    <div className={csx["form-row-details"]}>
                                                        <FormLabel>Metadata</FormLabel>
                                                        {<FormDescription>Setup new fields if you want to add custom metadata to your course</FormDescription>}
                                                        {<FormMessage icon="alert-triangle" />}
                                                    </div>
                                                    <Metadata />
                                                </FormItem> 
                                                <FormItem data-cols="2">
                                                    <Button variant="accent" type="submit">Update</Button>
                                                    <Button variant="primary" shade="200" type="button">Revert changes</Button>
                                                </FormItem>
                                            </form>
                                        </Form>
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem data-cols="2">
                                                    <div className={csx["form-row-details"]}>
                                                        <FormLabel>test</FormLabel>
                                                        {<FormDescription>Define the test</FormDescription>}
                                                        {<FormMessage icon="alert-triangle" />}
                                                    </div>
                                                    <FormControl>
                                                        <Input {...field} value={field.value} name="description" shade="200" placeholder="Add details here" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem data-cols="2">
                                                    <div className={csx["form-row-details"]}>
                                                        <FormLabel>test</FormLabel>
                                                        {<FormDescription>Define the test</FormDescription>}
                                                        {<FormMessage icon="alert-triangle" />}
                                                    </div>
                                                    <FormControl>
                                                        <Input {...field} value={field.value} name="description" shade="200" placeholder="Add details here" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <>
                                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                            Complete
                                        </h2>
                                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                                            Thank you for your submission.
                                        </p>
                                    </>
                                )}

                            </section>
                        </ScrollArea>
                    </div>
                    <div className={psx["body-content-right"]}>
                        <nav aria-label='Progress'>
                            <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                                {steps.map((step, index) => (
                                    <li key={step.name} className='md:flex-1'>
                                        {currentStep > index ? (
                                            <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                                <span className='text-sm font-medium text-sky-600 transition-colors '>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        ) : currentStep === index ? (
                                            <div
                                                className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                                aria-current='step'
                                            >
                                                <span className='text-sm font-medium text-sky-600'>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        ) : (
                                            <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                                <span className='text-sm font-medium text-gray-500 transition-colors'>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <div className={csx["stepper-controls"]}>
                            <Button variant="primary" shade="200" type="button" mode="solid" size="M" disabled={currentStep === 0} onClick={prev}>Prev</Button>
                            <Button variant="accent" type="button" mode="solid" size="M" disabled={currentStep === steps.length - 1} onClick={next}>Next</Button>
                            {/* {currentStep >= steps.length && <Button variant="accent" type="button" mode="solid" size="M" onClick={onDone}>Done</Button>} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
