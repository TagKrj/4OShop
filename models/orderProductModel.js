class OrderProductModel {
    constructor(product_id, imageUrl, title, price, quantity, size, color) {
        this.product_id = product_id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
        this.color = color;
    }
}
export default OrderProductModel;