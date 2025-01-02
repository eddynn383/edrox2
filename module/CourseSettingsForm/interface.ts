type Settings = {
    date: boolean;
    repetition: boolean;
    price: boolean;
    seats: boolean;
    tags: boolean;
}

interface CourseSettingsFormProps {
    id: string;
    settings: Settings;
}