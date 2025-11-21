document.addEventListener('DOMContentLoaded', function() {
    
    // Lấy các phần tử form cho logic BMI
    const form = document.getElementById('consultationForm');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('bmi');
    const calculateBmiBtn = document.getElementById('calculateBmiBtn');
    
    // Lấy tất cả các nút cuộn trên Hero Section (Tabs)
    const scrollButtons = document.querySelectorAll('.tab-btn.scroll-btn');
    
    // Lấy tất cả các khu vực nội dung (mà các nút trỏ tới)
    const sections = document.querySelectorAll('.fac-section-content, #form-dang-ky');
    
    // --- Biến cờ (Flag) để ngăn chặn Intersection Observer can thiệp khi đang cuộn mượt ---
    let isScrolling = false;

    // ------------------------------------------------
    // Logic tính BMI (Giữ nguyên)
    // ------------------------------------------------
    function calculateAndFillBMI() {
        const heightCm = parseFloat(heightInput.value);
        const weightKg = parseFloat(weightInput.value);

        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            alert("Vui lòng nhập Chiều cao (cm) và Cân nặng (Kg) hợp lệ trước!");
            bmiInput.value = '';
            return;
        }

        const heightM = heightCm / 100;
        const bmiValue = weightKg / (heightM * heightM);
        bmiInput.value = bmiValue.toFixed(2);
    }

    // Gắn sự kiện cho nút Tính BMI
    if (calculateBmiBtn) {
        calculateBmiBtn.addEventListener('click', calculateAndFillBMI);
    }
    
    // ------------------------------------------------
    // Logic cho Cuộn trang (Khi người dùng CLICK)
    // ------------------------------------------------

    function scrollToTarget(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Đặt cờ isScrolling = true trước khi cuộn
            isScrolling = true; 
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Trừ 100px để tránh header
                behavior: 'smooth'
            });

            // Cập nhật trạng thái active ngay lập tức khi click
            updateActiveTab(targetId);

            // Đặt timeout để reset cờ isScrolling sau khi cuộn xong (khoảng 800ms)
            setTimeout(() => {
                isScrolling = false;
            }, 800); 
        }
    }

    // Hàm cập nhật trạng thái Active của nút
    function updateActiveTab(targetId) {
        document.querySelectorAll('.tab-btn.scroll-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-target="${targetId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }


    // Gắn sự kiện cho tất cả các nút cuộn
    if (scrollButtons.length > 0) {
        scrollButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                scrollToTarget(targetId);
            });
        });
    }

    // ------------------------------------------------
    // Logic: TỰ ĐỘNG KÍCH HOẠT TAB khi cuộn (Intersection Observer)
    // ------------------------------------------------
    
    // Cấu hình Observer: Theo dõi khi section xuất hiện ở 25% phía trên viewport
    const observerOptions = {
        root: null, // Dùng viewport làm root
        rootMargin: '-100px 0px -75% 0px', // Top 100px (cho header) và Bottom 75%
        threshold: 0 // Kích hoạt ngay khi vào vùng rootMargin
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        // Chỉ chạy observer khi người dùng đang cuộn tự nhiên (isScrolling == false)
        if (isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lấy ID của section đang được quan sát
                const currentSectionId = `#${entry.target.id}`; 
                updateActiveTab(currentSectionId);
            }
        });
    }, observerOptions);

    // Bắt đầu quan sát các section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ------------------------------------------------
    // Logic xử lý submission form (Giữ nguyên)
    // ------------------------------------------------
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn.");
            this.reset();
        });
    }
    
    // Thiết lập trạng thái ban đầu: Kích hoạt nút đầu tiên
    const firstScrollButton = document.querySelector('.tab-btn.scroll-btn:not(.register-tab)');
    if (firstScrollButton) {
        firstScrollButton.classList.add('active'); 
    }
});