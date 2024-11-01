const Path = {
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot',
    VERIFY_EMAIL: '/verify-email',
    MY_INFO: '/my/info',
    AMCLASSMANAGER: '/admin/subject',
    AMTEACHERMANAGER: '/admin/teacher',
    AMSTUDENTMANAGER: '/admin/student/:idClassRoom?',
    AMQUESTIONGROUPMANAGER: '/admin/questiongr/:id?',
    AMEXAMINATIONMANAGER: '/admin/examination/:idClassRoom?',
    AMQUESTIONMANAGER: '/admin/question/:idClassRoom?',
    AMSCOREMANAGER: '/admin/score/:idExam?',
    AMSCOREDETAILMANAGER: '/admin/score-detail?',
    MY_SUBJECTS: '/my/subjects',
    SUBJECT_DETAIL: '/my/subject-detail/:subjectId',
    PREPARE_TEST: '/my/prepare-test/:testId',
    DO_MC_TEST: '/my/do-mc-test',
    SCORE_DETAIL: '/my/score-detail/:testId',
    MY_ALL_SCORES: '/my/all-scores',
    MY_ALL_TEST: '/my/all-tests',
    TEACHERHOME:'/teacher/home/'
}
export default Path