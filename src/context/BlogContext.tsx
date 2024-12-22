import React, { createContext, useState, ReactNode } from "react";

interface BlogContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BlogContext = createContext<BlogContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BlogContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
