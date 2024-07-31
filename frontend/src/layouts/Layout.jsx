import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Layout() {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10 bg-light p-3">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
