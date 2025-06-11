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

    // Thêm hiệu ứng blur khi scroll
    locoScroll.on('scroll', (args) => {
        const header = document.querySelector('.imgHeader img');
        const page1 = document.querySelector('.page1');
        const scrollPosition = args.scroll.y;
        const maxBlur = 30; // Độ mờ tối đa

        // Tính toán độ mờ dựa trên vị trí scroll
        const blur = Math.min(scrollPosition / 500 * maxBlur, maxBlur);

        // Áp dụng filter blur
        header.style.filter = `blur(${blur}px)`;

        // Di chuyển page1 lên trên
        const translateY = Math.max(0, 100 - (scrollPosition / 5)); // Điều chỉnh tốc độ di chuyển
        page1.style.transform = `translateY(${translateY}vh)`;
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

    // Xử lý cuộn đến phần tử có id
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

//xử lí tim yêu thích
// const heartIcons = document.querySelectorAll('.bi-suit-heart');

// heartIcons.forEach(heartIcon => {
//     heartIcon.addEventListener('click', () => {
//         if (heartIcon.classList.contains('bi-suit-heart')) {
//             // Thêm vào danh sách yêu thích
//             heartIcon.classList.remove('bi-suit-heart');
//             heartIcon.classList.add('bi-suit-heart-fill');
//             heartIcon.style.color = 'red';
//             console.log('Thêm vào danh sách yêu thích!');
//         } else {
//             // Bỏ khỏi danh sách yêu thích
//             heartIcon.classList.remove('bi-suit-heart-fill');
//             heartIcon.classList.add('bi-suit-heart');
//             heartIcon.style.color = '#000';
//             console.log('Xóa khỏi danh sách yêu thích!');
//         }
//     });
// });