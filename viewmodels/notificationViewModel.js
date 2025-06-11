import NotificationModel from '../models/NotificationModel.js';

class NotificationViewModel {
    constructor() {
        this.notificationModel = [];
    }

    async fetchNotifications(token) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/notifications/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }

            const data = await response.json();
            this.notificationModel = data.map(notification => new NotificationModel(
                notification.id,
                notification.title,
                notification.message,
                notification.isRead,
                notification.orderId,
                notification.userId,
            ));
            return this.notificationModel;
        } catch (error) {
            console.error('Error in fetchNotifications:', error);

        }
    }
}

export default NotificationViewModel;