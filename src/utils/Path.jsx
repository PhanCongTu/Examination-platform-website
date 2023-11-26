const Path = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    LOGOUT: '/logout',
    AMCLASSMANAGER: '/admin/class',
    AMTEACHERMANAGER:'/admin/teacher',
    AMSTUDENTMANAGER:'/admin/student/:idClassRoom',
    AMQUESTIONGROUPMANAGER:'/admin/questiongr/:id?',
    AMEXAMINATIONMANAGER:'/admin/examination/:idClassRoom?',
    AMQUESTIONMANAGER:'/admin/question/:idClassRoom?'
}
export default Path