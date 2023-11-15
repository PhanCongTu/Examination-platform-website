import React from 'react'
import { Sidebar } from '../../components/form-controls/Nav/Sidebar'
import { Outlet } from 'react-router-dom'


export const Admin = () => {
  return (
    <div>
        <Sidebar></Sidebar>
        <Outlet/>
        
    </div>
  )
}
