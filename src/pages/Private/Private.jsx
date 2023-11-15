import React from 'react'
import { Sidebar } from '../../components/form-controls/Nav/Sidebar'
import { Outlet } from 'react-router-dom'

export const Private= () => {
  return (
    <div>
       <Sidebar/>
       <Outlet/>
    </div>
  )
}
