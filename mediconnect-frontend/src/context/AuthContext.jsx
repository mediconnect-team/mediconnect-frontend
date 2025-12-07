import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const DEMO_USERS = {
    patient: {
        email: "patient@demo.com",
        password: "demo123",
        role: "PATIENT",
        name: "John Patient"
    },
    doctor: {
        email: "doctor@demo.com",
        password: "demo123",
        role: "DOCTOR",
        name: "Dr. Smith"
    },
    admin: {
        email: "admin@demo.com",
        password: "demo123",
        role: "ADMIN",
        name: "Admin User"
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (role, email, password) => {
        const demo = DEMO_USERS[role];

        if (!demo) return false;
        if (demo.email !== email || demo.password !== password) return false;

        const userData = {
            name: demo.name,
            email: demo.email,
            role: demo.role
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
