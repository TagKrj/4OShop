import WishlistViewModel from '../../viewmodels/wishlistViewModel.js';
import AddDeleteWishlistViewModel from '../../viewmodels/addDeleteWishlistViewModel.js';

class WishlistViews {
    constructor() {
        this.wishlistViewModel = new WishlistViewModel();
        this.addDeleteWishlistViewModel = new AddDeleteWishlistViewModel();
    }

    async render() {
        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token);

        const productWishlistHtml = this.wishlistViewModel.product.map(product => {
            return `
                <div class="item" data-id="${product.id}">
                    <div class="itemImg">
                        <img class="itemImg1" src="${product.imageUrls[0]}" alt="Image 1">
                        <img class="itemImg2" src="${product.imageUrls[1]}" alt="Image 2">
                    </div>
                    <div class="itemInfo">
                        <i class="bi bi-suit-heart-fill" style="color: #E64545FF;"></i>
                        <div class="text">
                            <h3>${product.title}</h3>
                            <h3>${product.price}</h3>
                        </div>
                        <h4>${product.ratings} <i class="bi bi-star-fill"></i></h4>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelector('.boxItem').innerHTML = productWishlistHtml;

        this.setupItemEvents();
    }

    // Cập nhật các sự kiện cho các sản phẩm
    setupItemEvents() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                const productId = item.getAttribute('data-id');
                const productData = this.wishlistViewModel.product.find(product => product.id === parseInt(productId));
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
                    event.stopPropagation();
                    const productId = item.getAttribute('data-id');
                    const token = localStorage.getItem('authToken');

                    try {
                        await this.addDeleteWishlistViewModel.toggleWishlistItem(token, productId);
                        await this.render();
                    } catch (error) {
                        console.error('Lỗi khi cập nhật wishlist:', error);
                    }
                });
            }
        });
    }
}

const view = new WishlistViews();
view.render();

export default WishlistViews;
