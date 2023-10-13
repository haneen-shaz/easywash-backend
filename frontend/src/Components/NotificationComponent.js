import React, { useState, useEffect, useRef } from 'react';
import Websocket from 'react-websocket';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const websocketRef = useRef(null);

    const handleData = (data) => {
        const notification = JSON.parse(data);
        setNotifications([...notifications, notification]);

        // Log received data
        console.log('Received data:', notification);
    };

    useEffect(() => {
        // Log WebSocket connection status
        console.log('WebSocket connection status:', websocketRef.current.readyState);
    }, [notifications]); // Add 'notifications' as a dependency to re-run the effect when it changes

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.map((notification, index) => (
                <div key={index}>{notification.message}</div>
            ))}
            <Websocket
                url="ws://localhost:8000/ws/notifications/"
                onMessage={handleData}
                ref={(webSocket) => {
                    websocketRef.current = webSocket;
                }}
            />
        </div>
    );
};

export default NotificationComponent;
