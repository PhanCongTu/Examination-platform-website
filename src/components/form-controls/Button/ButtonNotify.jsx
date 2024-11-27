import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAllMyNotificationService } from "../../../services/ApiService";
import notifyIcon from "../../../assets/notification_icon_transparent.png";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../../routes/WebSocketProvider";
import Path from "../../../utils/Path";

export default function ButtonNotify() {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false); // Trạng thái WebSocket
    const [showNotifications, setShowNotifications] = useState(false);
    const containerRef = useRef(null);
    const pageSize = 5;
    const navigate = useNavigate();
    const { isConnected, isNewNotification } = useWebSocket();

    const fetchNotifications = useCallback(async (page) => {
        setIsLoading(true);
        try {
            const res = await getAllMyNotificationService(page, undefined, undefined, pageSize);
            setNotifications((prev) => (page === 0 ? res.data.content : [...prev, ...res.data.content]));
            setTotalPages(res.data.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [pageSize]);

  
    useEffect(() => {
        if (isConnected && isNewNotification && !isFetching) {
            setIsFetching(true);
            fetchNotifications(0).finally(() => setIsFetching(false));
        }
    }, [isConnected, isNewNotification, isFetching, fetchNotifications]);


    useEffect(() => {
        if (!isFetching) fetchNotifications(currentPage);
    }, [currentPage, fetchNotifications, isFetching]);

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLoadMore = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <>
            <button
                className="relative bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-4.77M9 21h6a3 3 0 11-6 0z" />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {notifications.length}
                </span>
            </button>

            {showNotifications && (
                <div ref={containerRef} className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-700">{t("Notification")}</h3>
                        <ul className="mt-2">
                            {notifications.length>0&&notifications.map((notification, index) => {
                                const createdAt = new Date(notification.createdAt);
                                
                                const isValidDate = !isNaN(createdAt.getTime());
                                return (
                                    <li
                                        key={index}
                                        className="p-2 text-sm text-gray-600 border-b last:border-none hover:bg-gray-100 flex flex-row items-center"
                                        onClick={() => navigate(Path.PREPARE_TEST.replace(":testId", notification.message.idOfTypeNotify))}
                                    >
                                        <img
                                            src={notifyIcon}
                                            alt="Notification Icon"
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <div>
                                            {notification.message.title.length > 50
                                                ? `${notification.message.title.substring(0, 50)}...`
                                                : notification.message.title}
                                            <div className="text-xs text-gray-500">
                                                {isValidDate
                                                    ? formatDistanceToNow(createdAt, { addSuffix: true })
                                                    : t("Invalid date")}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                            {
                                notifications.length<=0&&(<>
                                <p className="text-xs">{t('No notifications')}</p>
                                </>)
                            }
                        </ul>

                        {currentPage < totalPages - 1 && !isLoading && (
                            <button
                                className="w-full text-blue-500 text-sm p-2 hover:bg-gray-100"
                                onClick={handleLoadMore}
                            >
                                {t("Load more")}
                            </button>
                        )}

                        {isLoading && <div className="text-center text-sm text-gray-500">{t("Loading...")}</div>}
                    </div>
                </div>
            )}
        </>
    );
}
