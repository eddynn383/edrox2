export type Variant = "primary" | "secondary" | "accent" | "link";
export type Mode = "solid" | "outline" | "text";
export type Shape = "square" | "rounded"
export type Status = "default" | "brand" | "success" | "fail" | "warning" | "info" | "neutral";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";
export type Shade = "100" | "200";
export type Content = "text" | "icon" | "icon-text-icon" | "icon-text" | "text-icon";
export type Thickness = "100" | "200" | "300" | "400"

export type Price = {
    id: string;
    currency: string;
    fullPrice: number;
    discountedPrice: number | null;
    discountExpireDate: Date | null;
}

export type Rating = {
    id: string;
    value: number;
    reviews: number;
}

export type Instructor = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    imageLarge: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type Category = {
    name: string;
    id: string;
    createdById: string;
    createdAt: Date;
    updatedById: string | null;
    updatedAt: Date;
}

export type User = {
    email: string;
    name: string | null;
    bio: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
}

export type Tutor = {
    id: string;
    image: string;
    name: string;
}

export type TutorsOnCourses = {
    tutorId: string;
    courseId: string;
    tutors: Tutor;
}

export type Course = {
    id: string;
    title: string;
    description: string | null;
    image: Image | null;
    categoryId: string;
    category: Category;
    price: Price | null;
    level: number | null;
    isPublished: boolean;
}

export type Chapter = {
    id: string;
    title: string;
    description: string | null;
    isPublished: boolean;
    status: string;
    position: number;
    duration: number;
    isFree: boolean;
}

export type Metadata = {
    key: string;
    value: string;
}

export type Image = {
    id: string;
    type: string;
    url: string;
    key: string;
    size: number;
    uploadedById: string;
}

export type Grid = string
export type List = string


// id          String       @id @default(uuid())
// title       String
// description String?      @default("")
// image       String?
// categoryId  String
// category    Category     @relation(fields: [categoryId], references: [id])
// price       Price?
// level       Int?         @default(1)
// isPublished Boolean      @default(false)
// avgRating   Float?     
// // startDate   DateTime
// // endDate     DateTime?
// createdById String
// createdBy   User         @relation(name: "CreatedById", fields: [createdById], references: [id])
// createdAt   DateTime     @default(now())
// updatedBy   User?        @relation(name: "UpdatedById", fields: [updatedById], references: [id])
// updatedById String?
// updatedAt   DateTime     @updatedAt
// // catalogs    Catalog[]  
// metadata    Metadata[]
// tutors      TutorsOnCourses[]
// // tutors      Tutor[]
// chapters    Chapter[]
// attachments Attachment[]
// purchases   Purchase[]
// enrollments Enrollment[]
// // ratings     Rating[]
// ratings      RatingsOnCourses[]