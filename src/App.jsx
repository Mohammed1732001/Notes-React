import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './componant/Layout/Layout'
import Login from './componant/Login/Login';
import Home from './componant/Home/Home';
import Rigister from './componant/Rigister/Rigister';
import InverseProtectedRoot from './componant/InverseProtectedRoot/InverseProtectedRoot';
import ProtectedRoot from './componant/ProtectedRoot/ProtectedRoot';

let routers = createHashRouter ([{
path:"/", element: <Layout/>,children:[
{path:"login",element:<InverseProtectedRoot><Login/></InverseProtectedRoot> },
{path:"home",element:<ProtectedRoot><Home/></ProtectedRoot> },
{index:true,element: <InverseProtectedRoot><Rigister/></InverseProtectedRoot> },
]
}])

export default function App() {
  return <>
  <RouterProvider router={routers}/>
  </>
    
  
}
