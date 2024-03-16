import { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const login = () => {
    setLogged(true);
  };
  const logout = () => {
    removeStorage("adminLogged");
    setLogged(false);
  };
  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function removeStorage(key) {
  return localStorage.removeItem(key);
}
export {
  AuthContext,
  AuthProvider,
  saveToStorage,
  getFromStorage,
  removeStorage,
};
