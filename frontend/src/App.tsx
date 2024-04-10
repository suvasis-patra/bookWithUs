import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AuthLayout,
  HomeLayout,
  Landing,
  Login,
  MyBookings,
  MyHotels,
  Register,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "my-hotels",
        element: <MyHotels />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AppContextProvider>
    </>
  );
}

export default App;
