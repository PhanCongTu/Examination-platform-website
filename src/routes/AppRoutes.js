import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Path from '../utils/Path'
import Home from '../pages/User/Home/Home'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import ForgotPassword from '../pages/Forgot/ForgotPassword'
import ScoreDetail from '../pages/User/ScoreDetail/ScoreDetail'
import { Logout } from '../pages/Logout/Logout'
import PageNotFound from '../pages/PageNotFound'

import { Admin } from '../pages/Admin/Admin'
import { Classmanager } from '../pages/Admin/Manager/Classmanager'
import { Studentmanager } from '../pages/Admin/Manager/Studentmanager'
import { QuestionGroup } from '../pages/Admin/Manager/Questiongroupmanager'
import { Examinationmanager } from '../pages/Admin/Manager/Examinationmanager'
import { Questionmanager } from '../pages/Admin/Manager/Questionmanager'
import { Scoremanager } from '../pages/Admin/Manager/Scoremanager'
import MyClassroom from '../pages/User/MyClassrooms/MyClassrooms';
import ClassroomDetail from '../pages/User/ClassrommDetail/ClassroomDetail'
import PrepareTest from '../pages/User/PrepareTest/PrepareTest';
import Student from '../pages/User/Student'
import DoMCTest from '../pages/User/DoMCTest/DoMCTest'

export const AppRoutes = () => {

  return (
    <div className=''>
      <Routes>

        <Route path={Path.HOME} element={<Home />} exact />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.FORGOT} element={<ForgotPassword />} />
        <Route path={Path.LOGOUT} element={<Logout />} />

        <Route path='/my' element={<Student />} >
          <Route path={Path.MY_CLASSROOMS} element={<MyClassroom />} />
          <Route path={Path.CLASSROOM_DETAIL} element={<ClassroomDetail />} />
          <Route path={Path.PREPARE_TEST} element={<PrepareTest />} />
          <Route path={Path.DO_MC_TEST} element={<DoMCTest />} />
          <Route path={Path.SCORE_DETAIL} element={<ScoreDetail />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route path={Path.AMCLASSMANAGER} element={<Classmanager />} />
          <Route path={Path.AMQUESTIONGROUPMANAGER} element={<QuestionGroup />} />
          <Route path={Path.AMEXAMINATIONMANAGER} element={<Examinationmanager />} />
          <Route path={Path.AMSTUDENTMANAGER} element={<Studentmanager />} />
          <Route path={'/admin/student/:idClassRoom'} element={<Studentmanager />} />
          <Route path={Path.AMQUESTIONMANAGER} element={<Questionmanager />} />
          <Route path={Path.AMSCOREMANAGER} element={<Scoremanager />} />
          <Route path={'/admin/student'} element={<Studentmanager showByIdClassRoom={false} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div >
  )
}
