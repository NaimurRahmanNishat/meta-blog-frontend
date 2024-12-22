import { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import BlogContext from "../../context/BlogContext";

interface Blog {
  createdAt: string | number | Date;
  _id: string;
  title: string;
  content: string;
  description: string;
  image: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
}

const BlogList = () => {
  const {searchTerm} = useContext(BlogContext);

  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showBlogs, setShowBlogs] = useState<number>(6);
  useEffect(() => {
    fetch("https://meta-blog-backend-five.vercel.app/blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.blogs)
        setIsLoading(false)
      })
      .catch((error) => console.error("Error fetching blog data: " + error));
  }, []);

  // Filter blogs based on title, description, and author
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle "View More" button
  const handleMoreBlog = () => {
    setShowBlogs((prev) => (prev ?? 0) + 3);
  };

  if(isLoading) return <div className="h-20">Loading...</div>
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBlogs.slice(0, showBlogs ?? 0).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      {showBlogs < filteredBlogs.length && (
        <div className="flex justify-center items-center mt-8 mb-5">
          <button
            onClick={handleMoreBlog}
            className="bg-secondery rounded-md text-white hover:bg-secondery/80 font-semibold flex items-center justify-center px-6 py-2 gap-1 transition-colors duration-200"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
