export type CourseStatus = {
    id: string;
    name: string
}

export type Image = {
    url?: string;
    key?: string;
}

export type Course = {
    id: string;
    title: string;
    description: string | null;
    image: Image;
    categoryId: string | null;
    isPublished: Boolean;
    createdById: string;
    createdAt: Date;
    updatedById?: string | null;
    updatedAt: Date;
}

export type Category = {
    name: string;
    id: string;
    createdById: string;
    createdAt: Date;
    updatedById?: string | null;
    updatedAt: Date;
}