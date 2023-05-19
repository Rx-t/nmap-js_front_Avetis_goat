import config from "@/web/config.js"

import api from "@/web/services/api.js"

import { createContext, useContext, useEffect, useState } from "react"

import jwt_decode from "jwt-decode"


const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)

  const signIn = async ({ email, password }) => {
    const { data } = await api.post("/login", { email, password })

    localStorage.setItem(config.security.jwt.storageKey, data?.token)

    const payload = jwt_decode(data?.token)

    setSession(payload)
  }

  const signUp = async ({ username, email, password }) => {
    await api.post("/signup", { username, email, password })
  }

  const signOut = () => {
    localStorage.removeItem(config.security.jwt.storageKey)

    setSession(false)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.jwt.storageKey)

    if (!jwt) {
      setSession(false)

      return
    }

   const payload = jwt_decode(jwt)

    setSession(payload)
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{
        state: { session },
        actions: {
          signIn,
          signUp,
          signOut,
        },
      }}
    />
  )
}

export default AppContext
