import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogCardSkeleton } from "../skeletons/BlogCardSkeleton";

export const BlogsPage = () => {
  const { blogs, loading } = useBlogs();

  return (
    <>
      { loading? (
        <div>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            {blogs.map((blog) => (
              <BlogCard
                id={blog.id}
                title={blog.title}
                author={blog.author.name}
                publishDate={blog.publishDate.split('T')[0]}
                content={blog.content}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
