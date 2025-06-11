import ProductSimilarViewModel from '../../viewmodels/productSimilarViewModel.js';
import AddDeleteWishlistViewModel from '../../viewmodels/addDeleteWishlistViewModel.js';
import WishlistViewModel from '../../viewmodels/wishlistViewModel.js';

class ProductSimilarViews {
    constructor() {
        this.productSimilarViewModel = new ProductSimilarViewModel();
        this.addDeleteWishlistViewModel = new AddDeleteWishlistViewModel();
        this.wishlistViewModel = new WishlistViewModel();
    }

    // Hiển thị sản phẩm tương tự
    async render() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const category = urlParams.get('category');

        await this.productSimilarViewModel.fetchProductSimilar(category);

        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token); // Lấy danh sách sản phẩm trong wishlist

        const productSimilarHtml = this.productSimilarViewModel.product.filter(productSimilar => productSimilar.id !== parseInt(productId)).map(productSimilar => {
            // Kiểm tra nếu sản phẩm có trong wishlist
            const isInWishlist = this.wishlistViewModel.product.some(productWishlist => productWishlist.id === productSimilar.id);
            console.log('isInWishlist:', isInWishlist);
            return `
                <div class="item" data-id="${productSimilar.id}">
                    <div class="itemImg">
                        <img class="itemImg1" src="${productSimilar.imageUrls[0]}" alt="">
                        <img class="itemImg2" src="${productSimilar.imageUrls[1]}" alt="">
                    </div>
                    <div class="itemInfo">
                        <i class="bi bi-suit-heart-fill" style="color: ${isInWishlist ? '#E64545FF' : '#000'};"></i>
                        <div class="text">
                            <h3>${productSimilar.title}</h3>
                            <h3>${productSimilar.price}</h3>
                        </div>
                        <h4>${productSimilar.ratings} <i class="bi bi-star-fill"></i></h4>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelector('.productSimilarList').innerHTML = productSimilarHtml;
        this.setupItemEvents();
    }

    // Cập nhật các sự kiện cho các sản phẩm
    setupItemEvents() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                const productId = item.getAttribute('data-id');
                const productData = this.productSimilarViewModel.product.find(product => product.id === parseInt(productId));
                if (productData) {
                    window.location.href = `/views/pages/detailProduct.html?id=${productId}&category=${productData.category}`;
                } else {
                    console.error('Không tìm thấy sản phẩm có id:', productId);
                }
            });

            // Sự kiện riêng cho icon trái tim
            const heartIcon = item.querySelector('.bi-suit-heart-fill');
            if (heartIcon) {
                heartIcon.addEventListener('click', async (event) => {
                    event.stopPropagation(); // Ngừng lan truyền sự kiện
                    const productId = item.getAttribute('data-id');
                    const token = localStorage.getItem('authToken');

                    try {
                        // Gọi phương thức toggleWishlistItem từ viewModel
                        const status = await this.addDeleteWishlistViewModel.toggleWishlistItem(token, productId);

                        // Sau khi thêm hoặc xóa sản phẩm, refetch lại trang
                        await this.render();
                    } catch (error) {
                        console.error('Lỗi khi cập nhật wishlist:', error);
                    }
                });
            }
        });
    }
}

const view = new ProductSimilarViews();
view.render();

export default ProductSimilarViews;