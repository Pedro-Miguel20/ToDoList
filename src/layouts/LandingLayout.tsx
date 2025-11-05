import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function LandingLayout() {
    return (
        <><Header/>

            <main className="h-screen flex items-center">
                
            <Outlet/>
            </main>
        </>
    );
}

export default LandingLayout