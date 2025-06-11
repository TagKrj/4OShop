import NotificationViewModel from '../../viewmodels/notificationViewModel.js';

class NotificationView {
    constructor() {
        this.notificationViewModel = new NotificationViewModel();
    }

    async render() {
        const token = localStorage.getItem('authToken');
        const notifications = await this.notificationViewModel.fetchNotifications(token);

        const html = notifications.map(notification => {
            return `
                 <div class="item" data-id="${notification.id}">
                        <h3>${notification.title}</h3>
                        <p>${notification.message}</p>
                    </div>
            `;
        }).join('');

        document.querySelector('.notification').innerHTML = html;
        this.setupItemEvents();
    }

    setupItemEvents() {
        const bellIcon = document.querySelector('.bi-bell-fill');
        bellIcon.addEventListener('click', () => {
            const notification = document.querySelector('.notification');
            if (notification.style.opacity === '1') {
                notification.style.opacity = '0';
                notification.style.pointerEvents = 'none';
            } else {
                notification.style.opacity = '1';
                notification.style.pointerEvents = 'all';
            }
        });
    }
}

const view = new NotificationView();
view.render();
export default NotificationView;