const boxData = {
    all: "Tất cả",
    popular: "Phổ biến",
    unisex: "Unisex",
    women: "Nữ",
    men: "Nam",
    kids: "Trẻ em"
};

function renderBoxes() {
    const container = document.getElementById('page5');
    if (!container) {
        console.error('Không tìm thấy container với id "page5".');
        return;
    }

    // Duyệt qua object và tạo HTML cho từng box
    Object.entries(boxData).forEach(([id, text]) => {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = id;

        box.innerHTML = `
            <h3>${text}</h3>
            <i class="bi bi-dot"></i>
        `;
        container.appendChild(box);
    });

    setupBoxHoverEvents();
    setupBoxClickEvents();
}

// Hàm thay đổi chấm tròn thành mũi tên khi hover
function setupBoxHoverEvents() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(function (box) {
        box.addEventListener("mouseenter", function () {
            const iconDot = box.querySelector("i.bi-dot");
            if (iconDot) {
                iconDot.classList.remove("bi-dot");
                iconDot.classList.add("bi-arrow-right");
            }
        });

        box.addEventListener("mouseleave", function () {
            const iconArrow = box.querySelector("i.bi-arrow-right");
            if (iconArrow) {
                iconArrow.classList.remove("bi-arrow-right");
                iconArrow.classList.add("bi-dot");
            }
        });
    });
}

// Hàm xử lý sự kiện click để chuyển hướng
function setupBoxClickEvents() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const boxId = box.id; // Lấy ID của box được click
            window.location.href = `/views/pages/clothesType.html?id=${boxId}`;
        });
    });
}


renderBoxes();
