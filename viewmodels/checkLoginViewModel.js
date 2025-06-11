class CheckLoginViewModel {
    constructor() {
    }

    async checkLoginFetch(token) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/auth/users/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Đăng nhập thất bại: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Lỗi khi kiểm tra:', error);
            throw error;
        }
    }
}

export default CheckLoginViewModel;
