import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import {useLocation} from "react-router-dom";

export default function Layout() {
    const location = useLocation();

    return (
        <>
            <Outlet/>
            <Footer/>
        </>
    )
}