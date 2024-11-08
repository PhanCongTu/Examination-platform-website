import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllStudentScoreByIDExamService, getScoresService } from '../../../services/ApiService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function ScoreManagementTeacher() {
    const { t } = useTranslation();
    const {idExam} =useParams();
    const [scores, setScores] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortType, setSortType] = useState('asc');
    const [sortBy, setSortBy] = useState('studentName');
    const [searchText, setSearchText] = useState('');

    const sortOptions = [
        { value: 'studentName', label: t('Student Name') },
        { value: 'score', label: t('Score') },
        { value: 'examDate', label: t('Exam Date') },
    ];

    const getAllStudentScoreByIdExam = async (page, sortType, column, size, search) => {
        getAllStudentScoreByIDExamService(idExam, page, sortType, column, size, search).then((res) => {
          console.log(res.data)
          setScores(res.data.content);
          setTotalPages(res.data.totalPages)
        }).catch((error) => {
          console.log(error)
     
          toast.error(t('Get score fail !'), {
            position: toast.POSITION.TOP_RIGHT,
          });

        });
      }

    useEffect(() => {
        getAllStudentScoreByIdExam(page, sortType, sortBy,  searchText);
    }, [page, sortBy, sortType, searchText]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setPage(0);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">{t('Score Management')}</h1>
            <input
                type="text"
                placeholder={t('Search scores')}
                value={searchText}
                onChange={handleSearch}
                className="border p-2 rounded bg-white mb-4"
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded bg-white">
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border p-2 rounded bg-white ml-2">
                <option value="asc">{t('Ascending')}</option>
                <option value="desc">{t('Descending')}</option>
            </select>
            <ul className="space-y-3 mt-4">
                {scores.map(score => (
                    <li key={score.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-lg font-medium text-gray-700">{score.studentName}</p>
                        <p className="text-gray-500">{t('Score')}: {score.score}</p>
                        <p className="text-gray-500">{t('Exam Date')}: {new Date(score.examDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
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
    );
}
