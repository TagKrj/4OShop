import CartViewModel from '../../viewmodels/cartViewModel.js';
import QuantityCartViewModel from '../../viewmodels/quantityCartViewModel.js';
import DeleteCartViewModel from '../../viewmodels/deleteCartViewModel.js';
import PaymentViewModel from '../../viewmodels/paymentViewModel.js';
import PaymentModel from '../../models/paymentModel.js';
import AddressDefaultViewModel from '../../viewmodels/addressDefaultViewModel.js';

class CartView {
    constructor() {
        this.cartViewModel = new CartViewModel();
        this.selectedItems = new Set(); // Tập hợp để lưu các mục được chọn
        this.quantityCartViewModel = new QuantityCartViewModel();
        this.deleteCartViewModel = new DeleteCartViewModel();
        this.paymentViewModel = new PaymentViewModel();
        this.addressDefaultViewModel = new AddressDefaultViewModel();
    }

    // Hiển thị sản phẩm ra giỏ hàng
    async fetchCartProducts() {
        const token = localStorage.getItem('authToken');
        await this.cartViewModel.fetchCartProducts(token);
        await this.addressDefaultViewModel.fetchAddressDefault(token);

        const cartHtml = this.cartViewModel.products.map((product, index) =>
            `<div class="cartItem" data-index="${index}">
                <div class="cartItemImg">
                    <img src="${product.product.imageUrls[0]}" alt="">
                </div>
                <div class="cartItemInfo">
                    <h2>${product.product.title}</h2>
                    <h3>Size: ${product.size} | Màu sắc: ${product.color}</h3>
                    <h4>${product.product.description}</h4>
                </div>
                <div class="cartItemPrice">
                    <div class="number">
                        <button class="minus" data-index="${index}">-</button>
                        <input type="number" class="numberInput" value="${product.quantity}" min="1" max="100" step="1" data-index="${index}" />
                        <button class="plus" data-index="${index}">+</button>
                    </div>
                    <h3>${product.product.price}</h3>
                </div>
                <div class="cartItemDelete">
                    <i class="bi bi-trash3" data-index="${index}"></i>
                </div>
            </div>`
        ).join('');

        const cartContainer = document.querySelector('.cart');
        if (cartContainer) {
            cartContainer.innerHTML = cartHtml;
        }
        this.payment();
        this.setBorderRight();
        this.attachEventListeners();

    }

    payment() {
        const paymentButton = document.getElementById('paymentButton');
        paymentButton.addEventListener('click', () => {
            const cardHolderInput = document.getElementById('cardHolderInput');
            const cardNumberInput = document.getElementById('cardNumberInput');
            const cardDateInput = document.getElementById('cardDateInput');

            // Kiểm tra tính hợp lệ của các input
            if (!cardHolderInput.value || !cardNumberInput.value || !cardDateInput.value) {
                alert('Vui liệu điền đủ thông tin thanh toán.');
                return;
            }
            if (this.selectedItems.size === 0) {
                alert('Vui lòng chọn sản phẩm.');
                return;
            }
            this.checkout();

        });
    }

    // Hàm sự kiện thêm, giảm số lượng, xóa sản phẩm
    attachEventListeners() {
        const token = localStorage.getItem('authToken');
        // Tăng số lượng
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;
                const input = document.querySelector(`.numberInput[data-index="${index}"]`);
                if (input) {
                    input.stepUp(); // Tăng số lượng
                    const value = parseInt(input.value);
                    this.updateQuantity(token, index, value);
                }
            });
        });

        // Giảm số lượng
        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;  // Lấy index từ data-index của nút
                const input = document.querySelector(`.numberInput[data-index="${index}"]`); // Lấy input dựa trên data-index
                if (input) {
                    input.stepDown(); // Giảm số lượng
                    const value = parseInt(input.value); // Lấy giá trị mới của input
                    this.updateQuantity(token, index, value);
                }
            });
        });

        // Xóa sản phẩm
        document.querySelectorAll('.bi-trash3').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;
                this.deleteProduct(token, index);
            });
        });

        // Thanh toán
        const checkoutButton = document.getElementById('checkoutButton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    // Hàm click với border-right
    setBorderRight() {
        const cartItems = document.querySelectorAll('.cartItem');

        cartItems.forEach((item, index) => {
            if (this.selectedItems.has(index)) {
                item.style.borderRight = '8px solid rgba(237, 191, 255, 0.91)';
            }

            item.addEventListener('click', () => {
                if (!this.selectedItems.has(index)) {
                    item.style.borderRight = '8px solid rgba(237, 191, 255, 0.91)';
                    this.selectedItems.add(index);
                } else {
                    item.style.removeProperty('border-right');
                    this.selectedItems.delete(index);
                }

                this.renderPrice();
            });
        });
    }

    // Hàm cập nhật số lượng
    async updateQuantity(token, index, quantity) {
        const product = this.cartViewModel.products[index];
        if (product) {
            try {
                await this.quantityCartViewModel.fetchQuantityCart(token, product.id, quantity);
                await this.fetchCartProducts();
                this.renderPrice();
            } catch (error) {
                console.error('Lỗi khi cập nhật số lượng:', error);
            }
        }
    }

    // Hàm xóa sản phẩm
    async deleteProduct(token, index) {
        const product = this.cartViewModel.products[index];
        if (product) {
            try {
                await this.deleteCartViewModel.fetchDeleteCart(token, product.id);
                await this.fetchCartProducts();
                this.selectedItems.clear(); // Xóa tất cả các mục đã chọn sau khi giỏ hàng thay đổi
                this.renderPrice();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
            }
        }
    }

    // Hàm thanh toán
    async checkout() {
        const token = localStorage.getItem('authToken');
        const customer_id = 'cus_RJyIHabwXoqZTF';
        const selectedProducts = Array.from(this.selectedItems).map(index => this.cartViewModel.products[index]);

        const order_products = selectedProducts.map(item => ({
            product: item.product ? item.product.id : null,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
        }));

        const total_quantity = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
        const subtotal = this.renderPrice();
        const total = subtotal;
        const address = this.addressDefaultViewModel.addressModel.id;
        const delivery_status = 'Pending';
        const payment_status = 'paid';
        const rated = [0];

        try {
            const result = await this.paymentViewModel.fetchPayment(token, customer_id, order_products, rated, total_quantity, subtotal, total, delivery_status, payment_status, address);
            console.log('Kết quả thanh toán:', result);
            alert('Thanh toán thành công!');
            window.location.href = '/views/pages/checkOrder.html';
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
        }
    }

    // Hàm tính tổng
    renderPrice() {
        const total = this.cartViewModel.calculateTotal(this.selectedItems);
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2);
        }
        return total;
    }
}

const cartView = new CartView();
cartView.fetchCartProducts();

export default CartView;