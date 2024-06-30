const Path = {
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    VERIFY_EMAIL: '/verify-email',
    MY_INFO: '/my/info',
    AMCLASSMANAGER: '/admin/class',
    AMTEACHERMANAGER: '/admin/teacher',
    AMSTUDENTMANAGER: '/admin/student/:idClassRoom?',
    AMQUESTIONGROUPMANAGER: '/admin/questiongr/:id?',
    AMEXAMINATIONMANAGER: '/admin/examination/:idClassRoom?',
    AMQUESTIONMANAGER: '/admin/question/:idClassRoom?',
    AMSCOREMANAGER: '/admin/score/:idExam?',
    AMSCOREDETAILMANAGER: '/admin/score-detail?',
    MY_CLASSROOMS: '/my/classrooms',
    CLASSROOM_DETAIL: '/my/classroom-detail/:classroomId',
    PREPARE_TEST: '/my/prepare-test/:testId',
    DO_MC_TEST: '/my/do-mc-test',
    SCORE_DETAIL: '/my/score-detail/:testId',
    MY_ALL_SCORES: '/my/all-scores',
    TEACHERHOME:'/teacher/home/'
}
export default Path