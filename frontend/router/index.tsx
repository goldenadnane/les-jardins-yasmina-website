import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import Rooms from '../pages/Rooms';
import Gallery from '../pages/Gallery';
import Activities from '../pages/Activities';
import Contact from '../pages/Contact';
import { RoomDetails } from '../pages/RoomDetails'; // <-- import ton composant

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/reservation', element: <Reservation /> },
      { path: '/rooms', element: <Rooms /> },
      { path: '/room/:id', element: <RoomDetails /> }, // <-- ajoute cette route
      { path: '/gallery', element: <Gallery /> },
      { path: '/activities', element: <Activities /> },
      { path: '/contact', element: <Contact /> }
    ]
  }
]);
