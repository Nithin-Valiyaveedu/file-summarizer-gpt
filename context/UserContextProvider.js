"use client"

import { useState, useEffect } from "react"
import { getUserDetails } from "@utils/crypto"

import { UserContext } from "./UserContex"
import { useRouter } from "next/navigation"

const UserContextProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [logoutModal, setLogoutModal] = useState(false)
  const displayLogoutModal = () => setLogoutModal(true);

  useEffect(() => {
    // checks if the user is authenticated
    setUser(getUserDetails())
    const { authToken } = getUserDetails();
    console.log("auth", authToken);
    !authToken && router.push("/");
  }, []);


  return (<UserContext.Provider value={{ user, setUser, logoutModal, setLogoutModal, displayLogoutModal }}>{children}</UserContext.Provider>)
}

export default UserContextProvider;