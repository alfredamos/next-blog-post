import {z} from "zod";
import {TokenType} from "@prisma/client";

export const tokenSchema = z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    accessToken: z.string(),
    refreshToken: z.string(),
    expired: z.boolean(),
    revoked: z.boolean(),
    tokenType: z.enum(TokenType)

});


export type Token = z.infer<typeof tokenSchema>