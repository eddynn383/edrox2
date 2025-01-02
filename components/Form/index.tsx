"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from "react-hook-form"

import { Label } from "@/components/Label"

import { FormActionsProps, FormItemProps, FormLabelProps, FormMessageProps, FormRowDetailsProps, FormRowFieldsProps, FormRowsProps } from "./interface"
import sx from "@/styles/component.module.scss"
import { TriangleAlert } from "lucide-react"
import form from "./form.module.css"
import iconStyle from "@/components/Icon/icon.module.css"

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-row`,
        formDescriptionId: `${id}-form-row-description`,
        formMessageId: `${id}-form-row-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

const FormItem = React.forwardRef<
    HTMLDivElement,
    FormItemProps
>(({ className = form.row, orientation = "vertical", ...props }, ref) => {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={className} data-orientation={orientation} {...props} />
        </FormItemContext.Provider>
    )
})

FormItem.displayName = "FormItem"



const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    FormLabelProps
>(({ className = form.label, htmlFor, required = false, children, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={className}
            htmlFor={htmlFor ? htmlFor : formItemId}
            {...props}
        >
            {children}
            {required && <span className={form.required}> *</span>}
        </Label>
    )
})

FormLabel.displayName = "FormLabel"



const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})

FormControl.displayName = "FormControl"



const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className = form.description, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p ref={ref} id={formDescriptionId} className={className} {...props} />
    )
})

FormDescription.displayName = "FormDescription"



const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    FormMessageProps
>(({ className, icon = <TriangleAlert className={iconStyle.container} data-size="M" />, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <div className={`${form.message} ${error && form.error}`}>
            {icon}
            <p ref={ref} id={formMessageId} className={sx["form-message-text"]} {...props}>
                {body}
            </p>
        </div>
    )
})

FormMessage.displayName = "FormMessage"



const FormRows = React.forwardRef<
    HTMLDivElement,
    FormRowsProps
>(({ className = form.rows, orientation = "vertical", children, ...props }, ref) => {
    return (
        <div className={className} data-orientation={orientation} {...props} ref={ref}>
            {children}
        </div>
    )
})

FormRows.displayName = "FormRows"



const FormRowDetails = React.forwardRef<
    HTMLDivElement,
    FormRowDetailsProps
>(({ className = form["row-details"], children, ...props }, ref) => {
    return (
        <div className={className} {...props} ref={ref}>
            {children}
        </div>
    )
})

FormRowDetails.displayName = "FormRowDetails"


const FormRowFields = React.forwardRef<
    HTMLDivElement,
    FormRowFieldsProps
>(({ className = form["row-fields"], children, ...props }, ref) => {
    return (
        <div className={className} {...props} ref={ref}>
            {children}
        </div>
    )
})

FormRowFields.displayName = "FormRowFields"


const FormActions = React.forwardRef<
    HTMLDivElement,
    FormActionsProps
>(({ className = form.actions, children, direction = "vertical", container = false, ...props }, ref) => {
    return (
        <div className={className} {...props} ref={ref} data-direction={direction} data-container={container}>
            {children}
        </div>
    )
})

FormActions.displayName = "FormActions"

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
    FormRows,
    FormRowDetails,
    FormRowFields,
    FormActions
}
