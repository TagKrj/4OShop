

//bật tắt địa chỉ
const address = document.querySelector('.address');
const addressButton = document.querySelector('#addressButton');

addressButton.addEventListener('click', () => {
    address.style.display = 'flex';
})

const close = document.querySelector('#close');
close.addEventListener('click', () => {
    address.style.display = 'none';
})

//hiển thị nhập trên card thanh toán
document.addEventListener('DOMContentLoaded', () => {
    const cardHolderInput = document.getElementById('cardHolderInput');
    const cardNumberInput = document.getElementById('cardNumberInput');
    const cardDateInput = document.getElementById('cardDateInput');

    const displayCardHolder = document.getElementById('displayCardHolder');
    const displayCardNumber = document.getElementById('displayCardNumber');
    const displayCardDate = document.getElementById('displayCardDate');

    // Cập nhật tên chủ thẻ
    cardHolderInput.addEventListener('input', () => {
        displayCardHolder.textContent = cardHolderInput.value || 'Nhập tên chủ thẻ';
    });

    // Cập nhật số thẻ
    cardNumberInput.addEventListener('input', () => {
        // Thêm dấu cách giữa các nhóm 4 số
        const formattedNumber = cardNumberInput.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
        displayCardNumber.textContent = formattedNumber || '.... .... .... ....';
    });

    // Cập nhật ngày hết hạn
    cardDateInput.addEventListener('input', () => {
        // Chỉ cho phép nhập định dạng MM/YY
        const formattedDate = cardDateInput.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
        displayCardDate.textContent = formattedDate || 'MM/YY';
    });
});
