'use client'

import { createContext, useState, useContext, useEffect } from "react";



interface UserContextType {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

const ContextAPI: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(()=>{
        const fetchUserData = async () => {

            const response = await fetch(`/api/decoded`)
    
            if(response.ok){
                const data = await response.json();
                const { id } = data;
                setUserId(id);
            }
        }

        if (!userId) fetchUserData();

    },[userId])

    return (
        <UserContext.Provider value={{userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a ContextAPI provider");
    }
    return context;
}


export default ContextAPI;