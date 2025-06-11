var main = document.querySelector(".main")

var tl1 = gsap.timeline({
    scrollTrigger: {
        scroller: ".main",
        // markers:true,
        start: "top -50%",
        end: "top -100%",
        scrub: 3
    }
})
tl1.to(".main", {
    backgroundColor: "#fff",
})

//CHỉnh nút add card 
const circle = document.querySelector('.addCart');
const circleRadius = 100; // Đường kính hình tròn
const attractionRadius = 200; // Khoảng cách tác dụng hiệu ứng "hút"

document.addEventListener('mousemove', (e) => {
    const circleRect = circle.getBoundingClientRect();
    const circleCenterX = circleRect.left + circleRadius / 2;
    const circleCenterY = circleRect.top + circleRadius / 2;

    const distanceX = e.clientX - circleCenterX;
    const distanceY = e.clientY - circleCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Nếu chuột nằm trong bán kính "hút" nhưng ngoài hình tròn
    if (distance < attractionRadius && distance > circleRadius / 2) {
        const angle = Math.atan2(distanceY, distanceX);

        // Dịch chuyển hình tròn theo hướng của chuột
        const translateX = Math.cos(angle) * (attractionRadius - distance);
        const translateY = Math.sin(angle) * (attractionRadius - distance);

        circle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    } else {
        // Reset vị trí hình tròn nếu chuột rời khỏi phạm vi hút
        circle.style.transform = 'translate(0, 0)';
    }
});
