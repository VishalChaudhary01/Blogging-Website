import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@repo/common/index";

export const userRoutes = new Hono<{
     Bindings: {
          DATABASE_URL: string;
          JWT_SECRET: string;
     }
}>();

userRoutes.post("/signup", async (c) => {
     const body = await c.req.json();
     const { success } = signupInput.safeParse(body);
     if (!success) {
          c.status(411);
          return c.json({ message: "Invalid inputs"});
     }
     const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate());
     try {
          const newUser = await prisma.user.create({
               data: {
                    name: body.name,
                    email: body.email,
                    password: body.password,
               }
          })
          const token = await sign({ userId: newUser.id }, c.env.JWT_SECRET);
          console.log(newUser);
          return c.text(token);
     } catch (e) {
          c.status(411);
          console.log(e);
          return c.text("Invalid inputs");
     }
})

userRoutes.post("/signin", async (c) => {
     const body = await c.req.json();
     const { success } = signinInput.safeParse(body);
     if (!success) {
          c.status(411);
          return c.json({ message: "Invalid inputs" });
     }
     const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL
     }).$extends(withAccelerate());
     try {
          const user = await prisma.user.findFirst({
               where: {
                    email: body.email,
                    password: body.password,
               }
          });
          if (!user) {
               c.status(404);
               return c.text("Invalid credentials");
          }
          const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
          return c.text(token);
     } catch (e) {
          console.log(e);
          c.status(411);
          return c.text("Invalid Inputs");
     }
})