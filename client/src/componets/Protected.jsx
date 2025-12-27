import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protected = ({ element: Component }) => {
    const token = Cookies.get("jwt_token");

    // If token is not found, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected component
    return Component;
};

export default Protected;
