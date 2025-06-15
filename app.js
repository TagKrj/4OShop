function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

    //Xử lý cuộn đến phần tử có id
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                locoScroll.scrollTo(targetElement);
            }
        });
    });

}

init()

// var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")

//cursor
// document.addEventListener("mousemove", function (dets) {
//     crsr.style.left = dets.x + "px"
//     crsr.style.top = dets.y + "px"
// })

// logo
var logo = document.querySelector("#nav h1");
logo.addEventListener("click", function () {
    console.log("click");
    window.location.href = "index.html";
})


// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
        console.log('Người dùng đã đăng nhập.');
    } else {
        console.log('Người dùng chưa đăng nhập.');
    }
}

// Cập nhật biểu tượng dựa trên trạng thái đăng nhập
// function updateAuthIcon() {
//     const authIcon = document.getElementById('authIcon');
//     const token = localStorage.getItem('authToken');

//     if (authIcon) {
//         if (token) {
//             // Người dùng đã đăng nhập
//             authIcon.className = 'bi bi-box-arrow-right';
//             authIcon.title = 'Đăng xuất';

//             authIcon.onclick = () => {
//                 const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất không?');
//                 if (confirmLogout) {
//                     localStorage.removeItem('authToken');
//                     updateAuthIcon(); // Cập nhật lại icon
//                     window.location.href = '../pages/account.html';
//                 }
//             };
//         } else {
//             // Người dùng chưa đăng nhập
//             authIcon.className = 'bi bi-person';
//             authIcon.title = 'Tài khoản';

//             authIcon.onclick = () => {
//                 window.location.href = '../pages/account.html';
//             };
//         }
//     }
// }

//Cập nhật tài khoản
function checkAccount() {
    const token = localStorage.getItem('authToken');
    const authIcon = document.getElementById('authIcon');
    authIcon.addEventListener('click', () => {
        if (token) {
            window.location.href = '../pages/userInfor.html';
        } else {
            alert("Vui lòng đăng nhập!");
            window.location.href = '../pages/account.html';
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    checkAccount();
});