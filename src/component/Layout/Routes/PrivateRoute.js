import { useState, useEffect } from "react";
import { useAuth } from "../../../Pages/context/Auth";
import { Outlet } from "react-router-dom";
import axios from "../../../api/axios";
import Spinner from "../Layout/Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("/api/v1/auth/user-auth");
                if (res.data?.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                setOk(false);
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setLoading(false);
            setOk(false);
        }
    }, [auth?.token]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return ok ? <Outlet /> : <Spinner path="login" />;
}