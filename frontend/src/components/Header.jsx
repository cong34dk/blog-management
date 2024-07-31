export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col-2 text-center">
                            <a className="navbar-brand col-2" href="/">
                                <img src="https://devfast.us/images/devfast-logo.png" alt="Devfast" width="70" height="56" />
                            </a>
                        </div>
                        <div className="col-10 text-center">
                            <h1 className="text-white">Blog Managment</h1>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}