import { createContext, useContext, useState, useEffect } from "react";

const menuBarContext = createContext();

function MenuBarProvider({ children }) {
  const [menuBar, setMenuBar] = useState(true);

  return (
    <menuBarContext.Provider value={{ menuBar, setMenuBar }}>
      {children}
    </menuBarContext.Provider>
  );
}

export default MenuBarProvider;
export const useMenuBar = () => useContext(menuBarContext);