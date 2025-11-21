document.addEventListener('DOMContentLoaded', () => {
            // Hàm khởi tạo cho mỗi slider bạn muốn có trên trang
            function initComparisonSlider(containerId) {
                const container = document.getElementById(containerId);
                if (!container) return; // Không tìm thấy slider

                const imgBefore = container.querySelector('.img-before');
                const sliderLine = container.querySelector('.slider-line');
                const sliderHandle = container.querySelector('.slider-handle');

                let isDragging = false;

                // Hàm cập nhật vị trí slider
                function updateSliderPosition(x) {
                    // Lấy thông tin vị trí và kích thước của container
                    const rect = container.getBoundingClientRect();
                    
                    // Tính toán vị trí x của chuột/chạm bên trong container
                    let newX = x - rect.left;

                    // Đảm bảo vạch chia luôn nằm trong khung ảnh (từ 0 đến chiều rộng)
                    if (newX < 0) newX = 0;
                    if (newX > rect.width) newX = rect.width;

                    // Tính toán phần trăm
                    const percentage = (newX / rect.width) * 100;

                    // Cập nhật CSS
                    sliderLine.style.left = percentage + '%';
                    sliderHandle.style.left = percentage + '%';
                    // Cập nhật clip-path để cắt ảnh "Before"
                    imgBefore.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                }

                // === Logic Xử lý sự kiện Chuột (Mouse Events) ===

                // Sự kiện khi bắt đầu kéo (chuột)
                container.addEventListener('mousedown', (e) => {
                    e.preventDefault(); 
                    isDragging = true;
                    container.classList.add('is-dragging'); // Optional: Thêm class để đổi style khi kéo
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                    // Cập nhật vị trí ngay khi click để tránh độ trễ
                    updateSliderPosition(e.clientX);
                });

                // Sự kiện khi di chuyển chuột
                function onMouseMove(e) {
                    if (!isDragging) return;
                    updateSliderPosition(e.clientX);
                }

                // Sự kiện khi nhả chuột
                function onMouseUp() {
                    isDragging = false;
                    container.classList.remove('is-dragging');
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                // === Logic Xử lý sự kiện Chạm (Touch Events - cho Mobile) ===

                // Sự kiện khi bắt đầu chạm (mobile)
                container.addEventListener('touchstart', (e) => {
                    // e.preventDefault(); // Có thể gây lỗi cuộn trang, nên cân nhắc
                    isDragging = true;
                    document.addEventListener('touchmove', onTouchMove);
                    document.addEventListener('touchend', onTouchEnd);
                    // Cập nhật vị trí ngay khi chạm
                    updateSliderPosition(e.touches[0].clientX);
                }, { passive: true }); // Dùng passive: true để tối ưu cuộn trang

                // Sự kiện khi di chuyển ngón tay (mobile)
                function onTouchMove(e) {
                    if (!isDragging) return;
                    // Lấy vị trí của điểm chạm đầu tiên
                    updateSliderPosition(e.touches[0].clientX);
                }

                // Sự kiện khi kết thúc chạm (mobile)
                function onTouchEnd() {
                    isDragging = false;
                    document.removeEventListener('touchmove', onTouchMove);
                    document.removeEventListener('touchend', onTouchEnd);
                }
                
                // Cập nhật vị trí ban đầu (50%) khi container thay đổi kích thước
                window.addEventListener('resize', () => {
                    updateSliderPosition(container.getBoundingClientRect().left + container.offsetWidth / 2);
                });

                // Khởi tạo vị trí ban đầu
                updateSliderPosition(container.getBoundingClientRect().left + container.offsetWidth / 2);

            }

            // Kích hoạt slider của chúng ta
            initComparisonSlider('my-slider');
        });