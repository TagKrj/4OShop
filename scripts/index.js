//Chuyển trang cart
const cart = document.querySelector("#nav-part2 h4:nth-child(3)");
cart.addEventListener("click", () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = "cart.html";
    }
    else {
        alert("Vui lòng đăng nhập");
        window.location.href = "account.html";
    }

});

//Chuyển trang wishlist
const wishlist = document.querySelector("#nav-part2 h4:nth-child(2)");
wishlist.addEventListener("click", () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = "wishlist.html";
    }
    else {
        alert("Vui lòng đăng nhập");
        window.location.href = "account.html";
    }
})

//Chuyển trang search
const search = document.querySelector("#nav-part2 h4:nth-child(4)");
search.addEventListener("click", () => {
    window.location.href = "search.html";
});


//Chữ ở page1
gsap.from(".page1 h1,.page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
})

//Chữ ở page1 di chuyển khi scroll
// var tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".page1 h1",
//         scroller: ".main",
//         // markers:true,
//         start: "top 27%",
//         end: "bottom top 10%",
//         scrub: 3
//     }
// })
// tl.to(".page1 h1", {
//     x: -1000,
// }, "anim")
// tl.to(".page1 h2", {
//     x: 1000
// }, "anim")
// tl.to(".page1 video", {
//     width: "90%"
// }, "anim")

//anim page2
var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page2 h1",
        scroller: ".main",
        // markers:true,
        start: "top bottom",
        end: "bottom top 20%",
        scrub: 3
    }
})
tl4.to(".main", {
    backgroundColor: "#fff",
})

tl4.to(".page2 h1", {
    x: 1300,
}, "anim")

tl4.to(".page2-right", {
    opacity: 1,
    y: -50,
}, "anim+=0.2")

// Đổi nền thành màu đen
var tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 50%",
        end: "top 0%",
        scrub: 3
    }
});

// tl5.to(".main", {
//     backgroundColor: "#000",
// });

// anim page4
var tl6 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 50%",
        end: "top 0%",
        scrub: 3
    }
});

tl6.to(".page4 h2", {
    x: 500,
    opacity: 1,
}, "anim")

tl6.to(".page4 #category-list", {
    opacity: 1,
}, "anim2=anim+1")

tl6.to(".page4 button", {
    width: "30vw",
}, "anim2+=0.2")

//page 4
const returnMoreCategoryButton = document.getElementById("shopNow");
returnMoreCategoryButton.addEventListener("click", function () {
    window.location.href = "category.html";
})


