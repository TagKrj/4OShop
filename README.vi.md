# Dự Án Thương Mại Điện Tử Thời Trang 4O

[English | Tiếng Việt (Hiện tại)](README.md)


<div align="center">
  <h3>Trang Chủ</h3>
  <img src="https://raw.githubusercontent.com/TagKrj/4OShop/master/home4O.png" alt="4O Trang Chủ" width="80%" />
  
  <h3>Trang Danh Mục</h3>
  <img src="https://raw.githubusercontent.com/TagKrj/4OShop/master/category.png" alt="4O Trang Danh Mục" width="80%" />
  
  <h3>Giỏ Hàng</h3>
  <img src="https://raw.githubusercontent.com/TagKrj/4OShop/master/cart.png" alt="4O Giỏ Hàng" width="80%" />
</div>

## Tổng Quan

4O Fashion là một ứng dụng web thương mại điện tử hiện đại cho các sản phẩm thời trang, cho phép người dùng duyệt, tìm kiếm và mua quần áo và phụ kiện trực tuyến. Nó cung cấp các tính năng như xác thực người dùng, quản lý giỏ hàng, danh sách yêu thích, xử lý đơn hàng và tích hợp thanh toán.

## Cấu Trúc Dự Án

Dự án tuân theo mô hình kiến trúc MVVM (Model-View-ViewModel):

- **models/**: Chứa các mô hình dữ liệu đại diện cho các thực thể miền (sản phẩm, mặt hàng giỏ hàng, đơn hàng, v.v.)
- **views/**: Chứa các thành phần giao diện người dùng và mẫu để hiển thị dữ liệu cho người dùng
- **viewmodels/**: Chứa logic kết nối các mô hình với các khung nhìn
- **services/**: Chứa các dịch vụ tiện ích như dịch vụ API để giao tiếp với backend
- **scripts/**: Chứa các tệp JavaScript cho chức năng cụ thể của trang
- **styles/**: Chứa các stylesheet CSS cho giao diện người dùng
- **assets/**: Chứa hình ảnh và các tài nguyên tĩnh khác

## Tính Năng

### Xác Thực Người Dùng
- Hệ thống đăng ký và đăng nhập người dùng
- Quản lý hồ sơ người dùng
- Xử lý token xác thực để truy cập API an toàn

### Danh Mục Sản Phẩm
- Duyệt sản phẩm theo danh mục và loại
- Các phần quần áo dành riêng cho giới tính
- Chức năng tìm kiếm
- Trang chi tiết sản phẩm với mô tả, giá và đánh giá
- Phần sản phẩm nổi bật

### Giỏ Hàng
- Thêm sản phẩm vào giỏ hàng
- Cập nhật số lượng sản phẩm
- Xóa sản phẩm khỏi giỏ hàng
- Tính tổng giỏ hàng

### Danh Sách Yêu Thích
- Thêm/xóa sản phẩm vào danh sách yêu thích cá nhân
- Chuyển mặt hàng từ danh sách yêu thích sang giỏ hàng

### Quy Trình Thanh Toán
- Quản lý nhiều địa chỉ giao hàng
- Tạo, chỉnh sửa và xóa địa chỉ
- Tóm tắt và xác nhận đơn hàng
- Nhiều phương thức thanh toán

### Quản Lý Đơn Hàng
- Xem lịch sử đơn hàng
- Theo dõi trạng thái đơn hàng
- Chi tiết đơn hàng

### Thông Báo
- Hệ thống thông báo cho người dùng
- Cập nhật trạng thái đơn hàng
- Thông báo khuyến mãi

## Chi Tiết Kỹ Thuật

### Tích Hợp API
Ứng dụng kết nối với backend API RESTful tại `http://20.255.56.110:8000/api/` xử lý:
- Lưu trữ và truy xuất dữ liệu
- Xác thực người dùng
- Xử lý đơn hàng
- Tích hợp thanh toán

### Tổ Chức Mã

#### Models
- **productModel.js**: Đại diện cho một sản phẩm thời trang với các thuộc tính như tiêu đề, giá, mô tả
- **cartModel.js**: Đại diện cho các mặt hàng trong giỏ hàng
- **orderModel.js**: Đại diện cho đơn đặt hàng của khách hàng
- **addressModel.js**: Quản lý địa chỉ giao hàng của người dùng
- **paymentModel.js**: Xử lý phương thức thanh toán và giao dịch
- **notificationModel.js**: Xử lý thông báo cho người dùng

#### ViewModels
- **productViewModel.js**: Quản lý dữ liệu và hoạt động sản phẩm
- **cartViewModel.js**: Xử lý các hoạt động giỏ hàng
- **addCartViewModel.js**: Quản lý việc thêm mặt hàng vào giỏ hàng
- **wishlistViewModel.js**: Xử lý các hoạt động danh sách yêu thích
- **loginViewModel.js**: Quản lý xác thực người dùng
- **registerViewModel.js**: Xử lý đăng ký người dùng
- **searchViewModel.js**: Xử lý các truy vấn tìm kiếm
- **paymentViewModel.js**: Xử lý quá trình thanh toán

### Luồng Dữ Liệu
1. ViewModels lấy dữ liệu từ API
2. Dữ liệu được chuyển đổi thành các phiên bản mô hình
3. Views hiển thị dữ liệu cho tương tác của người dùng
4. Hành động của người dùng kích hoạt các phương thức ViewModel
5. ViewModels cập nhật các mô hình và API khi cần thiết

## Bắt Đầu

### Yêu Cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet

### Chạy Ứng Dụng
1. Sao chép kho lưu trữ
2. Mở tệp HTML chính trong trình duyệt web
3. Hoặc sử dụng máy chủ phát triển cục bộ (như Live Server trong VS Code)

## Hướng Dẫn Phát Triển

### Thêm Tính Năng Mới
1. Tạo hoặc cập nhật (các) mô hình liên quan
2. Triển khai logic ViewModel để xử lý tính năng
3. Tạo hoặc cập nhật khung nhìn tương ứng
4. Kết nối mọi thứ lại với nhau bằng cách sử dụng trình lắng nghe sự kiện và thao tác DOM

### Giao Tiếp API
Ví dụ về việc thực hiện yêu cầu API:

```javascript
// Ví dụ về việc thêm một mặt hàng vào giỏ hàng
import apiService from '../services/apiService.js';

async function addToCart(token, productId, quantity, size, color) {
    try {
        const response = await apiService.post('/cart/add/', { 
            product: productId, 
            quantity, 
            size, 
            color 
        }, token);
        
        return response;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        throw error;
    }
}
```
