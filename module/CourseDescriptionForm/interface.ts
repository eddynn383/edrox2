interface CourseDescriptionFormProps {
    courseId: string;
    description?: string | null;
    actions?: any;
    onOpen: (state: boolean) => void;
    onPending?: () => void;
}