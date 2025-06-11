class RegisterViewModel {
    constructor() {
        this.baseUrl = 'http://20.255.56.110:8000/auth/users/';
    }

    async registerFetch(accountModel) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountModel), // Truyền thẳng đối tượng { username, password }
            });

            if (!response.ok) {
                throw new Error(`Đăng nhập thất bại: ${response.status}`);
            }

            const data = await response.json();
            return data; // Trả về dữ liệu nhận được từ server
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    }
}

export default RegisterViewModel;
