import SearchViewModel from "../../viewmodels/searchViewModel.js";
import AddDeleteWishlistViewModel from '../../viewmodels/addDeleteWishlistViewModel.js';
import WishlistViewModel from '../../viewmodels/wishlistViewModel.js';

class SearchViews {
    constructor() {
        this.searchViewModel = new SearchViewModel();
        this.inputSearch = document.querySelector('.inputSearch input');
        this.container = document.querySelector('.boxItem');
        this.addDeleteWishlistViewModel = new AddDeleteWishlistViewModel();
        this.wishlistViewModel = new WishlistViewModel();
    }

    // Hiển thị sản phẩm tương tự
    async render() {
        try {
            const token = localStorage.getItem('authToken');
            await this.wishlistViewModel.fetchWishlist(token);
            const text = this.inputSearch.value.trim();
            if (!text) {
                this.container.innerHTML = `<p style="text-align:center;">Vui lòng nhập từ khóa để tìm kiếm!</p>`;
                return;
            }

            await this.searchViewModel.fetchSearch(text);
            const productHtml = this.searchViewModel.product.map(product => {
                // Kiểm tra nếu sản phẩm có trong wishlist
                const isInWishlist = this.wishlistViewModel.product.some(productWishlist => productWishlist.id === product.id);
                console.log('isInWishlist:', isInWishlist);
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
                            <h3>${product.price} VND</h3>
                        </div>
                        <h4>${product.ratings} <i class="bi bi-star-fill"></i></h4>
                    </div>
                </div>
            `;
            }).join('');

            this.container.innerHTML = productHtml;
            this.setupItemEvents();
        } catch (error) {
            console.error("Lỗi khi render danh sách sản phẩm:", error);
            this.container.innerHTML = `<p style="text-align:center;">Đã xảy ra lỗi khi tải sản phẩm.</p>`;
        }
    }

    // Kích hoạt tìm kiếm
    searchBtn() {
        const searchIcon = document.querySelector('.inputSearch i');
        searchIcon.addEventListener('click', () => {
            this.render();
        });

        // Hỗ trợ nhấn phím Enter để tìm kiếm
        this.inputSearch.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.render();
            }
        });
    }

    setupItemEvents() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                // // Kiểm tra nếu click vào icon trái tim
                // if (event.target.classList.contains('bi-suit-heart')) {
                //     console.log('Icon trái tim được nhấn');
                //     return; // Dừng xử lý nếu click vào trái tim
                // }

                const productId = item.getAttribute('data-id');
                const productData = this.searchViewModel.product.find(product => product.id === parseInt(productId));
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

const view = new SearchViews();
view.searchBtn();
export default SearchViews;