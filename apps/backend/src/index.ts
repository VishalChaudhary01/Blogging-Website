import { Hono } from 'hono';
import { userRoutes } from './routes/userRoutes';
import { blogRoutes } from './routes/blogRoutes';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog', blogRoutes);

export default app;
