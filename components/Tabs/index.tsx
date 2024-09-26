"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { TabsListProps, TabsTriggerProps, TabsContentProps, TabsProps } from "./interface"
import tabs from "./tabs.module.css"

// const Tabs = TabsPrimitive.Root

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(({ className=tabs.container, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={className} {...props} />
))

Tabs.displayName = TabsPrimitive.Root.displayName



const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(({ className=tabs.list, ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={className} {...props} />
))

TabsList.displayName = TabsPrimitive.List.displayName



const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(({ className=tabs.trigger, ...props }, ref) => (
    <TabsPrimitive.Trigger ref={ref} className={className} {...props} />
))

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName



const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(({ className=tabs.content, ...props }, ref) => (
    <TabsPrimitive.Content ref={ref} className={className} {...props} />
))

TabsContent.displayName = TabsPrimitive.Content.displayName


export { Tabs, TabsList, TabsTrigger, TabsContent }
