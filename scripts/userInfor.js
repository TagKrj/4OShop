// Hiển thị địa chỉ
function showAddress() {
    const order = document.getElementById('userAddress');
    order.addEventListener('click', () => {
        window.location.replace('../pages/userInfor.html');
    });
}
showAddress();


// Hiển thị đơn hàng
function showOrder() {
    const order = document.getElementById('userOrder');
    order.addEventListener('click', () => {
        window.location.replace('../pages/checkOrder.html');
    });
}
showOrder();


// Đăng xuat
function logout() {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', () => {
        alert('Bạn có chắc chắn muốn đăng xuất không?');
        localStorage.removeItem('authToken');
        window.location.replace('../pages/account.html');
    });
}

logout();
