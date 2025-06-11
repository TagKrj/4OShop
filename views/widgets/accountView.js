import LoginViewModel from '../../viewmodels/loginViewModel.js';
import RegisterViewModel from '../../viewmodels/registerViewModel.js';

class AccountView {
    constructor() {
        this.loginViewModel = new LoginViewModel();
        this.registerViewModel = new RegisterViewModel();
        this.initEvents();
    }
    initEvents() {
        this.setupEventLogin();
        this.setupEventRegister();
    }


    // Thiết lập sự kiện cho nút Đăng nhập
    setupEventLogin() {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', async () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Vui lòng điền đủ thông tin đăng nhập.');
                return;
            }
            try {
                const accountModel = { username, password };
                await this.loginViewModel.loginFetch(accountModel);

                // console.log('Đăng nhập thành công:', result);
                window.location.replace('/views/pages/index.html');
            } catch (error) {
                console.error('Đăng nhập thất bại:', error);
                alert('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
            }
        });

    }


    // Thiết lập sự kiện cho nút Đăng ký
    setupEventRegister() {
        const registerBtn = document.getElementById('registerBtn');
        registerBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const username = document.getElementById('usernameRegister').value;
            const password = document.getElementById('passwordRegister').value;

            if (!email || !username || !password) {
                alert('Vui lòng điền đủ thông tin đăng ký.');
                return;
            }
            try {
                const accountModel = { email, username, password };
                await this.registerViewModel.registerFetch(accountModel);
                window.location.href = '/views/pages/account.html';
            } catch (error) {
                console.error('Đăng ký thất bại:', error);
                alert('Đăng ký thất bại. Vui Lyme kiểm tra thông tin và thử lại.');
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new AccountView();
});

export default AccountView;
