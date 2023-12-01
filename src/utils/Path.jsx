const Path = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    LOGOUT: '/logout',
    VERIFY_EMAIL: '/verify-email',
    AMCLASSMANAGER: '/admin/class',
    AMTEACHERMANAGER: '/admin/teacher',
    AMSTUDENTMANAGER: '/admin/student/:idClassRoom?',
    AMQUESTIONGROUPMANAGER: '/admin/questiongr/:id?',
    AMEXAMINATIONMANAGER: '/admin/examination/:idClassRoom?',
    MY_CLASSROOMS: '/my/classrooms',
    CLASSROOM_DETAIL: '/my/classroom-detail/:classroomId',
    PREPARE_TEST: '/my/prepare-test/:testId',
    DO_MC_TEST: '/my/do-mc-test',
    SCORE_DETAIL: '/my/score-detail/:testId',
}
export default Path