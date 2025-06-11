
var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")

//cursor
document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px"
    crsr.style.top = dets.y + "px"
})
// logo
var logo = document.querySelector(".logo");
logo.addEventListener("click", function () {
    console.log("click");
    window.location.href = "index.html";
})

// đăng ký

document.addEventListener("DOMContentLoaded", function () {
    var register = document.getElementById("register");
    register.addEventListener("click", function () {
        var form1 = document.querySelector(".formContent");
        var img = document.querySelector(".img");
        var form2 = document.querySelector(".container2");

        if (form1 && img) {
            // Di chuyển formContent sang bên trái và ẩn đi
            form1.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            form1.style.transform = "translateX(-100%)"; // Di chuyển sang trái
            form1.style.opacity = "0"; // Ẩn đi

            // Di chuyển img sang bên phải và ẩn đi
            img.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            img.style.transform = "translateX(100%)"; // Di chuyển sang phải
            img.style.opacity = "0"; // Ẩn đi
        } else {
            console.error("Không tìm thấy phần tử .formContent hoặc .img trong DOM.");
        }

        if (form2) {
            // Di chuyển formContent2 sang bên trái và ản đi
            form2.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            form2.style.transform = "translateX(0%)"; // Di chuyển sang trái
            form2.style.opacity = "1";
            form2.style.pointerEvents = "auto";
        } else {
            console.error("Không tìm thấy phần tử .formContent2 trong DOM.");
        }
    });
});


// đăng nhập
document.addEventListener("DOMContentLoaded", function () {
    var login = document.getElementById("login");
    login.addEventListener("click", function () {
        var form1 = document.querySelector(".formContent");
        var img = document.querySelector(".img");
        var form2 = document.querySelector(".container2");

        if (form1 && img) {
            // Di chuyển formContent sang bên trái và ẩn đi
            form1.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            form1.style.transform = "translateX(0%)";
            form1.style.opacity = "1"; // Ẩn đi

            // Di chuyển img sang bên phải và ẩn đi
            img.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            img.style.transform = "translateX(-0%)";
            img.style.opacity = "1"; // Ẩn đi
        } else {
            console.error("Không tìm thấy phần tử .formContent hoặc .img trong DOM.");
        }

        if (form2) {
            // Di chuyển formContent2 sang bên trái và ản đi
            form2.style.transition = "all 1s ease"; // Thêm hiệu ứng chuyển động
            form2.style.transform = "translateX(0%)"; // Di chuyển sang trái
            form2.style.opacity = "0";
            form2.style.pointerEvents = "none";
        } else {
            console.error("Không tìm thấy phần tử .formContent2 trong DOM.");
        }
    });
});