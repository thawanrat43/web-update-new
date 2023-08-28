// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const Context = createContext({});

// export const AuthContext = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputs) => {
//     const res = await axios.post("http://localhost:3333/login", inputs);
//     setCurrentUser(res.data);
//   };

//   const logout = async (inputs) => {
//     await axios.post("http://localhost:3333/");
//     setCurrentUser(null);
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext  value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext>
//   );
// };