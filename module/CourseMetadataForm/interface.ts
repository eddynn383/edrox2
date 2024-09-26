interface CourseMetadataFormProps {
    courseId: string;
    key?: string | null;
    value?: string | null;
    actions?: any;
    onOpen: (state: boolean) => void;
    onPending?: () => void;
}