import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <BlogProvider>
          <Navbar />
          <main
            className={`min-h-screen bg-white dark:bg-gray-900 dark:text-white`}
          >
            <Outlet />
          </main>
          <Footer />
        </BlogProvider>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
