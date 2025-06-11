import ProductViewModel from "../../viewmodels/productViewModel.js";
import PopularViewModel from "../../viewmodels/popularClothesTypeViewModel.js";
import SexViewModel from "../../viewmodels/sexClothesTypeModel.js";
import AddDeleteWishlistViewModel from '../../viewmodels/addDeleteWishlistViewModel.js';
import WishlistViewModel from '../../viewmodels/wishlistViewModel.js';

class ClothesTypeView {
    constructor() {
        this.productViewModel = new ProductViewModel();
        this.popularViewModel = new PopularViewModel();
        this.sexViewModel = new SexViewModel();
        this.addDeleteWishlistViewModel = new AddDeleteWishlistViewModel();
        this.wishlistViewModel = new WishlistViewModel();
    }

    async renderAll() {
        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token);

        await this.productViewModel.fetchProducts();
        const productHtml = this.productViewModel.product.map((product) => {
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
        boxItem.innerHTML = productHtml;

        this.setupItemEvents();
    }

    async renderPopular() {
        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token);
        await this.popularViewModel.fetchPopular();
        const productHtml = this.popularViewModel.product.map((product) => {
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
        boxItem.innerHTML = productHtml;

        this.setupItemEvents();
    }

    async renderSex() {
        const token = localStorage.getItem('authToken');
        await this.wishlistViewModel.fetchWishlist(token);
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        await this.sexViewModel.fetchSex(productId);
        const productHtml = this.sexViewModel.product.map((product) => {
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
        boxItem.innerHTML = productHtml;

        this.setupItemEvents();
    }

    async choice() {
        // Lấy ID từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId === "all") {
            await this.renderAll();
        } else if (productId === "popular") {
            await this.renderPopular();
        }
        else {
            await this.renderSex();
        }
    }

    setupItemEvents() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.addEventListener('click', (event) => {

                const urlParams = new URLSearchParams(window.location.search);
                const urlId = urlParams.get('id');
                const productId = item.getAttribute('data-id');

                let productData;

                if (urlId === "all") {
                    productData = this.productViewModel.product.find(product => product.id === parseInt(productId));
                } else if (urlId === "popular") {
                    productData = this.popularViewModel.product.find(product => product.id === parseInt(productId));
                } else {
                    productData = this.sexViewModel.product.find(product => product.id === parseInt(productId));
                }

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
                        await this.choice();
                    } catch (error) {
                        console.error('Lỗi khi cập nhật wishlist:', error);
                    }
                });
            }
        });
    }



}

const view = new ClothesTypeView();
view.choice();

export { ClothesTypeView };