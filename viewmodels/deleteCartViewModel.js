import CartModel from '../models/cartModel.js';

class DeleteCartViewModel {
    constructor() {
        this.products = [];
    }

    async fetchDeleteCart(token, id) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/cart/delete/?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const textResponse = await response.text();
            if (textResponse) {
                const data = JSON.parse(textResponse); // Chuyển đổi thành JSON nếu có nội dung
                console.log('Dữ liệu trả về từ API:', data);
                return data;
            } else {
                console.log('Phản hồi trống từ API');
                return null;
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            throw error;  // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }
}

export default DeleteCartViewModel;


