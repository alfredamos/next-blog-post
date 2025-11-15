import {z} from "zod";
import {Gender} from "@prisma/client";

export const authorSchema = z.object({
    id: z.string().optional(),
    address: z.string().min(1, { message: "Address cannot be empty." }),
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    gender: z.enum(Gender),
    image: z.string().min(1, { message: "Image cannot be empty." }),
    dateOfBirth: z.string().min(1, { message: "DateOfBirth cannot be empty." }),
});
