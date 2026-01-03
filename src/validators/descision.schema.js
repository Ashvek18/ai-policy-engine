import { z } from 'zod';

export const descisionSchema = z.object({
    userType:z.string(),
    amount:z.number(),
    country:z.string()
});