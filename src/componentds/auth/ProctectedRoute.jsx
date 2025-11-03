import React from 'react'
import { Navigate } from 'react-router-dom'
import { getRole } from '../../services/authService'


export default function ProtectedRoute({ children, roles=[] }){
const role = getRole()
if (!role) return <Navigate to='/login' />
// roles param expects plain names: ['ADMIN','SUPER_ADMIN','USER']
if (roles.length>0){
const ok = roles.some(r=> role.includes(r))
if (!ok) return <Navigate to='/' />
}
return children
}