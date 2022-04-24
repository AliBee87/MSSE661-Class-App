import { Outlet } from "react-router-dom";
//anything nested inside the layout componenet is represented by the outlet
const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout;