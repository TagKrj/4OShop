class NotificationModel {
    constructor(id, title, message, isRead, orderId, userId) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.isRead = isRead;
        this.orderId = orderId;
        this.userId = userId;
    }
}

export default NotificationModel;