import Product from '../models/productModel.js';

class SexViewModel {
    constructor() {
        this.product = [];
    }

    async fetchSex(sex) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/products/byType/?clothesType=${sex}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            this.product = data.map(product => new Product(
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
            ));
        } catch (error) {
            console.error(error);
        }
    }
}

export default SexViewModel;