import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-nav flex-column">
                <Link className="nav-link text-dark" aria-current="page" to="/">
                    <i className="fa-solid fa-list-ul me-2"></i>
                    List
                </Link>
                <Link className="nav-link text-dark" to="/create">
                    <i className="fa-regular fas fa-file-circle-plus me-2"></i>
                    New
                </Link>
                <Link className="nav-link text-dark" to="/search">
                    <i className="fa-solid fa-magnifying-glass me-2"></i>
                    Search
                </Link>
            </div>
        </nav>

    )
}