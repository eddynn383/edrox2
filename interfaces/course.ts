export type CourseStatus = {
    id: string;
    name: string
}

export type Course = {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    categoryId: string | null;
    isPublished: Boolean;
    createdById: string;
    createdAt: Date;
    updatedById: string | null;
    updatedAt: Date;


}