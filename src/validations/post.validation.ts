import {z} from "zod";

export const postSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Title cannot be empty." }),
    content: z.string().min(1, { message: "Content cannot be empty." }),
    imageUrl: z.string().min(1, { message: "Content cannot be empty." }),
    authorId: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>
