import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../addblog/InputField";
import TextAreaField from "../addblog/TextAreaField";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

type Inputs = {
    title: string;
    description: string;
    authorName: string;
    authorImage: string;
    image: string;
  };

const UpdateBlog = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  // console.log(id)
      const {
        register,
        handleSubmit,
        reset,
        setValue
      } = useForm<Inputs>();
      
      useEffect(()=>{
        const fetchSingleBlog = async()=>{
          try {
            const response = await axios.get(`https://meta-blog-backend-five.vercel.app/blogs/${id}`);
            console.log(response.data)
            const blog = response.data.blog
            setValue('title', blog?.title);
            setValue('description', blog?.description);
            setValue('authorName', blog?.author?.name);
            setValue('authorImage', blog?.author?.image);
            setValue('image', blog?.image);
          } catch (error) {
            console.log("Failed to fetch single blog", error)
          }
        }
        fetchSingleBlog();
      },[id, setValue])
      const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const blogData = {
            title: data.title,
            description: data.description,
            image: data.image,
            author:{
                name:data.authorName,
                image:data.authorImage,
            }
        }
        try {
          const response = await axios.put(`https://meta-blog-backend-five.vercel.app/blogs/${id}`, blogData)
          if(response.status === 200){
            alert("Blog updated successfully")
            reset()
            navigate("/");
          }
        } catch (error) {
          console.log("Failed to update blog data", error)
        }
      };
  return (
    <div className="container mx-auto max-w-7xl px-4 py-24">
      <h2 className="text-2xl font-bold mb-6">Update Blog</h2>
      {/* form */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-3xl space-y-4 p-6 rounded-lg shadow-md"
        >
          <InputField
            label="Blog Title"
            id="title"
            placeholder="Blog Title"
            type="text"
            register={register("title", { required: true })}
          />
          {/* text area */}
          <TextAreaField
            label="Blog Description"
            id="description"
            placeholder="Blog Description"
            register={register("description", { required: true })}
          />

          <InputField
            label="Author Name"
            id="authorName"
            placeholder="Author Name"
            type="text"
            register={register("authorName", { required: true })}
          />
          <InputField
            label="Author Image URL"
            id="authorImage"
            placeholder="Author Image URL"
            type="url"
            register={register("authorImage", { required: true })}
          />
          <InputField
            label="Blog Image URL"
            id="image"
            placeholder="Blog Image URL"
            type="url"
            register={register("image", { required: true })}
          />

          <div>
            <button
              type="submit"
              className="w-full bg-secondery text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBlog