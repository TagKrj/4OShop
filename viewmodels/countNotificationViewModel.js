class CountNotificationViewModel {
    async fetchNotificationCount(token) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/notifications/count/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && typeof data.unread_count === 'number') {
                return data.unread_count;
            } else {
                console.warn('Dữ liệu trả về không chứa unread_count:', data);
                return 0;
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
            return 0;
        }
    }

    // Phương thức cập nhật số lượng thông báo vào UI
    async updateNotificationCountUI() {
        const token = localStorage.getItem('authToken');

        if (!token) {
            const countElement = document.querySelector('#notification');

            if (countElement) {
                countElement.textContent = 0;
            }
            console.warn('Token không tồn tại, không thể lấy dữ liệu thông báo.');
            return;
        }

        try {
            const notiCount = await this.fetchNotificationCount(token); // Lấy giá trị `unread_count` từ API
            const countElement = document.querySelector('#notification'); // Lấy phần tử HTML có id="notification"

            if (countElement) {
                countElement.textContent = notiCount; // Hiển thị giá trị `unread_count` vào phần tử
            } else {
                console.warn('Không tìm thấy phần tử #notification để cập nhật.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng thông báo:', error);
        }
    }
}

// Đảm bảo rằng DOM đã được tải xong trước khi gọi hàm
document.addEventListener('DOMContentLoaded', () => {
    const countNotiViewModel = new CountNotificationViewModel();
    countNotiViewModel.updateNotificationCountUI();
});

export default CountNotificationViewModel;