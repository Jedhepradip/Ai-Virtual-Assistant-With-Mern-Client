import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-user/current-user`, {
                    withCredentials: true,
                });

                console.log("res :", res);

                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="p-6 text-white">
            {user ? (
                <>
                    <h1>Welcome, {user.name} 👋</h1>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default Home;
