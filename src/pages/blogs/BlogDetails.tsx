import { useParams } from "react-router-dom";
import authorImg from "../../assets/authors/author-1.png";
// import blogImg from "../../assets/blogs/blog-1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

type Params = {
  id: string;
};

interface Blog {
  title: string;
  image: string;
  description: string;
  author: {
    name: string;
  };
  date?: string;
  createdAt?: string;
  content: string;
}

const BlogDetails = () => {
  const {id} = useParams<Params>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchBlog = async()=>{
      try {
        const response = await axios.get(`https://meta-blog-backend-five.vercel.app/blogs/${id}`)
        setBlog(response.data.blog)
        setIsLoading(false);
      } catch (error) {
        console.log("Error gettiing single blog", error)
      }
    }
    fetchBlog()
    window.scrollTo(0,0);
  },[id])
  if(isLoading){
    return <Loading/>
  }
  console.log(blog)
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          {blog?.title}
        </h2>
        <div className="flex items-center mb-4">
          <img src={authorImg} alt="" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-lg font-medium">{blog?.author.name}</p>
            <p className="text-gray-500">{blog?.date ? (
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              ) : (
                blog?.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              )}</p>
          </div>
        </div>
        <img
          src={blog?.image}
          alt=""
          className="w-full md:h-[580px] rounded-md object-cover mb-4"
        />
        <div className="space-y-4">
          <p>
            {blog?.description}
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis,
            libero nihil! Vero perferendis eum cupiditate dicta vel autem, sint
            ipsa maiores. Vero dicta esse ratione, repudiandae repellat
            repellendus, reiciendis corporis fugit quis, accusantium deserunt
            deleniti? Impedit, adipisci quis. Tenetur dignissimos alias,
            exercitationem asperiores ipsa ducimus pariatur dolore, atque
            obcaecati totam quod sapiente provident, perferendis labore
            voluptate culpa vitae minus laborum. Quis modi ab quaerat. Eaque
            fugiat maxime asperiores ipsum earum molestias, nemo perspiciatis
            excepturi, repellat sit sapiente iusto natus. Saepe, dignissimos id
            sapiente assumenda nostrum totam, consequuntur animi, facilis ea
            fugiat quasi blanditiis corporis. Pariatur quis porro et corrupti,
            autem impedit ex necessitatibus quae? Autem explicabo possimus
            soluta ipsam placeat reiciendis nobis a veritatis nostrum neque
            ducimus sed vero fuga exercitationem magni at cumque, aliquam fugiat
            dolores incidunt mollitia laboriosam ratione est doloribus.
            Temporibus, cumque iure! Minima ex aliquam delectus saepe vel modi
            quibusdam perferendis quas nemo corrupti iusto architecto nam quo
            harum, dolor voluptatem dolorem autem voluptas amet? Iure inventore
            deserunt dolorum enim, reprehenderit iusto porro voluptate animi
            atque dolor accusantium ratione nesciunt sunt sint tenetur vel sed
            soluta architecto dolores, pariatur labore. Suscipit necessitatibus
            cum sint eaque nesciunt temporibus facere explicabo corrupti placeat
            omnis, labore mollitia debitis accusamus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
