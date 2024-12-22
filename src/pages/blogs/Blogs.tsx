// import { useContext } from "react";
import Banner from "../../components/Banner";
import BlogList from "./BlogList";
// import { ThemeContext } from "../../context/ThemeContext";



const Blogs = () => {
  // const {darkMode, setDarkMode} = useContext(ThemeContext);
  // console.log("Theme context from blog page ", darkMode);
  return (
    <section className="container max-w-7xl mx-auto px-4 py-3">
      <Banner/>
      <BlogList/>
    </section>
  )
}

export default Blogs;