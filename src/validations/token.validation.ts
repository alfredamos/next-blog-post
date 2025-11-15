import {z} from "zod";
import {TokenType} from "@prisma/client";

export const tokenSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    accessToken: z.string().min(1, { message: "Access-token cannot be empty." }),
    refreshToken: z.string().min(1, { message: "Refresh-token cannot be empty." }),
    expired: z.boolean().default(false),
    revoked: z.boolean().default(false),
    tokenType: z.enum(TokenType)

});


export type Token = z.infer<typeof tokenSchema>