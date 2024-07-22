import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { userRoutes } from './routes/userRoutes';
import { blogRoutes } from './routes/blogRoutes';
import { auth } from './middlewares/auth';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

app.use('/*', cors())

// Protected routes
app.use("/api/v1/blog/*", auth);
app.use("api/v1/user/profile/*", auth);

app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRoutes);

export default app;
