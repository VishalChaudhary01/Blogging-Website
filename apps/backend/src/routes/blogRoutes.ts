import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from '@repo/common/index';

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }, 
  Variables: {
     userId: number
 }
}>();

blogRoutes.use(async (c, next) => {
     const jwt = c.req.header('Authorization');
     if (!jwt) {
          c.status(401);
          return c.json({ error: "unauthorized" });
     }
     const token = jwt.split(' ')[1];
     const payload = await verify(token, c.env.JWT_SECRET)
     if (!payload) {
          c.status(401);
          return c.json({ error: "unauthorized" });
     }
     c.set('userId', Number(payload.userId));
     await next();
})

blogRoutes.post('/', async (c) => {
     const body = await c.req.json();
     const userId = c.get('userId');
     const success = createBlogInput.safeParse(body);
     if (!success) {
          c.status(411);
          return c.json({ message: "Invalid inputs" });
     }
     const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL
     }).$extends(withAccelerate());
     try {
          const blog = await prisma.blog.create({
               data: {
                    title: body.title,
                    content: body.content,
                    authorId: userId
               }
          })
          return c.json({ id: blog.id })
     } catch (e) {
          c.status(400);
          return c.json({ message: "Something went wrong, Please try again", error: e });
     }
})

blogRoutes.put('/:id', async (c) => {
     const body = await c.req.json();
	const userId = c.get('userId');
     const blogId = c.req.param('id')
     const success = updateBlogInput.safeParse(body);
     if (!success) {
          c.status(411);
          return c.json({ message: "Invalid inputs" });
     }
     const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL
     }).$extends(withAccelerate());
     try {
          await prisma.blog.update({
               where: {
                    id: Number(blogId),
                    authorId: userId
               },
               data: {
                    title: body.title,
                    content: body.content,
               }
          })
          return c.text("post updated")
     } catch (e) {
          c.status(400);
          return c.json({ message: "Something went wrong, Please try again", error: e });
     }
})

blogRoutes.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL
     }).$extends(withAccelerate());
     try {
          const blogs = await prisma.blog.findMany({
               select: {
                    id: true,
                    title: true,
                    content: true,
                    publishDate: true,
                    author: {
                         select: {
                              name: true
                         }
                    }
               }
          });
          return c.json(blogs);
     } catch (e) {
          c.status(400);
          return c.json({ error: e });
     }
})


blogRoutes.get('/:id', async (c) => {
     const blogId = c.req.param('id');
     const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL
     }).$extends(withAccelerate());
     try {
          const blog = await prisma.blog.findFirst({
               where: {
                    id: Number(blogId)
               },
               select: {
                    id: true,
                    title: true,
                    content: true,
                    publishDate: true,
                    author: {
                         select: {
                              name: true
                         }
                    }
               }
          })
          return c.json(blog)
     } catch (e) {
          c.status(400);
          return c.json({ error: e });
     }     
})