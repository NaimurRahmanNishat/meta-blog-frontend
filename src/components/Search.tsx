import { SetStateAction, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogContext from "../context/BlogContext";


const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const {setSearchTerm} = useContext(BlogContext);
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) =>{
    setInputValue(e.target.value);
  }
  const handleSearch = () =>{
    setSearchTerm(inputValue);
  }
  return (
    <div className="relative">
        <input onChange={handleInputChange} type="text" placeholder="Search..." className="bg-[#F4F4F5] py-2 px-4 focus:outline-none rounded-full"/>
        <button onClick={handleSearch} className="absolute right-3 top-2.5 hover:text-secondery"><FaSearch/></button>
    </div>
  )
}

export default Search;