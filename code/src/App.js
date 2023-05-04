import './App.scss';
import Map from './pages/Map'
import Predicate from './pages/Predicate'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Map />,
      },
      {
        path: "/predicate",
        element: <Predicate />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
