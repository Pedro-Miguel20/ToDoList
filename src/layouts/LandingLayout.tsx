import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function LandingLayout() {
    return (
        <><Header/>

            <main className="flex grow-1 relative">
                
            <Outlet/>
            </main>
        </>
    );
}

export default LandingLayout