import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLogoutUser } from "../react-query/queries";
import toast from "react-hot-toast";
const NavItems = () => {
  const { mutateAsync: logOutCurrentUser } = useLogoutUser();
  const { isLoggedIn, setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logOutCurrentUser();
      if (response?.statusCode === 200) {
        setLoggedIn(false);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  return (
    <div>
      {!isLoggedIn ? (
        <>
          <div className="flex md:flex-row items-center gap-4">
            <button
              className="bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-rose-700 transition-all duration-75"
              type="button"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
            <button
              className="bg-black text-white font-semibold px-4 py-2 rounded-lg  hover:bg-slate-400 hover:text-black transition-all duration-75"
              type="button"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4 md:flex-row md:gap-8 items-center">
            <Link
              to="/my-bookings"
              className="hover:text-rose-500 font-semibold"
            >
              My Bookings
            </Link>
            <Link to="/my-hotels" className="hover:text-rose-500 font-semibold">
              My Hotels
            </Link>
            <button
              className="bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavItems;
