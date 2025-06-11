class CoutCartViewModel {
    // Phương thức lấy số lượng giỏ hàng
    async fetchCountCart(token) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/cart/count/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Dữ liệu trả về từ API:', data);

            // Kiểm tra xem `cart_count` có tồn tại không
            if (data && typeof data.cart_count === 'number') {
                return data.cart_count; // Trả về giá trị cart_count
            } else {
                console.warn('Dữ liệu trả về không chứa cart_count:', data);
                return 0; // Trả về giá trị mặc định nếu không có cart_count
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
            return 0; // Trả về giá trị mặc định nếu có lỗi
        }
    }

    // Phương thức cập nhật số lượng giỏ hàng vào UI
    async updateCartCountUI() {
        const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

        if (!token) {
            const countElement = document.querySelector('#count');

            if (countElement) {
                countElement.textContent = 0;
            }
            console.warn('Token không tồn tại, không thể lấy dữ liệu giỏ hàng.');
            return;
        }

        try {
            const cartCount = await this.fetchCountCart(token); // Lấy giá trị `cart_count` từ API
            const countElement = document.querySelector('#count'); // Lấy phần tử HTML có id="count"

            if (countElement) {
                countElement.textContent = cartCount; // Hiển thị giá trị `cart_count` vào phần tử
            } else {
                console.warn('Không tìm thấy phần tử #count để cập nhật.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng giỏ hàng:', error);
        }
    }
}

// Đảm bảo rằng DOM đã được tải xong trước khi gọi hàm
document.addEventListener('DOMContentLoaded', () => {
    const cartViewModel = new CoutCartViewModel();
    cartViewModel.updateCartCountUI();
});

export default CoutCartViewModel;
