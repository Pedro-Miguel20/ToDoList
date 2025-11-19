import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
    return (
        <main className="flex grow flex-col">
            <Header/>
                <section className="flex grow">
                <Outlet/>
                </section>
        </main>
    );
}

export default MainLayout