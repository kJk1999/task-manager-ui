import React,{useContext} from 'react'
import AuthContext from './AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext)
    console.log(isAuthenticated,"isAuthenticated")
    
    if(!isAuthenticated){
        return <Navigate to="/signin"/>
    }
    return children

 
}

export default ProtectedRoute
