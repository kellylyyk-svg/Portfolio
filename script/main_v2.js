/**
 * Portfolio v2 Main Script
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio v2 Initialization");



    // 2. Work Item Click (Link vs Modal)
    const workItems = document.querySelectorAll('.work-item, [data-type="modal"], [data-type="link"]');
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.getSelection().toString().length > 0) return; // Prevent drag click

            const type = item.getAttribute('data-type');
            
            if (type === 'link') {
                const url = item.getAttribute('data-url');
                if (url) window.open(url, '_blank');
            } else if (type === 'modal') {
                const imgSrc = item.getAttribute('data-img');
                openModal(imgSrc);
            }
        });
    });

    // 4. Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-modal');

    function openModal(src) {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => { modalImg.src = ''; }, 300); // clear src after transition
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 5. GSAP Animations (Wow Factors)
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- 5.1 Cinematic Intro (Hero Section) ---
        const heroTimeline = gsap.timeline();
        
        // Hide elements initially via CSS or handle them here
        gsap.set('.hero-title .line', { y: 100, opacity: 0 });
        gsap.set('.hero-subtitle, .scroll-indicator', { opacity: 0, y: 20 });
        gsap.set('.header', { y: -100, opacity: 0 });

        heroTimeline
            .to('.header', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2)
            .to('.hero-title .line', { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                stagger: 0.2, 
                ease: 'power4.out' 
            }, 0.5)
            .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1 }, "-=0.5")
            .to('.scroll-indicator', { opacity: 1, y: 0, duration: 1 }, "-=0.8");

        // --- 5.1.4 Continuous Floating (Bubbles & Butterflies) ---
        gsap.to('.bubble-1', { yPercent: -5, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.bubble-2', { yPercent: 8, duration: 7, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });
        gsap.to('.bubble-3', { yPercent: -10, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 });
        gsap.to('.bubble-4', { yPercent: 10, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
        
        gsap.to('.butterfly-1', { yPercent: -8, rotation: 2, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.butterfly-2', { yPercent: -5, rotation: -3, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });
        
        gsap.to('.text-portfolio', { scale: 1.01, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });



        // --- 5.1.5 Scroll Storytelling (Hero to About) ---
        // �?Veil) ?�이?�인: About ?�션부??배경??반투명하�???��
        gsap.to('.veil', {
            scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'top top', scrub: true },
            opacity: 0.5
        });

        // ?�크롤을 ?�리�??�작?�면 ?�비?��? ?�옆?�로 ?�아가�??�면 밖으�??�라집니??
        gsap.to('.butterfly-1', {
            scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom center', scrub: 1 },
            x: '-30vw', opacity: 0, ease: 'power1.in'
        });
        gsap.to('.butterfly-2', {
            scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom center', scrub: 1 },
            x: '30vw', opacity: 0, ease: 'power1.in'
        });

        // 버블?��? About ?�션?�로 진입????좌우 구석?�로 ?�게 ?�동?�여 콘텐츠�? 가리�? ?�습?�다.
        // 마스???�?�라?�으�??�합?�여 ?�간?�동 버그(Teleporting) 방�? �?부?�러???�속 ?�영 구현
        let bubbleTl = gsap.timeline({
            scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
        });

        // [Waypoint 0: Hero -> About]
        bubbleTl.to('.bubble-1', { y: '60vh', x: '80vw', rotation: 90, scale: 0.8, ease: 'power1.inOut' }, 0)
                .to('.bubble-2', { y: '-50vh', x: '-80vw', rotation: -60, scale: 0.9, ease: 'power1.inOut' }, 0)
                .to('.bubble-3', { y: '40vh', x: '-30vw', rotation: 45, opacity: 0.3, ease: 'power1.inOut' }, 0)
                .to('.bubble-4', { y: '30vh', x: '40vw', rotation: -45, opacity: 0.3, ease: 'power1.inOut' }, 0)

        // [Waypoint 1: About -> Workflow] 
                .to('.bubble-1', { y: '-20vh', x: '10vw', rotation: 120, scale: 1.1, ease: 'power1.inOut' }, 1)
                .to('.bubble-2', { y: '50vh', x: '40vw', rotation: -90, scale: 0.8, ease: 'power1.inOut' }, 1)
                .to('.bubble-3', { y: '10vh', x: '-50vw', rotation: 180, opacity: 0.5, ease: 'power1.inOut' }, 1)
                .to('.bubble-4', { y: '-30vh', x: '-20vw', rotation: 45, opacity: 0.6, ease: 'power1.inOut' }, 1)

        // [Waypoint 2: Workflow -> Webapp] 
                .to('.bubble-1', { y: '40vh', x: '-30vw', rotation: 200, scale: 0.9, ease: 'power1.inOut' }, 2)
                .to('.bubble-2', { y: '-40vh', x: '-60vw', rotation: 45, scale: 1.2, ease: 'power1.inOut' }, 2)
                .to('.bubble-3', { y: '60vh', x: '30vw', rotation: -45, opacity: 0.8, ease: 'power1.inOut' }, 2)
                .to('.bubble-4', { y: '10vh', x: '50vw', rotation: -120, opacity: 0.4, ease: 'power1.inOut' }, 2)

        // [Waypoint 3: Webapp -> Mobile] 
                .to('.bubble-1', { y: '0vh', x: '60vw', rotation: 90, scale: 1, ease: 'power1.inOut' }, 3)
                .to('.bubble-2', { y: '20vh', x: '20vw', rotation: 0, scale: 1.5, ease: 'power1.inOut' }, 3)
                .to('.bubble-3', { y: '-50vh', x: '-40vw', rotation: 45, opacity: 0.5, ease: 'power1.inOut' }, 3)
                .to('.bubble-4', { y: '50vh', x: '-10vw', rotation: 180, opacity: 0.7, ease: 'power1.inOut' }, 3)

        // [Waypoint 4: Mobile -> Others] 
                .to('.bubble-1', { y: '30vh', x: '-20vw', rotation: 0, scale: 1.1, ease: 'power1.inOut' }, 4)
                .to('.bubble-2', { y: '-10vh', x: '50vw', rotation: -90, scale: 0.9, ease: 'power1.inOut' }, 4)
                .to('.bubble-3', { y: '20vh', x: '10vw', rotation: 90, opacity: 0.8, ease: 'power1.inOut' }, 4)
                .to('.bubble-4', { y: '-20vh', x: '-50vw', rotation: 0, opacity: 0.5, ease: 'power1.inOut' }, 4);

        // --- 5.2 About Me Section Fade In ---
        gsap.from('.about-profile', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.detail-group', {
            scrollTrigger: {
                trigger: '.about-details',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });


        // --- 5.3 Web App (Horizontal Scroll) ---
        const horizontalSection = document.querySelector('.section-horizontal');
        if (horizontalSection) {
            ScrollTrigger.matchMedia({
                "(min-width: 769px)": function() {
                    const horizontalContainer = horizontalSection.querySelector('.horizontal-container');
                    
                    // GSAP Pin for horizontal scroll
                    gsap.to(horizontalContainer, {
                        x: () => -(horizontalContainer.scrollWidth - window.innerWidth) + "px",
                        ease: "none",
                        scrollTrigger: {
                            trigger: horizontalSection,
                            pin: true,
                            scrub: 1,
                            end: () => "+=" + horizontalContainer.scrollWidth
                        }
                    });

                    // Floating images parallax within horizontal scroll
                    gsap.to('.img1', { y: -100, ease: "none", scrollTrigger: { trigger: horizontalSection, scrub: 1 }});
                    gsap.to('.img2', { y: 150, ease: "none", scrollTrigger: { trigger: horizontalSection, scrub: 1 }});
                    gsap.to('.img3', { y: -200, x: -50, ease: "none", scrollTrigger: { trigger: horizontalSection, scrub: 1 }});
                }
            });
        }

        // --- 5.4 Mobile App (Sticky Sequence) ---
        const mobileSection = document.querySelector('.section-sticky-mobile');
        if (mobileSection) {
            const screens = mobileSection.querySelectorAll('.screen-img');
            const steps = mobileSection.querySelectorAll('.mobile-step');

            steps.forEach((step, index) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => updateScreen(index),
                    onEnterBack: () => updateScreen(index)
                });
            });

            function updateScreen(index) {
                screens.forEach((img, i) => {
                    if (i === index) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
        }

        // --- 5.5 Website (Desktop Auto-Scroll) ---
        const desktopSection = document.querySelector('.section-desktop');
        if (desktopSection) {
            const monitorScreen = desktopSection.querySelector('.monitor-screen');
            const scrollTarget = desktopSection.querySelector('.scroll-target');

            if (monitorScreen && scrollTarget) {
                gsap.to(scrollTarget, {
                    y: () => -(scrollTarget.clientHeight - monitorScreen.clientHeight),
                    ease: "none",
                    scrollTrigger: {
                        trigger: desktopSection,
                        start: "top center",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        }

        // --- 5.7 Graphics: Drag to Scroll (Reusable) ---
        function enableDragScroll(slider) {
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.style.cursor = 'grabbing';
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.style.cursor = 'grab';
            });
            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.style.cursor = 'grab';
            });
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; 
                slider.scrollLeft = scrollLeft - walk;
            });
        }
        
        const detailSlider = document.querySelector('.int-detail-gallery');
        if (detailSlider) enableDragScroll(detailSlider);

        // --- 5.8 Graphics: Popup GSAP Pin (One-way + Drag Fallback) ---
        const popupSection = document.querySelector('.int-popup-section');
        if (popupSection) {
            ScrollTrigger.matchMedia({
                "(min-width: 769px)": function() {
                    const track = popupSection.querySelector('.popup-track');
                    const rightContainer = popupSection.querySelector('.int-popup-right');
                    
                    if (track && rightContainer) {
                        const trackWidth = track.scrollWidth;
                        // 여백 보정
                        const extraPadding = window.innerWidth * 0.05;
                        const maxScroll = trackWidth - rightContainer.clientWidth + extraPadding;
                        
                        let anim = gsap.to(track, {
                            x: -maxScroll,
                            ease: "none"
                        });
                        
                        let st = ScrollTrigger.create({
                            trigger: popupSection,
                            pin: true,
                            scrub: true, // 스크롤 동기화
                            animation: anim,
                            end: () => "+=" + trackWidth,
                            onLeave: () => {
                                // 화면 떨림 방지
                                const nextSection = document.querySelector('.int-banner-section');
                                let targetTop = 0;
                                if (nextSection) {
                                    targetTop = nextSection.getBoundingClientRect().top;
                                }
                                
                                // 1. Kill ScrollTrigger (removes pin spacing)
                                st.kill();
                                
                                // 2. Clear GSAP transform
                                gsap.set(track, { clearProps: "x" });
                                
                                // 3. Enable native horizontal scroll
                                rightContainer.style.overflowX = 'auto';
                                rightContainer.classList.add('drag-scroll-container');
                                rightContainer.style.scrollbarWidth = 'none';
                                
                                // 4. Restore scroll state visually
                                rightContainer.scrollLeft = maxScroll;
                                
                                // 5. Adjust window scroll to perfectly match visual state before kill
                                if (nextSection) {
                                    const newTop = nextSection.getBoundingClientRect().top;
                                    const diff = newTop - targetTop;
                                    window.scrollBy(0, diff);
                                }
                                
                                // 6. Enable drag to scroll
                                enableDragScroll(rightContainer);
                                rightContainer.style.cursor = 'grab';
                            }
                        });
                    }
                }
            });
        }

        // --- 5.6 Landing Pages (Fly-in) ---
        const landingItemsLeft = document.querySelectorAll('.fly-left');
        const landingItemsRight = document.querySelectorAll('.fly-right');

        if (landingItemsLeft.length) {
            gsap.from(landingItemsLeft, {
                scrollTrigger: { trigger: '.section-landing', start: "top 80%" },
                x: -100, opacity: 0, duration: 1, ease: "power3.out"
            });
        }
        if (landingItemsRight.length) {
            gsap.from(landingItemsRight, {
                scrollTrigger: { trigger: '.section-landing', start: "top 80%" },
                x: 100, opacity: 0, duration: 1, ease: "power3.out"
            });
        }

        // --- 5.7 Masonry Gallery Stagger ---
        const masonrySection = document.querySelector('.section-others');
        if (masonrySection) {
            const mItems = masonrySection.querySelectorAll('.masonry-item');
            if (mItems.length) {
                gsap.from(mItems, {
                    scrollTrigger: { trigger: masonrySection, start: "top 80%" },
                    y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out"
                });
            }
        }
    }
});
/* ==========================================================================
   Graphics & More - Interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Poster Coverflow Swiper
    if (document.querySelector('.ix-poster-swiper')) {
        new Swiper('.ix-poster-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // 2. GSAP Popup Horizontal Pinning
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && document.querySelector('#ix-popup-section')) {
        gsap.registerPlugin(ScrollTrigger);

        const popupSection = document.querySelector("#ix-popup-section");
        const popupTrack = document.querySelector("#ix-popup-track");
        
        // Calculate the total scroll amount needed
        function getScrollAmount() {
            let trackWidth = popupTrack.scrollWidth;
            return -(trackWidth - window.innerWidth + 200); // 200px offset for padding
        }

        // Only apply if it's desktop (mobile falls back to standard flow in CSS)
        if (window.innerWidth > 1024) {
            const tween = gsap.to(popupTrack, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: popupSection,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true,
                markers: false
            });
        }
    }

    // 3. Custom Cursor & Drag for Detail Section
    const dragArea = document.querySelector('#ix-drag-area');
    const customCursor = document.querySelector('#ix-drag-cursor');
    const dragTrack = document.querySelector('#ix-drag-track');

    if (dragArea && customCursor && dragTrack) {
        // Move cursor
        dragArea.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1024) {
                // Get mouse position relative to dragArea
                const rect = dragArea.getBoundingClientRect();
                const x = e.clientX; // Use clientX/Y for fixed position cursor
                const y = e.clientY;
                
                customCursor.style.left = x + 'px';
                customCursor.style.top = y + 'px';
            }
        });

        // Mouse Drag to Scroll
        let isDown = false;
        let startX;
        let scrollLeft;

        dragArea.addEventListener('mousedown', (e) => {
            isDown = true;
            dragArea.style.cursor = 'none';
            customCursor.style.transform = 'translate(-50%, -50%) scale(0.9)'; // feedback
            startX = e.pageX - dragTrack.offsetLeft;
            scrollLeft = dragTrack.scrollLeft;
        });

        dragArea.addEventListener('mouseleave', () => {
            isDown = false;
            customCursor.style.transform = 'translate(-50%, -50%) scale(0)';
        });

        dragArea.addEventListener('mouseup', () => {
            isDown = false;
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        dragArea.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - dragTrack.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            dragTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // Old duplicate modal binding removed

});


/* ==========================================================================
   Custom Cursor Interaction
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');

    // Follow mouse smoothly using GSAP
    window.addEventListener('mousemove', (e) => {
        if (dot) {
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0
            });
        }
    });

    // Hover effects
    const interactables = document.querySelectorAll('a, button, .interactive, .work-item, .category-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (dot) dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (dot) dot.classList.remove('hover');
        });
    });
});




