import { Link } from "react-router-dom";

export default function NotFound(){
    return  <>
        <div className="container-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-5xl text-gray-400 italic font-bold">
                    ERROR 404
                </h1>
                <span className="font-semibold m-3 text-lg">
                    Page not found.
                </span>
                <Link to="/" className="text-blue-600 cursor-pointer">Go to homepage</Link>
            </div>
        </div>
    </>
}