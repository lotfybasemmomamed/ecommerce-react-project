import { createContext, useContext, useState, useEffect } from "react";

const WindowContext = createContext();

export default function WindowProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowContext.Provider value={{ windowWidth }}>
      {children}
    </WindowContext.Provider>
  );
}

export const useWindowWidth = () => useContext(WindowContext);
