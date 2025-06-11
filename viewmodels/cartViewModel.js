import CartModel from '../models/cartModel.js';

class CartViewModel {
    constructor() {
        this.products = []; // Lưu danh sách sản phẩm trong giỏ
    }

    async fetchCartProducts(token) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/cart/me/`, {
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
            this.products = data.map(item => {
                if (!item.product) {
                    console.error('Thiếu thông tin sản phẩm:', item);
                    return null;
                }

                return new CartModel(
                    item.id,
                    item.product,
                    item.quantity,
                    item.size,
                    item.color
                );
            }).filter(product => product !== null); // Loại bỏ các giá trị null
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm từ API:', error);
        }
    }

    calculateTotal(selectedItems) {
        return [...selectedItems].reduce((total, index) => {
            const product = this.products[index];
            return (total + product.product.price * product.quantity) + 10.0;
        }, 0);
    }

}

export default CartViewModel;
