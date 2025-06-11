import CheckOrderViewModel from '../../viewmodels/checkOrderViewModel.js';
import RattingViewModel from '../../viewmodels/rattingViewmodel.js';

class CheckOrderView {
    constructor() {
        this.checkOrderViewModel = new CheckOrderViewModel();
        this.reviewViewModel = new RattingViewModel();
        this.currentStatus = 'Pending'; // Trạng thái mặc định
    }

    async render(status) {
        try {
            const token = localStorage.getItem('authToken');
            await this.checkOrderViewModel.fetchCheckOrder(token, status);

            // Lọc ra các đơn hàng không có sản phẩm
            const filteredOrders = this.checkOrderViewModel.orderModel.filter(order => order.order_products.length > 0);

            const ordersHtml = filteredOrders.map(order => {
                // Tạo danh sách sản phẩm trong đơn hàng
                const productsHtml = order.order_products.map(product => `
                     <div class="item" data-id="${product.product_id}">
                        <div class="boxImg">
                            <img src="${product.imageUrl}" alt="">
                        </div>
                        <div class="info">
                            <h3>${product.title}</h3>
                            <h3>Size: ${product.size} | Màu sắc: ${product.color}</h3>
                            <h3>x${product.quantity}</h3>
                        </div>
                        <div class="price">
                            <h3>${product.price}</h3>
                            <button class="rate" data-id="${product.product_id}">Đánh giá</button>
                        </div>
                    </div>
                 `).join('');

                // Tạo khối thông tin đơn hàng
                return `
                    <div class="boxItem" data-order-id="${order.id}">
                        <i class="bi bi-question-circle"></i>
                        <div class="time">
                            <h4>Thông tin bảo mật</h4>
                        </div>
                        <div class="line">
                            ${productsHtml}
                        </div>
                        <div class="allInfo">
                            <h3>Thành tiền: <span>${order.total.toFixed(2)}</span></h3>
                        </div>
                    </div>
                `;
            }).join('');

            document.querySelector('.content').innerHTML = ordersHtml;


            // Thêm sự kiện click cho các nút đánh giá
            document.querySelectorAll('.rate').forEach(button => {
                button.addEventListener('click', (event) => this.showRatting(event));
            });
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình render:", error);
        }
    }

    initMenuEvents() {
        const menuItems = document.querySelectorAll('.menu h1');

        // Gắn sự kiện click cho các menu
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Xóa border-bottom của tất cả các menu
                menuItems.forEach(menu => menu.style.borderBottom = 'none');

                // Đặt border-bottom cho menu được chọn
                item.style.borderBottom = '2px solid pink';

                // Cập nhật trạng thái hiện tại và render lại
                this.currentStatus = item.id;
                this.render(this.currentStatus);
            });
        });
    }

    // Hiển thị phần tử ratting
    showRatting(event) {
        const rattingElement = document.querySelector('.ratting');
        rattingElement.style.opacity = '1';
        rattingElement.style.pointerEvents = 'all';

        // Lưu trữ productId và orderId để sử dụng khi gửi đánh giá
        this.currentProductId = event.target.getAttribute('data-id');
        this.currentOrderId = event.target.getAttribute('data-order-id');

        // Thêm sự kiện click cho nút đóng
        const closeButton = document.querySelector('.bi-x-circle-fill');
        closeButton.addEventListener('click', () => {
            rattingElement.style.opacity = '0';
            rattingElement.style.pointerEvents = 'none';
        });

        // Thêm sự kiện click cho nút gửi đánh giá
        const submitButton = document.querySelector('.ratting .btn button');
        submitButton.addEventListener('click', (event) => this.rateProduct(event));
    }

    //đánh giá sản phẩm
    async rateProduct(event) {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const reviewText = document.querySelector('.ratting .textarea textarea').value;
        const rating = parseFloat(document.querySelector('.ratting .star-widget input:checked').value).toFixed(1);
        console.log(reviewText);
        console.log(rating);
        console.log(this.currentProductId);
        console.log(this.currentOrderId);
        const reviewData = {
            review: reviewText,
            rating: parseFloat(rating),
            product: parseInt(this.currentProductId),
            order: parseInt(this.currentOrderId)
        };

        await this.reviewViewModel.fetchRatting(token, reviewData);

        alert('Đánh giá thành công!');
        // Ẩn phần tử ratting sau khi gửi đánh giá
        const rattingElement = document.querySelector('.ratting');
        rattingElement.style.opacity = '0';
        rattingElement.style.pointerEvents = 'none';
        // window.location.reload();
    }
}

// Khởi tạo view
const view = new CheckOrderView();
view.render('Pending'); // Trạng thái mặc định khi load trang
view.initMenuEvents();

export default CheckOrderView;
