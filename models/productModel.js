class ProductModel {
    constructor(id, title, price, description, is_featured, clothesType, ratings, colors, sizes, imageUrls, created_at, category, brand) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.is_featured = is_featured;
        this.clothesType = clothesType;
        this.ratings = ratings;
        this.colors = colors;
        this.sizes = sizes;
        this.imageUrls = imageUrls;
        this.created_at = created_at;
        this.category = category;
        this.brand = brand;
    }
}

export default ProductModel;