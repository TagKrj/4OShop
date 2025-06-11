// viewmodel.js
import Category from '../models/categoryModel.js';

class CategoryViewModel {
    constructor() {
        this.category = [];
    }

    async fetchCategories() {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/products/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            this.category = data.map(category => new Category(
                category.id,
                category.title,
                category.imageUrl
            ));
        } catch (error) {
            console.error(error);
        }
    }
}

export default CategoryViewModel;