// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    password: "John1234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "2024-01-15",
    role: "student",
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    email: "sarah@example.com",
    password: "Sarah1234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    joinDate: "2023-06-10",
    role: "instructor",
    instructorSlug: "sarah-johnson",
  },
  {
    id: 3,
    fullName: "Michael Chen",
    email: "michael@example.com",
    password: "Michael1234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    joinDate: "2023-03-22",
    role: "instructor",
    instructorSlug: "michael-chen",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("learnhub_users");
      const savedSession = localStorage.getItem("learnhub_session");

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        setUsers(DEFAULT_USERS);
        localStorage.setItem("learnhub_users", JSON.stringify(DEFAULT_USERS));
      }

      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (e) {
      console.error("Error loading auth:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && users.length > 0) {
      localStorage.setItem("learnhub_users", JSON.stringify(users));
    }
  }, [users, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("learnhub_session", JSON.stringify(user));
      } else {
        localStorage.removeItem("learnhub_session");
      }
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => setAuthError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const signup = useCallback(
    ({ fullName, email, password }) => {
      setAuthError("");
      if (!fullName || !email || !password) {
        setAuthError("All fields are required");
        return false;
      }
      if (password.length < 8) {
        setAuthError("Password must be at least 8 characters");
        return false;
      }
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existingUser) {
        setAuthError("An account with this email already exists");
        return false;
      }
      const newUser = {
        id: Date.now(),
        fullName,
        email: email.toLowerCase(),
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName.replace(/\s/g, "")}`,
        joinDate: new Date().toISOString().split("T")[0],
        role: "student",
      };
      setUsers((prev) => [...prev, newUser]);
      const session = { ...newUser };
      delete session.password;
      setUser(session);
      return true;
    },
    [users]
  );

  const login = useCallback(
    ({ email, password }) => {
      setAuthError("");
      if (!email || !password) {
        setAuthError("Email and password are required");
        return false;
      }
      const foundUser = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
      if (!foundUser) {
        setAuthError("Invalid email or password");
        return false;
      }
      const session = { ...foundUser };
      delete session.password;
      setUser(session);
      return true;
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
    setAuthError("");
  }, []);

  const updateProfile = useCallback(
    ({ fullName, email }) => {
      setAuthError("");
      if (!fullName || !email) {
        setAuthError("Name and email are required");
        return false;
      }
      const emailTaken = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() && u.id !== user.id
      );
      if (emailTaken) {
        setAuthError("This email is already in use");
        return false;
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                fullName,
                email: email.toLowerCase(),
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName.replace(/\s/g, "")}`,
              }
            : u
        )
      );
      setUser((prev) => ({
        ...prev,
        fullName,
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName.replace(/\s/g, "")}`,
      }));
      return true;
    },
    [users, user]
  );

  const changePassword = useCallback(
    ({ currentPassword, newPassword }) => {
      setAuthError("");
      const foundUser = users.find((u) => u.id === user.id);
      if (foundUser.password !== currentPassword) {
        setAuthError("Current password is incorrect");
        return false;
      }
      if (newPassword.length < 8) {
        setAuthError("New password must be at least 8 characters");
        return false;
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, password: newPassword } : u
        )
      );
      return true;
    },
    [users, user]
  );

  const switchToInstructor = useCallback(() => {
    if (user) {
      const slug = user.fullName.toLowerCase().replace(/\s+/g, "-");
      setUser((prev) => ({ ...prev, role: "instructor", instructorSlug: slug }));
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, role: "instructor", instructorSlug: slug } : u
        )
      );
    }
  }, [user]);

  const switchToStudent = useCallback(() => {
    if (user) {
      setUser((prev) => ({ ...prev, role: "student" }));
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: "student" } : u))
      );
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInstructor: user?.role === "instructor",
        isLoaded,
        authError,
        setAuthError,
        signup,
        login,
        logout,
        updateProfile,
        changePassword,
        switchToInstructor,
        switchToStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}