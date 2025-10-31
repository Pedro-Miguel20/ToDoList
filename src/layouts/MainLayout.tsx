import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
    return (
        <main className="">
            <Header/>
                <section className="">
                <Outlet/>
                </section>
        </main>
    );
}

export default MainLayout