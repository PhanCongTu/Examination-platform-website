import React, { createContext, useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectWebSocket = (userId) => {
        const client = Stomp.over(() => new SockJS('http://localhost:8081/notify/ws', null, {
            transports: ['xhr-streaming', 'xhr-polling', 'websocket'],
            withCredentials: true,
        }));

        client.connect({}, () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
            client.subscribe(`/topic/notifications/${userId}`, (message) => {
                console.log('Received message:', message);
                // Xử lý thông báo tại đây
                let data;

                // Kiểm tra xem body có phải là Uint8Array không
                if (message.binaryBody) {
                    // Chuyển đổi Uint8Array thành chuỗi
                    const bodyString = new TextDecoder().decode(message.binaryBody);
                    // Phân tích cú pháp JSON
                    data = JSON.parse(bodyString);
                } else {
                    // Nếu là chuỗi JSON, phân tích trực tiếp
                    data = JSON.parse(message.body);
                }

                console.log("Received notification:", data);
            });
        });

        client.onStompError = (error) => {
            console.error('STOMP connection error:', error);
        };

        setStompClient(client);
    };

    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('Disconnected from WebSocket');
                setIsConnected(false);
            });
        }
    };

    return (
        <WebSocketContext.Provider value={{ connectWebSocket, disconnectWebSocket, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
