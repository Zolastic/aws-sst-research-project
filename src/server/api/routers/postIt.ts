import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postItRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.postIt.findMany();
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postIt.create({
        data: {
          name: input.name,
          content: input.content,
        },
      });
    }),
});
