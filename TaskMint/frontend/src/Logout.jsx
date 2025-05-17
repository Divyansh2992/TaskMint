import React, { useEffect } from "react";
import axios from "axios";

const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get("http://localhost:3000/logout", { withCredentials: true });
                alert("You have been logged out.");
                window.location.href = "/login";
            } catch {
                alert("Error logging out. Please try again.");
            }
        };

        logout();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
