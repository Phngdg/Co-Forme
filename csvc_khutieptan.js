document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các nút cuộn
    const scrollButtons = document.querySelectorAll('.menu-tabs-nav .scroll-btn');

    scrollButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn hành vi mặc định

            // Lấy id của phần tử mục tiêu từ thuộc tính data-target
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId.substring(1)); // Bỏ dấu #

            if (targetElement) {
                // Xử lý cuộn mượt đến phần tử
                window.scrollTo({
                    top: targetElement.offsetTop - 120, // offsetTop trừ đi chiều cao header và một chút khoảng cách
                    behavior: 'smooth'
                });

                // Xử lý đổi class active cho nút
                scrollButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });

    // Thêm logic để theo dõi cuộn và cập nhật nút active
    const menuSections = document.querySelectorAll('.menu-category-heading');

    function updateActiveTab() {
        let currentActive = '';
        const scrollPosition = window.scrollY + 125; // Cộng thêm offset để xác định đúng phần tử đang ở trên cùng

        menuSections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentActive = section.id;
            }
        });

        scrollButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === `#${currentActive}`) {
                button.classList.add('active');
            }
        });
    }

    // Gắn sự kiện lắng nghe cuộn
    window.addEventListener('scroll', updateActiveTab);
    updateActiveTab(); // Chạy lần đầu để thiết lập trạng thái active ban đầu
});