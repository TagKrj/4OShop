import ProductViewModel from '../../viewmodels/productViewModel.js';
import AddDeleteWishlistViewModel from '../../viewmodels/addDeleteWishlistViewModel.js';
import WishlistViewModel from '../../viewmodels/wishlistViewModel.js';

class CategoryProductWidget {
    constructor() {
        this.productViewModel = new ProductViewModel();
        this.currentCategoryId = 1;
        this.categories = [
            { title: "Quần", id: 1 },
            { title: "Áo phông", id: 2 },
            { title: "Giày thể thao", id: 3 },
            { title: "Váy", id: 4 },
            { title: "Áo khoác", id: 5 },
            { title: "Mũ", id: 6 }
        ];
        this.setupNavEvents();
        this.addDeleteWishlistViewModel = new AddDeleteWishlistViewModel();
        this.wishlistViewModel = new WishlistViewModel();
    }

    setupNavEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            const navItems = document.querySelectorAll('#nav-part2 h4');
            navItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // Xóa border-bottom của tất cả items
                    navItems.forEach(nav => {
                        nav.style.borderBottom = 'none';
                    });
                    // Thêm border-bottom cho item được chọn
                    item.style.borderBottom = '1.5px solid #fff';

                    // Lấy category ID từ index của nav
                    this.currentCategoryId = this.categories[index].id;
                    this.render();
                });
            });
        });
    }

    async render() {
        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token);

        await this.productViewModel.fetchProducts();
        let filteredProducts = this.productViewModel.product;
        // Lọc sản phẩm theo category ID nếu có
        if (this.currentCategoryId) {
            filteredProducts = this.productViewModel.product.filter(product =>
                product.category === this.currentCategoryId
            );
        }
        const productHtml = filteredProducts.map((product) => {
            // Kiểm tra nếu sản phẩm có trong wishlist
            const isInWishlist = this.wishlistViewModel.product.some(productWishlist => productWishlist.id === product.id);
            return `
   <div class="item" data-id="${product.id}">
    <div class="itemImg">
        <img class="itemImg1" src="${product.imageUrls[0]}" alt="">
        <img class="itemImg2" src="${product.imageUrls[1]}" alt="">
    </div>

    <div class="itemInfo">
         <i class="bi bi-suit-heart-fill" style="color: ${isInWishlist ? '#E64545FF' : '#000'};"></i>
        <div class="text">
            <h3>${product.title}</h3>
            <h3>${product.price}</h3>
        </div>
        <h4>${product.ratings} <i class="bi bi-star-fill"></i></h4>
    </div>
</div>
      `;
        }).join('');
        const boxItem = document.querySelector('.boxItem');
        if (filteredProducts.length === 0) {
            boxItem.innerHTML = '<h2 style="color: white;">Không có sản phẩm nào trong danh mục này</h2>';
        } else {
            boxItem.innerHTML = productHtml;
        }

        this.setupItemEvents();
    }

    setupItemEvents() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.addEventListener('click', (event) => {

                const productId = item.getAttribute('data-id');
                const productData = this.productViewModel.product.find(product => product.id === parseInt(productId));
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


const view = new CategoryProductWidget();
view.render();

export default CategoryProductWidget;