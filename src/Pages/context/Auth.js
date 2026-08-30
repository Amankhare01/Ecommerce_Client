import {useState, useContext,useEffect ,createContext} from "react";
const AuthContext = createContext();
const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({
        users: null,
        token: "",
    });

    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
            try {
                const parseData = JSON.parse(data);
                setAuth({
                    users: parseData.users,
                    token: parseData.token,
                });
            } catch (err) {
                console.error("Failed to parse auth from localStorage", err);
            }
        }

        const handleLogoutEvent = () => {
            setAuth({ users: null, token: "" });
        };

        window.addEventListener("auth-logout", handleLogoutEvent);
        return () => {
            window.removeEventListener("auth-logout", handleLogoutEvent);
        };
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () =>useContext(AuthContext);
export {useAuth, AuthProvider};
