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
    // xử lý sự kiện show popup
    function handleShowPopup() {
        const popPrimaryContainers = document.querySelectorAll('.js__popPrimaryContainer');
        if (popPrimaryContainers.length === 0) return;

        popPrimaryContainers.forEach((popPrimaryContainer) => {

            const showPopupPrimary = popPrimaryContainer.querySelector('.js__showPopupPrimary');
            const closePopupPrimary = popPrimaryContainer.querySelector('.js__closePopupPrimary');
            const overlay = popPrimaryContainer.querySelector('.js__overlay');
            const body = document.body;
    
            showPopupPrimary.onclick = function() {
                popPrimaryContainer.classList.toggle('active')
                overlay.classList.add('active')
                if (popPrimaryContainer.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            }
            closePopupPrimary.onclick = function() {
                popPrimaryContainer.classList.remove('active')
                body.style.overflow = '';
            }
            overlay.onclick = function() {
                popPrimaryContainer.classList.remove('active')
                body.style.overflow = '';
            }
            
        } )

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
  

    // Xử lý thanh header dính
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
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
        handleShowPopup();
        handleIncremental();
        handleActiveElement();
        handleActiveElementSecondary();
        // initStickyContent();
        // slide
        initSliderOneItems();
        initSliderSixItems();
        // scroll
        window.addEventListener('scroll',handleWindowScroll);
        window.addEventListener('resize',handleWindowScroll);
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
