// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/common/Layout";
import Home from "../pages/Home";
import Reservation from "../pages/Reservation";
import Rooms from "../pages/Rooms";
import Gallery from "../pages/Gallery";
import Activities from "../pages/Activities";
import Contact from "../pages/Contact";
import { RoomDetails } from "../pages/RoomDetails";
import ScrollToTop from "@/components/ScrollToTop";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ), // Modifiez ici
    children: [
      { path: "/", element: <Home /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/room/:id", element: <RoomDetails /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/activities", element: <Activities /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
