import React, { useEffect, useState } from 'react';

const QuizQuestion = React.memo(({ question, handleChooseAnswer, indexQuestion, showScore }) => {
    const [answer, setAnswer] = useState('');

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };
    useEffect(() => {
        console.log("Question ", question);
    })
    return (
        <div>

            {question.questionType == 'Multiple Choice' && (

                <div>
                    <h3 className="pl-3 mb-4 font-semibold text-black dark:text-white">{indexQuestion + 1}. {question.content}</h3>
                    <ul className="w-[90%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {question.answers.map((choice, index) => (
                            <>
                                {
                                    showScore ? (<>
                                        <li key={answer + index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input
                                                    disabled
                                                    checked={choice.answerContent == question.submittedAnswer}
                                                    id={`list-radio-license-1-${choice.id}`} value="" type="radio" name={`list-radio-${choice.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor={`list-radio-license-1-${choice.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {choice.answerContent}</label>
                                            </div>
                                        </li>
                                    </>) : (
                                        <>
                                            <li key={answer + index} onClick={() => handleChooseAnswer(question.id, choice.answerContent)} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input

                                                        id={`list-radio-license-1-${choice.id}`} value="" type="radio" name={`list-radio-${choice.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor={`list-radio-license-1-${choice.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        {choice.answerContent}</label>
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                            </>


                        ))}
                    </ul>
                </div>
            )}

            {question.questionType === 'Fill in the blank' && (
                <div>
                    <input type="text" value={question.answers[0].answer} onChange={handleAnswerChange} />
                </div>
            )}
        </div>
    );
});

export default QuizQuestion;