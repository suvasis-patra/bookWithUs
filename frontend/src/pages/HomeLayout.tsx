import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="pt-8 md:pt-12">
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;
