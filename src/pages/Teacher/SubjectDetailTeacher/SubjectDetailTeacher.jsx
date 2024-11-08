import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getMCTestsOfSubjectService, getSubjectByIdService } from '../../../services/UserService';
import ModalCustom from '../../../components/modal/Modal';
import { addExamByIdClassroomService, deleteExamService, exportListStudentOfClassService, getAllActivateQuestionGroupService, getAllActiveQuestionByIdClassroomService, getAllStudentOfClassService, getFormattedDateTimeByMilisecond, removeCredential, setFormatDateYYYYMMDD, updateExamService } from '../../../services/ApiService';
import Path from '../../../utils/Path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const TEST_NAME = 'test_name';
const START_DATE = 'start_date';
const END_DATE = 'end_date';

export default function SubjectDetailTeacher() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [tests, setTests] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortType, setSortType] = useState('asc');
    const [sortBy, setSortBy] = useState('testName');
    const [searchText, setSearchText] = useState('');
    const [size, setSize] = useState(4);
    const [column, setColumn] = useState(END_DATE);
    const [search, setSearch] = useState('');
    const [isEnded, setIsEnded] = useState(false); // Filter expired or active tests


    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null); // Bài kiểm tra đang được sửa hoặc xóa

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTest, setNewTest] = useState({
        subjectId: '',
        testName: '', startDate: (new Date()).getTime(), endDate: (new Date()).getTime(), testingTime: '',
        description: '', targetScore: ''
    });
    const [addQuestionModal, setAddQuestionModal] = useState(null);
    const sortOptions = [
        { value: 'testName', label: t('Test Name') },
        { value: 'startDate', label: t('Start Date') },
        { value: 'endDate', label: t('End Date') }
    ];
    const [students, setStudents] = useState([]);
    const [studentPage, setStudentPage] = useState(0);
    const [studentTotalPages, setStudentTotalPages] = useState(1);
    const [studentSortBy, setStudentSortBy] = useState('displayName');
    const [studentSortType, setStudentSortType] = useState('asc');
    const [studentSearchText, setStudentSearchText] = useState('');
    const handleClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setNewTest({
            subjectId: '',
            testName: '', startDate: (new Date()).getTime(), endDate: (new Date()).getTime(), testingTime: '',
            description: '', targetScore: ''
        })
        setSelectedTest(null);
    }
    useEffect(() => {
        fetchStudents();
    }, [studentPage, studentSortBy, studentSortType, studentSearchText]);

    const fetchStudents = () => {
        getAllStudentOfClassService(subjectId, studentPage, studentSortType, studentSortBy, 10, studentSearchText)
            .then((res) => {
                setStudents(res.data.content);
                setStudentPage(res.data.number);
                setStudentTotalPages(res.data.totalPages);
            })
            .catch(() => setStudents([]));
    };
    useEffect(() => {
        getSubjectDetail();

    }, [subjectId, page, sortType, column, isEnded]);
    useEffect(() => {
        fetchTests();
    }, [])
    const getSubjectDetail = () => {
        getSubjectByIdService(subjectId)
            .then((res) => setSubject(res.data))
            .catch(() => setSubject(null));
    };

    const fetchTests = () => {
        getMCTestsOfSubjectService(subjectId, page, sortType, column, size, search, isEnded)
            .then((res) => {
                setTests(res.data.content);
                setPage(res.data.number);
                setTotalPages(res.data.totalPages);
            })
            .catch(() => setTests([]));
    };
    const handleClickExport = () => {
        exportListStudentOfClassService(subjectId, "excel").then((res) => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Student.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
            console.log("successeee")

        }).catch((e) => {
            console.log(e)
        })
    }
    const handleAddTest = (body) => {

        newTest.subjectId = subjectId
        addExamByIdSubject(newTest);
    };
    const addExamByIdSubject = (body) => {
        addExamByIdClassroomService(body).then((res) => {
            fetchTests();
            toast.success(t('Add exam successful !'), {
                position: toast.POSITION.TOP_RIGHT,
            });
            handleClose();
        }).catch((error) => {
            toast.error(t('Add exam fail !'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

    const handleEditTest = () => {
        updateExamService(selectedTest).then((res) => {
            fetchTests();
            handleClose();
        }).catch((error) => {
            toast.error(t('Update exam fail !'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
       
    };

    const handleDeleteTest = () => {
        deleteExamService(selectedTest.id).then((res) => {
            fetchTests();
            handleClose();
        }).catch((error) => {
            toast.error(t('Delete exam fail !'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        // deleteTestService(selectedTest.id)
        //     .then(() => {
        //         toast.success(t('Test deleted successfully'));
        //         fetchTests();
        //         setShowDeleteModal(false);
        //         setSelectedTest(null);
        //     })
        //     .catch(() => toast.error(t('Error deleting test')));
    };

    const toggleIsEnded = () => {
        setIsEnded((prevIsEnded) => !prevIsEnded);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div>
                <div>
                    <div onClick={() => navigate(-1)}
                        className='top 0 flex justify-start items-center cursor-pointer w-fit rounded-lg p-5'>
                        <FontAwesomeIcon className='mr-3' icon={faLeftLong} /> {t('Back to previous page')}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">{t('Subject detail')}</h1>


                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{subject?.subjectName}</h2>
                        <p className="text-gray-500">{t('Subject code')}: {subject?.subjectCode}</p>
                        <p className="text-gray-500">{t('Total tests')}: {subject?.numberOfExams}</p>
                        <p className="text-gray-500">{t('Total students')}: {subject?.numberOfStudents}</p>
                        <p className="text-gray-500">{t('Description')}: {subject?.description || t('No description provided')}</p>
                        <div className='flex items-center justify-end'>
                            <button
                                onClick={() => navigate(Path.TEACHER_MANAGER_QUESGR.replace(":subjectId?", subjectId))}
                                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                            >
                                {t('Show question group of subject')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>





            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{t('Related Tests')}</h2>


                    <input
                        type="text"
                        placeholder={t('Search tests')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="border p-2 rounded bg-white mr-4"
                    />


                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border p-2 rounded bg-white"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border p-2 rounded bg-white"
                    >
                        <option value="asc">{t('Ascending')}</option>
                        <option value="desc">{t('Descending')}</option>
                    </select>


                    <button
                        onClick={toggleIsEnded}
                        className={`px-4 py-2 rounded-lg ${isEnded ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                        {isEnded ? t('View active tests') : t('View expired tests')}
                    </button>

                    <button onClick={() => setShowAddModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                        {t('Add')}
                    </button>
                </div>

                {tests.length > 0 ? (
                    <ul className="space-y-3">
                        {tests.map(test => (
                            <li
                                key={test.id}
                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-medium text-gray-700">{test.testName}</p>
                                    <div className="text-sm text-gray-500 mt-1">
                                        <p>{t('Start date')}: {new Date(test.startDate).toLocaleDateString()}</p>
                                        <p>{t('End date')}: {new Date(test.endDate).toLocaleDateString()}</p>
                                        <p>{t('Duration')}: {test.testingTime} {t('minutes')}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => { setSelectedTest(test); setShowEditModal(true); }} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                        {t('Edit')}
                                    </button>
                                    <button onClick={() => { setSelectedTest(test); setShowDeleteModal(true); }} className="bg-red-500 text-white px-2 py-1 rounded">
                                        {t('Delete')}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">{t('No tests associated with this subject')}</p>
                )}


                <div className="flex justify-between mt-4">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg">
                        {t('Previous')}
                    </button>
                    <span>{t('Page')} {page + 1} {t('of')} {totalPages}</span>
                    <button onClick={() => setPage(prev => (prev < totalPages - 1 ? prev + 1 : prev))} disabled={page >= totalPages - 1} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg">
                        {t('Next')}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('Students in this Subject')}</h2>


                <input
                    type="text"
                    placeholder={t('Search students')}
                    value={studentSearchText}
                    onChange={(e) => setStudentSearchText(e.target.value)}
                    className="border p-2 rounded bg-white mr-4"
                />


                <select
                    value={studentSortBy}
                    onChange={(e) => setStudentSortBy(e.target.value)}
                    className="border p-2 rounded bg-white mr-4"
                >
                    <option value="displayName">{t('Name')}</option>
                    <option value="emailAddress">{t('Email')}</option>
                </select>

                <select
                    value={studentSortType}
                    onChange={(e) => setStudentSortType(e.target.value)}
                    className="border p-2 rounded bg-white"
                >
                    <option value="asc">{t('Ascending')}</option>
                    <option value="desc">{t('Descending')}</option>
                </select>
                <button onClick={() => handleClickExport()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    {t('Export list student of subject')}
                </button>

                {students.length > 0 ? (
                    <ul className="space-y-3 mt-4">
                        {students.map(student => (
                            <li key={student.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <p className="text-lg font-medium text-gray-700">{student.displayName}</p>
                                <p className="text-sm text-gray-500">{student.emailAddress}</p>
                                <p className="text-sm text-gray-500">{t('Roles')}: {student.roles.join(', ')}</p>
                                <p className="text-sm text-gray-500">{t('Status')}: {student.isEnable ? t('Enabled') : t('Disabled')}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">{t('No students found')}</p>
                )}


                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setStudentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={studentPage === 0}
                        className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                    >
                        {t('Previous')}
                    </button>
                    <span>{t('Page')} {studentPage + 1} {t('of')} {studentTotalPages}</span>
                    <button
                        onClick={() => setStudentPage((prev) => (prev < studentTotalPages - 1 ? prev + 1 : prev))}
                        disabled={studentPage >= studentTotalPages - 1}
                        className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                    >
                        {t('Next')}
                    </button>
                </div>
            </div>
            {showAddModal && (
                <ModalCustom title={t('Add New Test')} onClose={() => setShowAddModal(false)}>
                    <AddTestForm
                        test={newTest}
                        onChange={setNewTest}
                        onSave={handleAddTest}
                        openAddQuestionModal={() => setAddQuestionModal(true)}
                    />
                </ModalCustom>
            )}

            {addQuestionModal && (
                <ModalCustom title={t('Add Question')} onClose={() => setAddQuestionModal(null)}>
                    <div>
                        <button
                            className="bg-purple-500 text-white px-4 py-2 rounded w-full mb-4"
                            onClick={() => setAddQuestionModal('random')}>
                            {t('Add Random Questions from Set')}
                        </button>
                        <button
                            className="bg-teal-500 text-white px-4 py-2 rounded w-full"
                            onClick={() => setAddQuestionModal('manual')}>
                            {t('Add Manual Questions')}
                        </button>
                    </div>
                </ModalCustom>
            )}

            {addQuestionModal === 'random' && (
                <ModalCustom title={t('Add random questions')} onClose={() => setAddQuestionModal(null)}>
                    <RandomQuestionForm onSave={(questions) => {
                        setNewTest({ ...newTest, randomQuestions: questions });
                        setAddQuestionModal(null);
                    }} subjectId={subjectId} />
                </ModalCustom>
            )}

            {addQuestionModal === 'manual' && (
                <ModalCustom title={t('Add manual questions')} onClose={() => setAddQuestionModal(null)}>
                    <ManualQuestionForm onSave={(questionIds) => {
                        setNewTest({ ...newTest, questionIds: questionIds });
                        setAddQuestionModal(null);
                    }} subjectId={subjectId} />
                </ModalCustom>
            )}

            {showEditModal && (
                <ModalCustom title={t('Edit Test')} onClose={() => handleClose()}>
                    <AddTestForm test={selectedTest} onChange={setSelectedTest} onSave={handleEditTest} />
                </ModalCustom>
            )}


            {showDeleteModal && (
                <ModalCustom title={t('Confirm Delete')} onClose={() => handleClose()}>
                    <p>{t('Are you sure you want to delete this test?')}</p>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => handleClose()} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                            {t('Cancel')}
                        </button>
                        <button onClick={handleDeleteTest} className="bg-red-500 text-white px-4 py-2 rounded">
                            {t('Delete')}
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
}



function AddTestForm({ test, onChange, onSave, openAddQuestionModal }) {
    const { t } = useTranslation();
    const [errors, setErrors] = useState({});
    const currentDate = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại để kiểm tra

    const validateForm = () => {
        const newErrors = {};

        // Kiểm tra ngày bắt đầu
        if (test.startDate < currentDate) {
            newErrors.startDate = t('Start date must be in the future');
        }

        // Kiểm tra ngày kết thúc
        if (test.endDate <= test.startDate) {
            newErrors.endDate = t('End date must be after start date');
        }

        // Kiểm tra điểm mục tiêu
        if (test.targetScore < 0 || test.targetScore > 10) {
            newErrors.targetScore = t('Target score must be between 0 and 10');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave();

        }
    };

  

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('Test Name')}</label>
                <input
                    type="text"
                    placeholder={t('Enter test name')}
                    value={test.testName}
                    onChange={(e) => onChange({ ...test, testName: e.target.value })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('Start Date')}</label>
                <input
                    type="datetime-local"
                    value={setFormatDateYYYYMMDD(test.startDate)}
                    onChange={(e) => onChange({ ...test, startDate: new Date(e.target.value).getTime() })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('End Date')}</label>
                <input
                    type="datetime-local"
                  value={setFormatDateYYYYMMDD(test.endDate)}
                    onChange={(e) => onChange({ ...test, endDate: new Date(e.target.value).getTime() })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('Duration (minutes)')}</label>
                <input
                    type="number"
                    placeholder={t('Enter duration')}
                    value={test.testingTime}
                    onChange={(e) => onChange({ ...test, testingTime: e.target.value })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('Target Score')}</label>
                <input
                    type="number"
                    placeholder={t('Enter target score')}
                    value={test.targetScore}
                    onChange={(e) => onChange({ ...test, targetScore: parseFloat(e.target.value) })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                {errors.targetScore && <p className="text-red-500 text-sm">{errors.targetScore}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">{t('Description')}</label>
                <textarea
                    placeholder={t('Enter description')}
                    value={test.description}
                    onChange={(e) => onChange({ ...test, description: e.target.value })}
                    className="border p-2 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
            </div>

            <button
                onClick={openAddQuestionModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600 transition duration-200 mr-2 "
            >
                {t('Add question')}
            </button>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                {t('Save')}
            </button>
        </div>
    );
}


function RandomQuestionForm({ onSave, subjectId }) {
    const { t } = useTranslation();
    const [listQuestionGroup, setListQuestionGroup] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState(new Set());
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortType, setSortType] = useState('asc');
    const [search, setSearch] = useState('');

    const handleSelectChange = (groupId) => {
        setSelectedGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(groupId)) {
                newSet.delete(groupId);
            } else {
                newSet.add(groupId);
            }
            return newSet;
        });
    };

    const handleQuantityChange = (groupId, value) => {
        setSelectedQuestions((prev) => {
            const updatedQuestions = prev.filter((q) => q.questionGroupId !== groupId);
            if (value > 0) {
                updatedQuestions.push({ questionGroupId: groupId, numberOfQuestion: parseInt(value, 10) });
            }
            return updatedQuestions;
        });
    };

    const fetchQuestionGroups = () => {
        getAllActivateQuestionGroupService(subjectId, page, sortType, sortBy, 10, search)
            .then((res) => {
                setListQuestionGroup(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch(() => {
                toast.error(t('Get question group failed!'), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    useEffect(() => {
        fetchQuestionGroups();
    }, [page, sortBy, sortType, search]);

    return (
        <div>
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('Search Question Groups')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {listQuestionGroup.map((group) => (
                <div key={group.id} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={selectedGroups.has(group.id)}
                        onChange={() => handleSelectChange(group.id)}
                        className="mr-2"
                    />
                    <span className="mr-4">{`Group ID: ${group.id} - ${group.name}`}</span>
                    <input
                        type="number"
                        placeholder={t('Number of Questions')}
                        value={
                            selectedQuestions.find((q) => q.questionGroupId === group.id)?.numberOfQuestion || ''
                        }
                        onChange={(e) => handleQuantityChange(group.id, e.target.value)}
                        disabled={!selectedGroups.has(group.id)}
                        className="border p-2 rounded w-full"
                    />
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
                >
                    {t('Previous')}
                </button>
                <span>{t('Page')} {page + 1} {t('of')} {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
                >
                    {t('Next')}
                </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center mt-4">
                <label className="mr-2">{t('Sort By')}:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded mr-2"
                >
                    <option value="id">{t('ID')}</option>
                    <option value="name">{t('Name')}</option>
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="asc">{t('Ascending')}</option>
                    <option value="desc">{t('Descending')}</option>
                </select>
            </div>

            <button
                onClick={() => onSave(selectedQuestions)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                {t('Save Selected Questions')}
            </button>
        </div>
    );
}


function ManualQuestionForm({ onSave, subjectId }) {
    const { t } = useTranslation();
    const [listAllQuestion, setListAllQuestion] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortType, setSortType] = useState('asc');
    const [search, setSearch] = useState('');

    const handleSelectChange = (questionId) => {
        setSelectedQuestions((prevSelected) => {
            if (prevSelected.includes(questionId)) {
                return prevSelected.filter((id) => id !== questionId);
            } else {
                return [...prevSelected, questionId];
            }
        });
    };

    const fetchQuestions = () => {
        getAllActiveQuestionByIdClassroomService(subjectId, page, sortType, sortBy, 10, search)
            .then((res) => {
                setListAllQuestion(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((error) => {
                toast.error(t('Get question failed!'), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    useEffect(() => {
        fetchQuestions();
    }, [page, sortBy, sortType, search]);

    return (
        <div>
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('Search Questions')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* List of Questions with Checkbox */}
            {listAllQuestion.map((question) => (
                <div key={question.id} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => handleSelectChange(question.id)}
                        className="mr-2"
                    />
                    <span className="mr-4">{`Question ID: ${question.id} - ${question.content}`}</span>
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
                >
                    {t('Previous')}
                </button>
                <span>{t('Page')} {page + 1} {t('of')} {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
                >
                    {t('Next')}
                </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center mt-4">
                <label className="mr-2">{t('Sort By')}:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded mr-2"
                >
                    <option value="id">{t('ID')}</option>
                    <option value="content">{t('Content')}</option>
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="asc">{t('Ascending')}</option>
                    <option value="desc">{t('Descending')}</option>
                </select>
            </div>

            <button
                onClick={() => onSave(selectedQuestions)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                {t('Save Selected Questions')}
            </button>
        </div>
    );
}


