import React from 'react'
import {useState, useEffect } from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkStatus, setCheckStatus] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoggedIn(true)
            }
            setCheckStatus(false)
        })
    })

    return {loggedIn, checkStatus}
    
  
}

export default useAuthStatus;