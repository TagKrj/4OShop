import ProductModel from '../models/productModel.js'; // Sửa tên import cho đúng

class CartModel {
    constructor(id, product, quantity, size, color) {
        this.id = id;
        this.product = new ProductModel(
            product.id,
            product.title,
            product.price,
            product.description,
            product.is_featured,
            product.clothesType,
            product.ratings,
            product.colors,
            product.sizes,
            product.imageUrls,
            product.created_at,
            product.category,
            product.brand
        );
        this.quantity = quantity;
        this.size = size;
        this.color = color;
    }
}

export default CartModel;