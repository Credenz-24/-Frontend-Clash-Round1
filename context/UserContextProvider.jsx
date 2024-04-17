import React from 'react'
import UserContext from "./UserContext"
import { useState } from 'react';


const UserContextProvider = ({children}) => {
    const [currentUser , setUser] = useState({});
    return(
        <UserContext.Provider value = {{currentUser , setUser}}>
        {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider