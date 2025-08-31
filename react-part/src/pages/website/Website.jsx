import { Outlet } from "react-router-dom";
import Header from "../../component/Website/header";

function Website() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Website;
