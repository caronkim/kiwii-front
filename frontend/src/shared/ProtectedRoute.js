import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";

const ProtectedRoute = () => {
    const [cookies] = useCookies(["uuid"]); // userId 쿠키 가져오기

    return cookies.uuid ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;