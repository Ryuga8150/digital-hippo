import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // anyApiRoute: publicProcedure.query(() => {
  //   return "hello";
  // }),

  auth: authRouter,
});

// this is our entire backend
export type AppRouter = typeof appRouter;
