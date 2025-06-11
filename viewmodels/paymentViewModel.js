import PaymentModel from '../models/paymentModel.js';

class PaymentViewModel {
    constructor() {
        this.PaymentModel = new PaymentModel();
    }

    // Phương thức lấy dữ liệu thanh toán
    async fetchPayment(token, customer_id, order_products, rated, total_quantity, subtotal, total, delivery_status, payment_status, address) {
        try {
            // Gửi yêu cầu POST đến API
            const response = await fetch(`http://20.255.56.110:8000/api/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ customer_id, order_products, rated, total_quantity, subtotal, total, delivery_status, payment_status, address }),
            });

            // Kiểm tra nếu phản hồi không thành công
            if (!response.ok) {
                throw new Error('Failed to submit payment');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error in fetchPayment:', error);
            // Bạn có thể xử lý lỗi ở đây, ví dụ: thông báo cho người dùng
        }
    }
}

export default PaymentViewModel;
