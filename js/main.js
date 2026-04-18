document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    
    // xử lý sự kiện để show sub menu
   function handleShowSubMenu() {
    const subMenuContainer = document.querySelector('.js__submenuContainer');
    if (!subMenuContainer) return;

    const body = document.body;

    // 1. Quản lý Đóng/Mở Menu chính
    subMenuContainer.addEventListener('click', (e) => {
        const target = e.target;

        // Mở menu
        if (target.closest('.js__showSubmenu')) {
            subMenuContainer.classList.add('active');
            body.style.overflow = 'hidden';
        }

        // Đóng menu (khi bấm overlay hoặc nút close)
        if (target.closest('.js__overlay') || target.closest('.js__closeSubmenu')) {
            subMenuContainer.classList.remove('active');
            body.style.overflow = 'unset';
            
            // Tùy chọn: Đóng tất cả các menu con khi thoát menu chính
            subMenuContainer.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        }

        // 2. Xử lý Dropdown lồng nhau (Nested Submenu)
        const toggleBtn = target.closest('.js__showDropdownMenu');
        if (toggleBtn) {
            const parentItem = toggleBtn.closest('.js__submenuItem');
            const dropdownMenu = parentItem.querySelector('.js__dropdownMenu');

            if (parentItem && dropdownMenu) {
                // Toggle class cho cả item cha và menu con
                parentItem.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
                
                // Ngăn chặn sự kiện nổi bọt để không ảnh hưởng đến menu cha bên ngoài
                e.stopPropagation();
            }
        }
    });
}

     // xử lý sự kiện tăng giảm số lượng sản phẩm
    function handleIncremental() {
        const incrementals = document.querySelectorAll('.js__incremental')
        if (incrementals.length === 0) return;

        incrementals.forEach((incremental)=>{
            let deincrement = incremental.querySelector(".js__deincrement");
            let increment = incremental.querySelector(".js__increment");
            let number = incremental.querySelector(".js__numberValue");

            
            let step = 1;
            let max = 100;
            let min = 0;
            let valueInput = 0;
            
            function updateValue(newValue) {
                valueInput = newValue;
                console.log("Current value:", valueInput);
            }
            
            number.oninput = function () {
                number.value = number.value > max ? max : number.value < min ? min : number.value;
                updateValue(number.value);
            };
            
            increment.addEventListener("click", () => {
                if (parseInt(number.value) + step >= max) {
                    number.value = max;
                } else {
                    number.value = parseInt(number.value) + step;
                }
                updateValue(number.value);
            });
            
            deincrement.addEventListener("click", () => {
                if (parseInt(number.value) - step <= min) {
                    number.value = min;
                } else {
                    number.value = parseInt(number.value) - step;
                }
                updateValue(number.value);
            });

        })

    }
    // xử lý sự kiện show popup giỏ hàng
function handleShowPopupCart() {
    const popPrimaryContainers = document.querySelectorAll('.js__popCartPrimaryContainer');
    const mainElement = document.querySelector('main');
    const body = document.body;

    // 1. Tìm TẤT CẢ các nút đóng và nút mở trên toàn bộ document
    const allShowBtns = document.querySelectorAll('.js__showPopupCartPrimary');
    const allCloseBtns = document.querySelectorAll('.js__closePopupCartPrimary');

    if (popPrimaryContainers.length === 0) return;

    // Hàm đóng tất cả các popup (dùng chung cho nhanh)
    const closeAllPopups = () => {
        popPrimaryContainers.forEach(container => {
            container.classList.remove('active');
            const overlay = container.querySelector('.js__overlay');
            if (overlay) overlay.classList.remove('active');
        });
        body.style.overflow = '';
        if (mainElement) mainElement.style.zIndex = '';
    };

    // 2. Gán sự kiện cho TẤT CẢ các nút mở
    allShowBtns.forEach((btn) => {
        btn.onclick = function(e) {
            e.preventDefault(); // Chặn default nếu là thẻ <a>
            
            // Nếu bạn có nhiều popup, bạn có thể dùng data-target để chỉ định
            // Còn nếu chỉ có 1 popup chính, ta sẽ mở cái đầu tiên tìm thấy
            const container = popPrimaryContainers[0]; 
            
            if (container) {
                container.classList.add('active');
                const overlay = container.querySelector('.js__overlay');
                if (overlay) overlay.classList.add('active');
                
                body.style.overflow = 'hidden';
                if (mainElement) mainElement.style.zIndex = '100';
            }
        };
    });

    // 3. Gán sự kiện cho TẤT CẢ các nút đóng tìm thấy trong Document
    allCloseBtns.forEach((btn) => {
        btn.onclick = closeAllPopups;
    });

    // 4. Gán sự kiện cho các Overlay (nằm trong container)
    popPrimaryContainers.forEach((container) => {
        const overlay = container.querySelector('.js__overlay');
        if (overlay) {
            overlay.onclick = closeAllPopups;
        }
    });
}

    // xử lý sự kiện show popup
   function handleShowPopup() {
        const popPrimaryContainers = document.querySelectorAll('.js__popPrimaryContainer');
        const mainElement = document.querySelector('main'); // Lấy thẻ main
        const body = document.body;

        if (popPrimaryContainers.length === 0) return;

        popPrimaryContainers.forEach((popPrimaryContainer) => {
            const showPopupPrimary = popPrimaryContainer.querySelector('.js__showPopupPrimary');
            const closePopupPrimary = popPrimaryContainer.querySelector('.js__closePopupPrimary');
            const overlay = popPrimaryContainer.querySelector('.js__overlay');

            // Hàm hỗ trợ đóng popup để tránh lặp lại code
            const closePopup = () => {
                popPrimaryContainer.classList.remove('active');
                body.style.overflow = '';
                if (mainElement) mainElement.style.zIndex = ''; // Reset z-index
            };

            showPopupPrimary.onclick = function() {
                const isActive = popPrimaryContainer.classList.toggle('active');
                overlay.classList.add('active');

                if (isActive) {
                    body.style.overflow = 'hidden';
                    if (mainElement) mainElement.style.zIndex = '100'; // Thêm z-index khi active
                } else {
                    body.style.overflow = '';
                    if (mainElement) mainElement.style.zIndex = ''; // Reset khi bỏ active
                }
            }

            closePopupPrimary.onclick = closePopup;
            overlay.onclick = closePopup;
        });
    }
    // xử lý sự kiện show popup
//    function handleShowPopupSecondary() {
//         const popSecondaryContainers = document.querySelectorAll('.js__popSecondaryContainer');
//         const mainElement = document.querySelector('main'); // Lấy thẻ main
//         const body = document.body;

//         if (popSecondaryContainers.length === 0) return;

//         popSecondaryContainers.forEach((popSecondaryContainer) => {
//             const showPopupSecondary = popSecondaryContainer.querySelector('.js__showPopupSecondary');
//             const closePopupSecondary = popSecondaryContainer.querySelector('.js__closePopupSecondary');
//             const overlay = popSecondaryContainer.querySelector('.js__overlay');

//             // Hàm hỗ trợ đóng popup để tránh lặp lại code
//             const closePopup = () => {
//                 popSecondaryContainer.classList.remove('active');
//                 body.style.overflow = '';
//                 if (mainElement) mainElement.style.zIndex = ''; // Reset z-index
//             };

//             showPopupSecondary.onclick = function() {
//                 const isActive = popSecondaryContainer.classList.toggle('active');
//                 overlay.classList.add('active');

//                 if (isActive) {
//                     body.style.overflow = 'hidden';
//                     if (mainElement) mainElement.style.zIndex = '102'; // Thêm z-index khi active
//                 } else {
//                     body.style.overflow = '';
//                     if (mainElement) mainElement.style.zIndex = ''; // Reset khi bỏ active
//                 }
//             }

//             closePopupSecondary.onclick = closePopup;
//             overlay.onclick = closePopup;
//         });
//     }

function handleShowPopupSecondary() {
    const popSecondaryContainers = document.querySelectorAll('.js__popSecondaryContainer');
    const mainElement = document.querySelector('main');
    const body = document.body;

    if (popSecondaryContainers.length === 0) return;

    popSecondaryContainers.forEach((popSecondaryContainer) => {
        const showPopupSecondary = popSecondaryContainer.querySelector('.js__showPopupSecondary');
        const closePopupSecondary = popSecondaryContainer.querySelector('.js__closePopupSecondary');
        const overlay = popSecondaryContainer.querySelector('.js__overlay');

        const closePopup = () => {
            // 1. Tắt active của chính popup secondary
            popSecondaryContainer.classList.remove('active');

            // 2. Xử lý an toàn cho các popup tertiary bên trong (nếu có)
            const children = popSecondaryContainer.querySelectorAll('.js__popTertiaryContainer');
            // Nếu không có tertiary, children.length sẽ là 0, vòng lặp forEach sẽ không chạy và KHÔNG gây lỗi.
            children.forEach(child => {
                child.classList.remove('active');
            });

            // 3. Reset trạng thái giao diện
            body.style.overflow = '';
            if (mainElement) mainElement.style.zIndex = '';
        };

        if (showPopupSecondary) {
            showPopupSecondary.onclick = function() {
                const isActive = popSecondaryContainer.classList.toggle('active');
                if (isActive) {
                    body.style.overflow = 'hidden';
                    if (mainElement) mainElement.style.zIndex = '102';
                } else {
                    closePopup(); 
                }
            };
        }

        if (closePopupSecondary) closePopupSecondary.onclick = closePopup;
        if (overlay) overlay.onclick = closePopup;
    });
}
    // xử lý sự kiện show popup
   function handleShowPopupTertiary() {
        const popTertiaryContainers = document.querySelectorAll('.js__popTertiaryContainer');
        const mainElement = document.querySelector('main'); // Lấy thẻ main
        const body = document.body;

        if (popTertiaryContainers.length === 0) return;

        popTertiaryContainers.forEach((popTertiaryContainer) => {
            const showPopupTertiary = popTertiaryContainer.querySelector('.js__showPopupTertiary');
            const closePopupTertiary = popTertiaryContainer.querySelector('.js__closePopupTertiary');
            const overlay = popTertiaryContainer.querySelector('.js__overlay-2');

            // Hàm hỗ trợ đóng popup để tránh lặp lại code
            const closePopup = () => {
                popTertiaryContainer.classList.remove('active');
                body.style.overflow = '';
                if (mainElement) mainElement.style.zIndex = '102'; // Reset z-index
            };

            showPopupTertiary.onclick = function() {
                const isActive = popTertiaryContainer.classList.toggle('active');
                overlay.classList.add('active');

                if (isActive) {
                    body.style.overflow = 'hidden';
                    if (mainElement) mainElement.style.zIndex = '103'; // Thêm z-index khi active
                } else {
                    body.style.overflow = '';
                    if (mainElement) mainElement.style.zIndex = '102'; // Reset khi bỏ active
                }
            }

            closePopupTertiary.onclick = closePopup;
            overlay.onclick = closePopup;
        });
    }
     // xử lý sự kiện collapse
    function handleCollapse () {

        const collapseContainers = document.querySelectorAll('.js__collapseContainer')
        if (collapseContainers.length === 0) return;
        
        let activeItem = null;
        
        collapseContainers.forEach((collapseContainer)=>{
            const collapses = collapseContainer.querySelector('.js__collapse')
            collapses.onclick = function() {
                // khi item đang mở
                if (activeItem === collapseContainer) {
                    collapseContainer.classList.remove('active'); 
                    activeItem = null; 
                } else {
                    // khi không có item nào mở
                    if (activeItem) {
                        activeItem.classList.remove('active');
                    }
                    collapseContainer.classList.add('active');
                    activeItem = collapseContainer; 
                    
                }  
                 
            }
           
        })
    }

     // xử lý sự kiện active
    function handleActiveElement() {
        const activeElements = document.querySelectorAll('.js__activeElement');
        if (activeElements.length === 0) return;

        activeElements.forEach((activeElement) => {
            const show = activeElement.querySelector('.js__showActiveElement');
            const overlay = activeElement.querySelector('.js__overlay');

            if (show) {
                show.onclick = function() {
                    // Toggle active cho cả phần tử cha và overlay
                    activeElement.classList.toggle('active');
                    if (overlay) {
                        overlay.classList.toggle('active');
                    }
                };
            }

            if (overlay) {
                overlay.onclick = function() {
                    // Xóa active của cả hai khi click vào overlay
                    activeElement.classList.remove('active');
                    overlay.classList.remove('active');
                };
            }
        });
    }
     // xử lý sự kiện active
    function handleActiveElementSecondary() {
        const containers = document.querySelectorAll('.js__activeElementSecondary');

        containers.forEach((container) => {
            container.addEventListener('click', (e) => {
            
                const item = e.target.closest('.js__activeElementSecondaryItems');
                
                if (!item) return;

                const items = container.querySelectorAll('.js__activeElementSecondaryItems');

                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                
                    items.forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    // xử lý sự kiện active
    function handleActiveElementTertiary() {
        const activeContainers = document.querySelectorAll('.js__activeContainer')
        if (activeContainers.length === 0) return;
        
        
        activeContainers.forEach((activeContainer)=>{
            
            const activeElements = activeContainer.querySelectorAll('.js__activeItem')
            
            if (activeElements.length === 0) return;

            activeElements.forEach((activeElement)=>{

                activeElement.onclick = function() {
                    activeContainer.querySelector('.js__activeItem.active').classList.remove('active')
                    this.classList.add('active');
                }
            })
           
        })
    }

    // xử lý sự kiện show search pc
    function handleShowSearchPc() {
        const searchPcs = document.querySelectorAll(".js__searchPc");
        if (searchPcs.length === 0) return;

        searchPcs.forEach((container) => {
            const btnShow = container.querySelector(".js__showFormSearchPc");
            const focusElement = container.querySelector(".js__focusSearchPc");

            // 1. Xử lý khi click vào nút tìm kiếm
            btnShow.onclick = function (event) {
                // Ngăn sự kiện nổi bọt lên window (để tránh kích hoạt ngay lập tức trình đóng search)
                event.stopPropagation();
                
                container.classList.toggle('active');

                if (container.classList.contains('active')) {
                    focusElement.focus();
                } else {
                    focusElement.value = "";
                }
            };

            // 2. Ngăn việc click bên trong form tìm kiếm làm đóng form
            container.onclick = function (event) {
                event.stopPropagation();
            };
        });

        // 3. Lắng nghe sự kiện click trên toàn trang để đóng tất cả search đang mở
        window.addEventListener('click', function () {
            searchPcs.forEach((container) => {
                if (container.classList.contains('active')) {
                    container.classList.remove('active');
                    const focusElement = container.querySelector(".js__focusSearchPc");
                    if (focusElement) focusElement.value = "";
                }
            });
        });
    }
    // Xử lý sự kiện show search mb
    function handleShowSearchMb() {
        const searchMbs = document.querySelectorAll(".js__searchMb");
        if (!searchMbs) return;
        searchMbs.forEach((searchMb) => {
            var closeSearchMb =
                document.querySelector(".js__closeSearchMb");
            var formSearchMb = document.querySelector(".js__formSearchMb");
            const focusElement =
                formSearchMb.querySelector(".js__focusSearchMb");
            searchMb.onclick = function () {
                formSearchMb.classList.add("active");
                focusElement.focus();
            };
            closeSearchMb.onclick = function () {
                formSearchMb.classList.remove("active");
                focusElement.value = "";
            };
        });
    }

    // xử lý sự kiện thay đổi select box
    function initFilterBox() {
        const filterBoxSelect = document.querySelector('.js__filterBoxSelect');
        const filterDefault = document.querySelector('.js__filterBoxDefault');
        const filterDefaultText = document.querySelector('.js__filterBoxDefaultText span');
        const filterItems = document.querySelectorAll('.js__filterBoxItem');

        if (!filterBoxSelect || !filterDefault) return;

        // 1. Click vào mặc định để đóng/mở dropdown
        filterDefault.addEventListener('click', function (e) {
            e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
            filterBoxSelect.classList.toggle('active');
        });

        // 2. Click vào từng item bên dưới
        filterItems.forEach(item => {
            item.addEventListener('click', function () {
                // Lấy text của item được click
                const selectedText = this.querySelector('.select-item__title').innerText;

                // Cập nhật text cho phần hiển thị mặc định
                if (filterDefaultText) {
                    filterDefaultText.innerText = selectedText;
                }

                // Xóa class active ở tất cả các items và thêm vào item hiện tại
                filterItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                // Đóng dropdown sau khi chọn xong
                filterBoxSelect.classList.remove('active');
            });
        });

        // 3. Click ra ngoài để đóng dropdown (UX tốt hơn)
        document.addEventListener('click', function () {
            filterBoxSelect.classList.remove('active');
        });
    }



    // Khởi tạo fancybox
    function initFancybox() {
        const fancyboxes = document.querySelectorAll(".fancybox-full");
        if (fancyboxes) {
            fancyboxes.forEach(function () {
                $(".fancybox-full a").fancybox();
            });
        }
    }

    // Khởi tạo sticky content 
    function initStickyContent() {
        const stickyContainers = document.querySelectorAll('.js__stickyContainer')
        if (!stickyContainers) return; 
    
        stickyContainers.forEach(item => {
            var stickyElements = [item.querySelector('.js__stickyLeft'), item.querySelector('.js__stickyRight')]
                .filter(element => element !== null); 
    
            stickyElements.forEach(element => {
                $(element).theiaStickySidebar({
                    additionalMarginTop: 60,
                });
            });
        });
    }

    // xử lý sự kiện chuyển tab
    function handleChangeTab() {
        const changTabs = document.querySelectorAll('.js__changeTab');

        if (changTabs.length === 0) return;

        changTabs.forEach((changTab) => {
            const tabs = changTab.querySelectorAll(".js__tabItem");
            const panes = changTab.querySelectorAll(".js__tabPane");

            // 1. Xử lý chuyển Tab
            tabs.forEach((tab, index) => {
                tab.onclick = function() {
                    if (this.classList.contains('active')) return;

                    const pane = panes[index];
                    if (!pane) return;

                    changTab.querySelector('.js__tabItem.active')?.classList.remove('active');
                    changTab.querySelector('.js__tabPane.active')?.classList.remove('active');

                    this.classList.add('active');
                    pane.classList.add('active');

                }
            });

        });
    }

    // xử lý sự kiện hiện lý do hủy đơn
    function initCancelOrderToggle() {
        // 1. Kiểm tra xem wrapper của ô nhập liệu có tồn tại không
        const inputWrapper = document.querySelector('.reason-input-wrapper');
        if (!inputWrapper) return; // Thoát hàm nếu không tìm thấy (tránh lỗi trên page khác)

        // 2. Tìm tất cả các radio button trong nhóm cancelOrder
        const radioButtons = document.querySelectorAll('input[name="cancelOrder"]');
        if (radioButtons.length === 0) return; // Thoát nếu không có radio nào

        // 3. Lặp qua các radio để gán sự kiện
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', function() {
                // Kiểm tra ID cụ thể để hiện ô nhập
                if (this.id === 'cancel-order-1-5' && this.checked) {
                    inputWrapper.style.display = 'block';
                    
                    // Kiểm tra ô input bên trong trước khi focus
                    const reasonInput = document.getElementById('cancel-reason');
                    if (reasonInput) reasonInput.focus();
                } else {
                    inputWrapper.style.display = 'none';
                }
            });
        });
    }

     // xử lý sự kiện play audio
    function handleAudio() {
        const audioContainers = document.querySelectorAll(".js__audioContainer");

        audioContainers.forEach((audioContainer) => {
            // Lấy tất cả audio và các mục chọn
            const allAudios = audioContainer.querySelectorAll('.js__audioSource');
            const toneItems = audioContainer.querySelectorAll('.js__toneItem');
            
            const playPauseBtn = audioContainer.querySelector('.js__audioPlay');
            const seekSlider = audioContainer.querySelector('.js__audioRange');
            const controlIcon = audioContainer.querySelector('.js__controlIcon');
            
            // Các phần tử điều khiển dropdown
            const audioAction = audioContainer.querySelector('.js__audioAction');
            const showSelectBtn = audioContainer.querySelector('.js__showSelectTone');
            const toneTitle = audioContainer.querySelector('.js__setTone');

            const iconPaths = {
                play: { d: "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z", viewBox: "0 0 384 512" },
                pause: { d: "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z", viewBox: "0 0 320 512" }
            };

            // Hàm lấy audio đang có class active
            const getActiveAudio = () => audioContainer.querySelector('.js__audioSource.active');

            const updateUI = () => {
                const activeAudio = getActiveAudio();
                if (!activeAudio || !activeAudio.duration) return;
                const percentage = (activeAudio.currentTime / activeAudio.duration) * 100;
                seekSlider.value = percentage;
                seekSlider.style.backgroundSize = `${percentage}% 100%`;
            };

            const toggleIcon = (type) => {
                controlIcon.setAttribute('viewBox', iconPaths[type].viewBox);
                controlIcon.querySelector('path').setAttribute('d', iconPaths[type].d);
            };

            // --- SỰ KIỆN CHÍNH ---

            // 1. Mở/Đóng dropdown bằng cách add class active vào js__audioAction
            showSelectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                audioAction.classList.toggle('active');
            });

            // 2. Click chọn giọng (js__toneItem)
            toneItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    // Đổi Text
                    toneTitle.innerText = this.innerText;
                    
                    // Dừng audio cũ
                    const oldAudio = getActiveAudio();
                    oldAudio.pause();
                    oldAudio.currentTime = 0;
                    oldAudio.classList.remove('active');

                    // Kích hoạt audio mới dựa trên index (thứ tự)
                    const newAudio = allAudios[index];
                    newAudio.classList.add('active');

                    // Phát audio mới
                    newAudio.play();
                    toggleIcon('pause');

                    // Đóng dropdown
                    audioAction.classList.remove('active');
                });
            });

            // 3. Play/Pause nút chính
            playPauseBtn.addEventListener('click', () => {
                const activeAudio = getActiveAudio();
                if (activeAudio.paused) {
                    activeAudio.play();
                    toggleIcon('pause');
                } else {
                    activeAudio.pause();
                    toggleIcon('play');
                }
            });

            // 4. Đồng bộ thanh kéo và sự kiện kết thúc cho TẤT CẢ audio
            allAudios.forEach(audio => {
                audio.addEventListener('timeupdate', () => {
                    if (audio.classList.contains('active')) updateUI();
                });
                audio.addEventListener('ended', () => {
                    toggleIcon('play');
                    seekSlider.value = 0;
                    seekSlider.style.backgroundSize = `0% 100%`;
                });
            });

            // 5. Tua nhạc
            seekSlider.addEventListener('input', (e) => {
                const activeAudio = getActiveAudio();
                if (!activeAudio.duration) return;
                const seekTo = (e.target.value / 100) * activeAudio.duration;
                activeAudio.currentTime = seekTo;
            });

            // Click ra ngoài thì đóng dropdown
            document.addEventListener('click', () => {
                audioAction.classList.remove('active');
            });
        });
    }



    // khởi tạo slider với nhiều item có width auto
    function initSliderAutoItems() {
        const autoSlides = document.querySelectorAll(".js__autoSlideContainer");
        if (autoSlides) {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        }
    }
    // Khởi tạo slider với một item
    function initSliderOneItems() {
        const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
        if (oneSlides) {
            oneSlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var swiperSlides = slider.querySelectorAll('.swiper-slide');
                var loopMode = swiperSlides.length >= 2; 
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    slidesPerGroup: 1,
                    autoHeight: true,
                    loop: loopMode,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                });
            });
        }
    }

     // Khởi tạo slider với 6 item
    function initSliderSixItems() {
        const sixSlides = document.querySelectorAll(".js__sixSlidesContainer");
        if (sixSlides) {
            sixSlides.forEach((item) => {
                var slider = item.querySelector(".js__sixSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");

                var swiper = new Swiper(slider, {
                    slidesPerView: 2,
                    spaceBetween: 12,
                    slidesPerGroup: 1,
                    loop: false,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                        1400: {
                            slidesPerView: 6,
                        },
                    },
                });

            });
        }
    }

    // khởi tạo slider gallery picture
    function initSliderGalleryPictureItems() {
        const gallerryPictures = document.querySelectorAll(
            ".js__swiperGalleryContainerPicture"
        );
        gallerryPictures.forEach((item) => {
            var sliderLarge = item.querySelector(".js__swiperGalleryLarge");
            var sliderSmall = item.querySelector(".js__swiperGallerySmall");
            var next = item.querySelector(".swiper-button-next");
            var prev = item.querySelector(".swiper-button-prev");

            var small = new Swiper(sliderSmall, {
                spaceBetween: 15,
                slidesPerView: 4,
                slidesPerGroup: 1,
                freeMode: true,
                watchSlidesProgress: true,
                breakpoints: {
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                },
            });
            var large = new Swiper(sliderLarge, {
                spaceBetween: 10,
                slidesPerView: 1,
                slidesPerGroup: 1,
                navigation: {
                    nextEl: next || null,
                    prevEl: prev || null,
                },
                thumbs: {
                    swiper: small,
                },
            });

        });
    }
  

    // Xử lý thanh header dính
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        const stickyPoint = stickyHeaderPC.offsetTop;
        if (stickyHeaderPC) {
            const isSticky = scrollY > stickyPoint;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
    
        if (!backTop) return;

        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

    }

    // Xử lý hiển thị nút backTop dựa trên vị trí cuộn trang
    function handleBackTopVisibility() {
        if (backTop) {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                backTop.style.opacity = 1;
                backTop.style.visibility = "visible";
            } else {
                backTop.style.opacity = 0;
                backTop.style.visibility = "hidden";
            }
        }
    }

    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        handleStickyHeader();
        handleBackTopVisibility()
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleShowSubMenu();
        handleShowSearchPc();
        handleShowSearchMb();
        handleChangeTab();
        initFancybox();
        handleShowPopupCart();
        handleShowPopup();
        handleShowPopupSecondary();
        handleShowPopupTertiary();
        handleIncremental();
        handleActiveElement();
        handleActiveElementSecondary();
        handleActiveElementTertiary();
        initFilterBox();
        handleCollapse();
        initCancelOrderToggle();
        // initStickyContent();
        // slide
        initSliderOneItems();
        initSliderSixItems();
        initSliderGalleryPictureItems();
        // scroll
        window.addEventListener('scroll',handleWindowScroll);
        window.addEventListener('resize',handleWindowScroll);
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
