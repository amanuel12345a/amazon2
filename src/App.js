import './App.css';
import Header from './Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

import { ProductsData } from './api/api';

import Footer from './footer/Footer';
import {createBrowserRouter,createRoutesFromElements,Outlet,Route,RouterProvider,ScrollRestoration} from 'react-router-dom'
const Layout = () =>{
  return <div>
    <Header />
    <ScrollRestoration />
    <Outlet />
    <Footer />
  </div>
}
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home  />} loader={ProductsData}>
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
          </Route>
          <Route path='/signin' element={<SignIn />}>
          </Route>
          <Route path='/signup' element={<SignUp />}>
          </Route>
          </Route>

  ))
  return (
    <div className="font-bodyFont bg-gray-100 ">
      <RouterProvider router={router}></RouterProvider>
      
    </div>
  );
}

export default App;
