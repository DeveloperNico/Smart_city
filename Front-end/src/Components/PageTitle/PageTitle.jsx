import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PageTitle() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        let title = "Smart Flow";

        switch (path) {
            case "/":
                title = "Smart Flow | Home";
            break;
            case "/singUp":
                title = "Smart Flow | Sing Up";
            break;
            case "/login":
                title = "Smart Flow | Login";
            break;
            case "/pageApp":
                title = "Smart Flow | Welcome";
            break;
            default:
                title = "Smart Flow";
        }

        document.title = title;
    }, [location]);

    return null;
}