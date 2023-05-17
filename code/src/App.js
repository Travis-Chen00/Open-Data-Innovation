import './App.scss';
import Map from './pages/Map'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MyForm from './pages/MyForm';
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
        element: <MyForm />,
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
