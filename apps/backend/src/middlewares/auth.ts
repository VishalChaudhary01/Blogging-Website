import { Context, Next } from "hono";
import { verify } from "hono/jwt"; 

type MyContext = Context<{
     Bindings: {
       DATABASE_URL: string;
       JWT_SECRET: string;
     };
     Variables: {
       userId: number;
     };
}>;
   
export async function auth(c: MyContext, next: Next) {
     try {
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
     } catch (e) {
          console.log(e);
          c.status(401);
          return c.json({ error: "invalid token"})          
     }
}