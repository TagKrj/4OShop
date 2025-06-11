import CheckLoginViewModel from '../../viewmodels/checkLoginViewModel.js';

class UserInforViews {
    constructor() {
        this.checkLoginViewModel = new CheckLoginViewModel();
    }
    async renderNameUser() {
        try {
            const token = localStorage.getItem('authToken');
            const userName = document.getElementById('userName');
            if (!token) {
                console.error('Không tìm thấy token.');
            }
            const userData = await this.checkLoginViewModel.checkLoginFetch(token);

            if (userData && userData.username) {
                userName.textContent = userData.username;
            } else {
                console.error('Không tìm thấy thông tin username.');
                userName.textContent = 'Người dùng ẩn danh';
            }
        } catch (error) {
            console.error('Không thể lấy thông tin người dùng:', error);
            this.userNameElement.textContent = 'Lỗi khi tải thông tin!';
        }
    }
}

const view = new UserInforViews();
view.renderNameUser();

export default UserInforViews;
