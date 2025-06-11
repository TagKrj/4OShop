import DetailProductViewModel from '../../viewmodels/detailProductViewModel.js';
import AddCartViewModel from '../../viewmodels/addCartViewModel.js';

class DetailProductViews {
    constructor() {
        this.detailProductViewModel = new DetailProductViewModel();
        this.selectedColor = null;  // Lưu màu đã chọn
        this.selectedSize = null;   // Lưu size đã chọn
        this.addCartViewModel = new AddCartViewModel();
    }

    async render() {
        // Lấy ID từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        await this.detailProductViewModel.fetchProductsID(productId);

        const productData = this.detailProductViewModel.product;
        if (productData) {
            const productDetailHtml = `
                <div class="productDetailLeft">
                    <div class="content">
                        <h1>${productData.title}</h1>
                        <h4>${productData.clothesType}</h4>
                        <h2>${productData.price}</h2>
                        <h3>${productData.description}</h3>
                    </div>
                    <div class="select">
                        <div class="size">
                            <h3>Size</h3>
                            <div class="sizeList">
                                ${productData.sizes.map(size => `<h4>${size}</h4>`).join('')}
                            </div>
                        </div>
                        <div class="color">
                            <h3>Màu sắc</h3>
                            <div class="colorList">
                                ${productData.colors.map(color => `<h4>${color}</h4>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="contentImg">
                        ${productData.imageUrls.map((image, index) =>
                `<img src="${image}" data-index="${index}" class="thumbnail">`
            ).join('')}
                    </div>
                </div>
                <div class="productDetailRight">
                    <img src="${productData.imageUrls[0]}" id="mainImage">
                </div>
            `;
            document.querySelector('.productDetail').innerHTML = productDetailHtml;

            this.setColor();
            this.setSize();
            this.setAddToCart(productData.id);
            this.setImageSwitch(productData.imageUrls);
        } else {
            console.error('Lỗi rồi');
            document.querySelector('.productDetail').innerHTML = '<h2>Sản phẩm không tồn tại</h2>';
        }
    }

    // Thêm sự kiện thay đổi ảnh 
    setImageSwitch(imageUrls) {
        const thumbnails = document.querySelectorAll('.contentImg .thumbnail');
        const mainImage = document.querySelector('#mainImage');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.classList.add('image-transition');

                setTimeout(() => {
                    const selectedImageIndex = thumbnail.getAttribute('data-index');
                    mainImage.src = imageUrls[selectedImageIndex];
                    mainImage.classList.remove('image-transition');
                }, 400);
            });
        });
    }

    setColor() {
        const h4s = document.querySelectorAll('.colorList h4');
        h4s.forEach(h4 => {
            h4.addEventListener('click', () => {
                // Nếu đã có màu được chọn, reset lại màu của nó
                if (this.selectedColor) {
                    this.selectedColor.style.color = '#868686';
                }
                // Chọn màu hiện tại và thay đổi màu của nó thành đỏ
                h4.style.color = '#EDBFFF';
                this.selectedColor = h4;
            });
        });
    }

    setSize() {
        const h4s = document.querySelectorAll('.sizeList h4');
        h4s.forEach(h4 => {
            h4.addEventListener('click', () => {
                if (this.selectedSize) {
                    this.selectedSize.style.color = '#868686';
                }
                h4.style.color = '#EDBFFF';
                this.selectedSize = h4;
            });
        });
    }

    setAddToCart(productId) {
        const token = localStorage.getItem('authToken');
        const addCartBtn = document.querySelector('.addCart');
        if (token) {
            addCartBtn.addEventListener('click', async () => {
                if (!this.selectedColor || !this.selectedSize) {
                    alert('Vui lòng chọn kích thước và màu sắc trước khi thêm vào giỏ hàng!');
                    return;
                }

                const quantity = 1;
                const size = this.selectedSize.textContent;
                const color = this.selectedColor.textContent;

                try {
                    await this.addCartViewModel.fetchAddCartProducts(token, productId, quantity, size, color);
                    alert('Sản phẩm đã được thêm vào giỏ hàng!');
                } catch (error) {
                    console.error('Lỗi khi thêm vào giỏ hàng:', error);
                    alert('Có lỗi xảy ra, vui lòng thử lại!');
                }
            });
        } else {
            addCartBtn.addEventListener('click', () => {
                alert('Vui lòng đăng nhập để thêm vào giỏ hàng.');
                window.location.href = '/views/pages/account.html';
            });
        }

    }
}

const view = new DetailProductViews();
view.render();
export default DetailProductViews;
