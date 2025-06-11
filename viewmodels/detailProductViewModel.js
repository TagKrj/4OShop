import Product from '../models/productModel.js';

class DetailProductViewModel {
    constructor() {
        this.product = null;
    }

    async fetchProductsID(id) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/products/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            this.product = new Product(
                data.id,
                data.title,
                data.price,
                data.description,
                data.is_featured,
                data.clothesType,
                data.ratings,
                data.colors,
                data.sizes,
                data.imageUrls,
                data.created_at,
                data.category,
                data.brand
            );
        } catch (error) {
            console.error(error);
        }
    }
}

export default DetailProductViewModel;