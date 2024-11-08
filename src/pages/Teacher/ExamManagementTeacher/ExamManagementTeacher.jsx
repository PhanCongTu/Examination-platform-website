import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getAllExamManageService } from '../../../services/ApiService';
import ModalCustom from '../../../components/modal/Modal';
import { Datepicker } from 'flowbite-react';

export default function ExamManagementTeacher() {
    const { t } = useTranslation();
    const [exams, setExams] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortType, setSortType] = useState('asc');
    const [sortBy, setSortBy] = useState('testName');
    const [searchText, setSearchText] = useState('');
    const [startOfDate, setStartOfDate] = useState(new Date().getTime());
    const [endOfDate, setEndOfDate] = useState('');
    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const fetchExams = () => {
        getAllExamManageService(page, sortType, sortBy, undefined, searchText, startOfDate, endOfDate).then(res => {
            setExams(res.data.content)
            setTotalPages(res.data.totalPages)
        }).catch(e => {
            console.log(e)
            toast.error(t('Get exam fail !', { position: toast.POSITION.TOP_RIGHT }))
        })
    };

    useEffect(() => {
        fetchExams();
    }, [page, sortType, sortBy, searchText, startOfDate, endOfDate]);

    const handleAddExam = (exam) => {

    };

    const handleEditExam = (exam) => {

    };

    const handleDeleteExam = () => {

    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">{t('Exam Management')}</h1>

            {/* Search and Sort Controls */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder={t('Search exams')}
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value); setPage(0); }}
                    className="border p-2 rounded bg-white mr-4"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded bg-white mr-4"
                >
                    <option value="testName">{t('Exam Name')}</option>
                    <option value="startDate">{t('Start Date')}</option>
                    <option value="duration">{t('Duration')}</option>
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border p-2 rounded bg-white mr-4"
                >
                    <option value="asc">{t('Ascending')}</option>
                    <option value="desc">{t('Descending')}</option>
                </select>
                <Datepicker
                    selected={startOfDate ? new Date(startOfDate) : null}
                    onChange={(date) => setStartOfDate(date ? date.getTime() : '')}
                    dateFormat="yyyy-MM-dd"
                    placeholder={t('Start of date')}
                    className="border rounded bg-white mr-4"
                />

                <Datepicker
                    selected={endOfDate ? new Date(endOfDate) : null}
                    onChange={(date) => setEndOfDate(date ? date.getTime() : '')}
                    dateformat="yyyy-MM-dd"
                    placeholder={t('End of date')}
                    className="border rounded bg-white mr-4"
                />
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                >
                    {t('Add Exam')}
                </button>
            </div>

            {/* Exam List */}
            <ul className="space-y-3">
                {exams.map((exam) => (
                    <li key={exam.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-700">{exam.testName}</p>
                            <p className="text-gray-500">{t('Start Date')}: {new Date(exam.startDate).toLocaleDateString()}</p>
                            <p className="text-gray-500">{t('Duration')}: {exam.duration} {t('minutes')}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => { setSelectedExam(exam); setShowEditModal(true); }}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                            >
                                {t('Edit')}
                            </button>
                            <button
                                onClick={() => { setSelectedExam(exam); setShowDeleteModal(true); }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                {t('Delete')}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                >
                    {t('Previous')}
                </button>
                <span>{t('Page')} {page + 1} {t('of')} {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg"
                >
                    {t('Next')}
                </button>
            </div>

            {/* Add Exam Modal */}
            {showAddModal && (
                <ModalCustom title={t('Add New Exam')} onClose={() => setShowAddModal(false)}>
                    <ExamForm onSave={handleAddExam} />
                </ModalCustom>
            )}

            {/* Edit Exam Modal */}
            {showEditModal && (
                <ModalCustom title={t('Edit Exam')} onClose={() => setShowEditModal(false)}>
                    <ExamForm exam={selectedExam} onSave={handleEditExam} />
                </ModalCustom>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <ModalCustom title={t('Confirm Delete')} onClose={() => setShowDeleteModal(false)}>
                    <p>{t('Are you sure you want to delete this exam?')}</p>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                            {t('Cancel')}
                        </button>
                        <button onClick={handleDeleteExam} className="bg-red-500 text-white px-4 py-2 rounded">
                            {t('Delete')}
                        </button>
                    </div>
                </ModalCustom>
            )}
        </div>
    );
}

function ExamForm({ exam = {}, onSave }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        testName: exam.testName || '',
        startDate: exam.startDate || '',
        duration: exam.duration || 0,
    });

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700">{t('Exam Name')}</label>
                <input
                    type="text"
                    value={formData.testName}
                    onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">{t('Start Date')}</label>
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">{t('Duration (minutes)')}</label>
                <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                {t('Save')}
            </button>
        </div>
    );
}
