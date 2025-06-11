import PaymentProductModel from '../models/paymentProductModel.js';

class PaymentModel {
    constructor(
        customer_id,
        order_products = [], // Mảng các sản phẩm
        total_quantity,
        subtotal,
        total,
        address,
        delivery_status, // Giá trị mặc định
        payment_status, // Giá trị mặc định
        rated // Giá trị mặc định
    ) {
        this.customer_id = customer_id;
        this.order_products = order_products.map(
            (item) =>
                new PaymentProductModel(
                    item.product,
                    item.quantity,
                    item.size,
                    item.color)
        );
        this.total_quantity = total_quantity;
        this.subtotal = subtotal;
        this.total = total;
        this.address = address;
        this.delivery_status = delivery_status;
        this.payment_status = payment_status;
        this.rated = rated;
    }

    // // Phương thức kiểm tra trạng thái thanh toán
    // isPaid() {
    //     return this.payment_status === "paid";
    // }

    // // Phương thức kiểm tra trạng thái giao hàng
    // isPending() {
    //     return this.delivery_status === "pending";
    // }
}

export default PaymentModel;
