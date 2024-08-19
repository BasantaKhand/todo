import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";
import {createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes} from "react-router-dom";
import Layout from "./Layout.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import DashPage from "./pages/dash/DashPage.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path ="" element={<Layout/>}>
            <Route index element={<App/>}></Route>
            <Route path={"/contact"} element={<ContactPage/>}></Route>
            <Route path={"/about"} element={<AboutPage/>}></Route>
            <Route path={"/dash"} element={<DashPage/>}></Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Auth0Provider
          domain="dev-6xy4s0aupgefx35d.us.auth0.com"
          clientId="pzL30yhb0fYGLHK5jh0p8eRPmdS3ZhC5"
          authorizationParams={{
              redirect_uri: window.location.origin,
          }}
      >
                <RouterProvider router={router}/>
          {/*<App />*/}
      </Auth0Provider>
  </React.StrictMode>,
);


