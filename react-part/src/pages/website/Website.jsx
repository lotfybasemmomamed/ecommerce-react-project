import { Outlet } from "react-router-dom";
import Header from "../../component/Website/header";
import Footer from "../../component/Website/Footer";

function Website() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Website;
