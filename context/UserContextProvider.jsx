import React from 'react'
import UserContext from "./UserContext"
import { useState } from 'react';


const UserContextProvider = ({children}) => {
    const [currentUser , setUser] = useState(null);
    return(
        <UserContext.Provider value = {{currentUser , setUser}}>
        {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider