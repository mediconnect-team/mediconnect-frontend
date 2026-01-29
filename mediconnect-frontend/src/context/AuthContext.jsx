import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const DEMO_USERS = {
    patient: {
        email: "patient@demo.com",
        password: "demo123",
        role: "PATIENT",
        name: "John Patient",
        id: 1  // patientId for demo
    },
    doctor: {
        email: "doctor@demo.com",
        password: "demo123",
        role: "DOCTOR",
        name: "Dr. Smith",
        id: 1  // doctorId for demo
    },
    admin: {
        email: "admin@demo.com",
        password: "demo123",
        role: "ADMIN",
        name: "Admin User",
        id: 1  // adminId for demo
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            const parsedUser = JSON.parse(saved);
            // Migrate existing users to include id if missing
            if (!parsedUser.id) {
                const role = parsedUser.role?.toLowerCase();
                if (role && DEMO_USERS[role]) {
                    parsedUser.id = DEMO_USERS[role].id;
                    localStorage.setItem("user", JSON.stringify(parsedUser));
                }
            }
            return parsedUser;
        }
        return null;
    });

    const login = (role, email, password) => {
        const demo = DEMO_USERS[role];

        if (!demo) return false;
        if (demo.email !== email || demo.password !== password) return false;

        const userData = {
            id: demo.id,
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
