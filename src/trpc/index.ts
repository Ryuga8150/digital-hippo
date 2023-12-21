import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "./../lib/validators/queryValidator";
import { getPayloadClient } from "../getPayload";

export const appRouter = router({
  // anyApiRoute: publicProcedure.query(() => {
  //   return "hello";
  // }),

  auth: authRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        // cursor so if bottom can fetch next products
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;

      const { sort, limit, ...queryOpts } = query;
      // did ...queryOpts so that we can format these according to our payload format
      // as they don't go as it is in that

      const payload = await getPayloadClient();
      //  to interact with our db we use psayload

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

// this is our entire backend
export type AppRouter = typeof appRouter;
