import { Icon, Surface, Toolbar, Tooltip } from '@/components'
import { TooltipContent, TooltipTrigger } from '@/components/Tooltip'
import { TooltipProvider } from '@radix-ui/react-tooltip'

export type LinkPreviewPanelProps = {
    url: string
    onEdit: () => void
    onClear: () => void
}

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
    return (
        <Surface className="flex items-center gap-2 p-2">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline break-all">
                {url}
            </a>
            <Toolbar.Divider />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Toolbar.Button onClick={onEdit}>
                            <Icon name="Pen" />
                        </Toolbar.Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit link</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Toolbar.Button onClick={onClear}>
                            <Icon name="Trash2" />
                        </Toolbar.Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Remove link</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Surface>
    )
}
