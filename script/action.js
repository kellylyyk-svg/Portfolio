// 1. 3D 배경 설정 (Three.js)
let scene, camera, renderer, stars, starGeo;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const bgElement = document.getElementById('three-js-background');
    if (bgElement) {
        bgElement.appendChild(renderer.domElement);
    }

    const points = [];
    for (let i = 0; i < 6000; i++) {
        points.push(new THREE.Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300));
    }
    starGeo = new THREE.BufferGeometry().setFromPoints(points);
    stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true
    }));
    scene.add(stars);
    animate();
}

function animate() {
    if (stars) stars.rotation.y += 0.0005;
    if (renderer && scene && camera) renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// 초기화 실행
initThree();


// 2. Fullpage.js 설정
new fullpage('#fullpage', {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    scrollingSpeed: 1200,
    /* 800 -> 1200 (스크롤 과민 반응 방지 위해 속도 늦춤) */
    autoScrolling: true,

    // [중요] 특정 요소 내부에서만 스크롤이 작동하게 하려면 여기 등록하여 
    // fullpage.js가 이 영역의 이벤트를 하이재킹하지 않도록 합니다.
    normalScrollElements: '.graphic-archive-wrapper, .terminal-content',


    fitToSection: true,
    fitToSectionDelay: 500,
    /* 섹션 고정 딜레이 추가 */
    css3: true,
    /* easingcss3 제거 -> 기본값 사용 (안정성 확보) */
    navigation: false,
    scrollBar: false,
    sectionSelector: '.section',
    verticalCentered: false,
    scrollOverflow: false,
    /* 오버플로우 스크롤 방지 (섹션 넘김에 집중) */

    // [ADD] afterLoad Callback for Dev Log Sequence
    afterLoad: function (origin, destination, direction) {
        // [ADD] Trigger About Me Reveal on entry (index 1)
        if (destination.index === 1) {
            // triggerAboutMeReveal(); // [DISABLED] Always visible now
        }

        // Dev Log Section is the 7th section (index 6)
        if (destination.index === 6) {
            triggerDevLogSequence();
        }

        // [ADD] Trigger NEXT_FILE button activation on Web Design section entry (index 3)
        if (destination.index === 3) {
            triggerNextFileActivation();
        }

        // [ADD] Trigger floating navigation update
        if (window.onFullpageAfterLoad) {
            window.onFullpageAfterLoad(origin, destination, direction);
        }
    },

    // [ADD] onLeave callback for floating navigation
    onLeave: function (origin, destination, direction) {
        if (window.onFullpageOnLeave) {
            window.onFullpageOnLeave(origin, destination, direction);
        }
    }
});


// 3. Project Data & Switching Logic
const projectData = [{
    title: "DUSTLINE",
    topic: "# 브랜드 정체성 구축 및 반응형 웹 디자인",
    contribution: "PLANNING: 100% / DESIGN: 100% / PUBLISHING: 100%",
    desc: "배틀로얄 FPS 장르의 핵심인 '생존'과 '전쟁'을 시각화하기 위해, Dark & Grunge 톤을 베이스로 전장의 거친 질감을 표현했습니다.<br>정형화된 레이아웃에서 벗어나 실제 게임 인터페이스(UI)를 연상시키는 과감한 장식 요소와 테크니컬한 디자인을 적용하여 장르적 몰입감을 극대화했습니다.",
    // 스크롤 목업용 긴 이미지를 지정
    img: "images/DUSTLINE.jpg",
    mobileImg: "images/DUSTLINE_mobile.jpg", // [추가] 모바일 이미지 경로
    pages: "MAIN + 2 SUB",
    url: "https://kellylyyk-svg.github.io/DUSTLINE-Website/"
},
{
    title: "WAVERSA SYSTEMS",
    topic: "#하이엔드 오디오 기업 웹사이트 디자인 제작",
    contribution: "DESIGN: 100% / PUBLISHING: 100%",
    desc: "웨이버사시스템즈의 독자적인 기술력과 정교함을 시각화하기 위해 불필요한 장식을 배제한 미니멀리즘 스타일을 구축했습니다.<br>화이트 톤과 넓은 여백을 활용해 정제된 공간감을 연출하고, 브랜드 로고의 고채도 레드를 포인트 컬러로 사용하여 자칫 정적일 수 있는 화면에 강렬한 시각적 리듬감을 더했습니다.",
    img: "images/waversa.jpg",
    mobileImg: "images/waversa.jpg", // 모바일 이미지가 없어 PC 이미지로 대체 (추후 변경 가능)
    pages: "MAIN",
    url: "https://kellylyyk-svg.github.io/waversa/"
},
{
    title: "ARTE CENTER",
    topic: "#복합 문화 예술 공간 '아르떼 센터' 웹사이트 구축",
    contribution: "PLANNING: 100% / DESIGN: 100% / PUBLISHING: 100%",
    desc: "예술과 일상의 연결을 지향하는 아르떼 센터의 정체성을 담기 위해 클래식하고 우아한 무드를 컨셉으로 설정했습니다.<br>시대를 초월한 예술적 가치를 상징하는 세피아(Sepia) 톤과 베이지 컬러를 메인으로 사용하여 따뜻하면서도 품격 있는 공간감을 조성했습니다.",
    img: "images/artecenter.jpg",
    mobileImg: "images/artecenter_mobile.jpg",
    pages: "MAIN + 1 SUB",
    url: "https://kellylyyk-svg.github.io/17-3-arte-center/"
},
{
    title: "NOUVEDILIE",
    topic: "#주얼리 브랜드 '누베딜리' 웹사이트 메인 디자인",
    contribution: "DESIGN: 100%",
    desc: "누베딜리가 추구하는 '변하지 않는 가치'를 전달하기 위해 클래식하면서도 현대적인 고급스러움을 컨셉으로 설정했습니다.<br>깊이감 있는 브라운과 아이보리 컬러를 매치하여 브랜드의 무게감을 더했으며, 제품이 돋보일 수 있도록 고전 회화 무드의 배경을 활용하여 예술적인 감성을 극대화했습니다.",
    img: "images/ring.jpg",
    mobileImg: "images/ring.jpg",
    pages: "MAIN ONLY",
    url: "https://www.figma.com/proto/4w6saWBe1TPWK82soZsoYF/17%EA%B8%B0%EA%B9%80%EC%84%9C%EC%98%81?page-id=485%3A125&node-id=1099-521&viewport=-3400%2C446%2C0.11&t=VCBbovEtJQKO3ESV-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=746%3A250"
},
{
    title: "FUJIFILM",
    topic: "#후지필름 브랜드 웹사이트 리디자인",
    contribution: "DESIGN: 100%",
    desc: "후지필름이 지닌 독보적인 아날로그 감성과 기록의 가치를 전달하기 위해 '필름 사진'의 색채를 담은 따뜻한 톤앤매너를 구축했습니다.<br>필름 시뮬레이션을 연상시키는 깊은 브라운과 오렌지 컬러를 감각적으로 배치하여 브랜드의 헤리티지를 강조했으며, 넓은 여백과 정제된 레이아웃을 통해 사용자가 사진 결과물에 온전히 몰입할 수 있도록 디자인했습니다.",
    img: "images/fuji.jpg",
    mobileImg: "images/fuji_mobile.jpg",
    pages: "MAIN + 1 SUB",
    url: "https://www.figma.com/proto/4w6saWBe1TPWK82soZsoYF/17%EA%B8%B0%EA%B9%80%EC%84%9C%EC%98%81?page-id=485%3A125&node-id=761-1710&viewport=-3400%2C446%2C0.11&t=VCBbovEtJQKO3ESV-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=746%3A250"
},
{
    title: "DAWON",
    topic: "#가상 전통차 브랜드 '다원' 웹사이트 디자인",
    contribution: "PLANNING: 100% / DESIGN: 100%",
    desc: "'차(Tea) 한 잔이 주는 일상의 여유'라는 가치를 전달하기 위해 자연 친화적이고 평온한 무드를 컨셉으로 설정했습니다.<br>숲과 차 밭을 연상시키는 톤 다운된 그린과 베이지 컬러를 메인으로 활용하여 시각적 안정감을 주었으며, 한지의 질감을 살린 배경 그래픽을 통해 브랜드의 전통적인 미학을 현대적으로 재해석했습니다.",
    img: "images/dawon.jpg",
    mobileImg: "images/dawon.jpg",
    pages: "MAIN ONLY",
    url: "https://www.figma.com/proto/WMKGwVjqGEmzC9WgtUHA1O/topworld-dawon-namecard?page-id=28%3A6&node-id=53-140&viewport=416%2C200%2C0.11&t=37Jj7CkDWPtfz0ZE-1&scaling=scale-down-width&content-scaling=fixed"
},
// ... 추가 프로젝트 데이터들
{
    title: "SWEET BLANC",
    topic: "#가상 베이커리 카페 웹디자인 및 퍼블리싱",
    contribution: "PLANNING: 100% / DESIGN: 100% / PUBLISHING: 100%",
    desc: "갓 구운 빵의 따스함과 달콤함을 시각화하기 위해 부드러운 베이지와 브라운 톤을 메인으로 활용했습니다.<br>사용자가 마치 베이커리에 들어온 듯한 편안한 경험을 할 수 있도록 감성적인 타이포그래피와 여백을 조화롭게 배치하여 브랜드의 아이덴티티를 효과적으로 전달했습니다.",
    img: "images/sweetblanc.jpg",
    mobileImg: "images/sweetblanc.jpg", // 모바일 이미지가 없어 PC 이미지로 대체
    pages: "MAIN",
    url: "https://kellylyyk-svg.github.io/sweet-blanc-website/"
}
];

let currentIndex = 0;

function switchProject(direction) {
    if (!projectData || projectData.length === 0) return;

    currentIndex = (currentIndex + direction + projectData.length) % projectData.length;
    const data = projectData[currentIndex];

    // 효과를 줄 타겟 요소들
    const scrollImg = document.getElementById('project-scroll-img'); // 스크롤 이미지 선택 (PC)
    const mobileScrollImg = document.getElementById('project-mobile-scroll-img'); // [추가] 모바일 이미지 선택

    // 타겟 요소 선택
    const title = document.querySelector('.ins-title');
    const subtitle = document.querySelector('.ins-subtitle');
    const spec = document.querySelector('.ins-list');
    const descs = document.querySelectorAll('.ins-desc'); /* Changed from querySelector to querySelectorAll */
    const counter = document.getElementById('project-counter');
    const pcWrapper = document.getElementById('pc-mockup');
    const mobileWrapper = document.getElementById('mobile-mockup');

    // 1. 텍스트 스크램블 효과 (디코딩 애니메이션)
    const scrambleText = (el, finalText) => {
        if (!el) return;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iterations = 0;

        const interval = setInterval(() => {
            el.innerText = finalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= finalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 2; // 속도 조절
        }, 30);
    };

    // 2. 이미지 스캔라인/글리치 효과 트리거
    const triggerScanEffect = (wrapper) => {
        if (wrapper) {
            wrapper.classList.remove('system-scan');
            void wrapper.offsetWidth; // 리플로우
            wrapper.classList.add('system-scan');
            setTimeout(() => wrapper.classList.remove('system-scan'), 800);
        }
    };

    if (pcWrapper && pcWrapper.classList.contains('active')) triggerScanEffect(pcWrapper);
    if (mobileWrapper && mobileWrapper.classList.contains('active')) triggerScanEffect(mobileWrapper);


    // 3. 데이터 교체 및 애니메이션 실행
    setTimeout(() => {
        if (scrollImg) scrollImg.src = data.img;
        if (mobileScrollImg && data.mobileImg) mobileScrollImg.src = data.mobileImg;

        if (title) scrambleText(title, data.title);
        if (subtitle) scrambleText(subtitle, data.topic);

        if (spec) {
            // 리스트는 내부 HTML 구조 때문에 스크램블 대신 페이드 인/아웃 유지 혹은 단순 교체
            const items = data.contribution.split(' / ');
            spec.innerHTML = items.map(item => `<li>${item}</li>`).join('');
            spec.classList.remove('data-load-reveal');
            void spec.offsetWidth;
            spec.classList.add('data-load-reveal');
        }

        if (descs.length > 0) {
            descs.forEach(desc => {
                // Determine if this is short view or full view
                // Actually they are both .ins-desc, so loop handles both.
                // Just ensure we aren't missing any.
                desc.innerHTML = data.desc;
                desc.classList.remove('data-load-reveal');
                void desc.offsetWidth;
                desc.classList.add('data-load-reveal');
            });
        }

        if (counter) counter.innerText = `0${currentIndex + 1} / 0${projectData.length}`;

        const pageCount = document.querySelector('.ins-page-count');
        if (pageCount && data.pages) pageCount.innerText = data.pages;

        // [ADD] Update project URL
        const openSiteBtn = document.getElementById('open-site-btn');
        if (openSiteBtn) {
            if (data.url) {
                openSiteBtn.href = data.url;
                openSiteBtn.style.display = 'inline-block'; // Or however it was styled
            } else {
                openSiteBtn.href = "#";
                // Optional: hide button if no URL exists
                // openSiteBtn.style.display = 'none';
            }
        }

        // Trigger Log
        const log = document.querySelector('.status-log');
        if (log) {
            const originalText = "LOG: PROJECT_DATA_LOADED_SUCCESSFULLY";
            let dots = "";
            let loadInterval = setInterval(() => {
                dots += ".";
                if (dots.length > 3) dots = "";
                log.innerText = "LOG: SYSTEM_PROCESSING" + dots;
            }, 100);

            setTimeout(() => {
                clearInterval(loadInterval);
                log.innerText = originalText;
            }, 800);
        }

    }, 200);
}


// [ADD] Device Switcher Logic
function switchDevice(mode) {
    const pcMockup = document.getElementById('pc-mockup');
    const mobileMockup = document.getElementById('mobile-mockup');
    const bts = document.querySelectorAll('.tab-btn');

    // 1. 버튼 활성화 상태 변경
    bts.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(mode)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. 뷰 전환
    if (mode === 'pc') {
        if (pcMockup) {
            pcMockup.style.display = 'block';
            setTimeout(() => pcMockup.classList.add('active'), 10);
        }
        if (mobileMockup) {
            mobileMockup.classList.remove('active');
            mobileMockup.style.display = 'none'; // 즉시 숨김 (겹침 방지)
        }
    } else {
        if (mobileMockup) {
            mobileMockup.style.display = 'block';
            setTimeout(() => mobileMockup.classList.add('active'), 10);
        }
        if (pcMockup) {
            pcMockup.classList.remove('active');
            pcMockup.style.display = 'none'; // 즉시 숨김
        }
    }
}

// [ADD] 초기 로드 시 카운터 및 데이터 초기화
window.addEventListener('load', () => {
    const counter = document.getElementById('project-counter');
    if (counter && projectData.length > 0) {
        counter.innerText = `01 / 0${projectData.length}`;
    }
});

/* =========================================
   [ADD] GRAPHIC ARCHIVE MODAL LOGIC
   ========================================= */
function openGraphicModal(card) {
    const modal = document.getElementById('graphic-modal');
    if (!modal) return;

    // 1. Get Elements
    const mImg = document.getElementById('modal-img');
    const mTitle = document.getElementById('modal-title');
    const mLabel1 = document.getElementById('modal-label-1');
    const mLabel2 = document.getElementById('modal-label-2');
    const mLabel3 = document.getElementById('modal-label-3');
    const mData1 = document.getElementById('modal-data-1');
    const mData2 = document.getElementById('modal-data-2');
    const mData3 = document.getElementById('modal-data-3');
    const mGroup3 = document.getElementById('modal-group-content-3');
    const mIndicators = document.getElementById('modal-indicators');

    const mImgBox = document.querySelector('.modal-img-box');

    // 2. Get Data
    const type = card.getAttribute('data-type');
    const title = card.getAttribute('data-title');
    const imgSrc = card.querySelector('img').src; // Default fallback
    const rawImages = card.getAttribute('data-images');

    // Reset scrollable state & Indicators
    if (mImgBox) mImgBox.classList.remove('is-scrollable');
    if (mIndicators) mIndicators.innerHTML = ''; // Clear dots

    // Image Handling logic
    if (rawImages) {
        const images = rawImages.split(',');
        // Set first image
        if (mImg) mImg.src = images[0];

        // Create Indicators
        if (images.length > 1) {
            let currentImageIndex = 0; // State tracking

            images.forEach((imgUrl, index) => {
                const dot = document.createElement('div');
                dot.classList.add('indicator-dot');
                if (index === 0) dot.classList.add('active');

                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentImageIndex = index; // Sync state

                    if (mImg) {
                        mImg.style.opacity = '0';
                        setTimeout(() => {
                            mImg.src = imgUrl;
                            mImg.style.opacity = '1';
                        }, 200);
                    }

                    if (mIndicators) {
                        const dots = mIndicators.querySelectorAll('.indicator-dot');
                        dots.forEach(d => d.classList.remove('active'));
                    }
                    dot.classList.add('active');
                });

                if (mIndicators) mIndicators.appendChild(dot);
            });

            // [Wheel Navigation]
            if (mImgBox) {
                mImgBox.onwheel = (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const now = Date.now();
                    if (mImgBox.dataset.lastScroll && (now - Number(mImgBox.dataset.lastScroll) < 300)) return;
                    mImgBox.dataset.lastScroll = now;

                    if (e.deltaY > 0) {
                        currentImageIndex = (currentImageIndex + 1) % images.length;
                    } else {
                        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    }

                    // Update Image
                    if (mImg) {
                        mImg.style.opacity = '0';
                        setTimeout(() => {
                            mImg.src = images[currentImageIndex];
                            mImg.style.opacity = '1';
                        }, 150);
                    }

                    // Update Dots
                    if (mIndicators) {
                        const dots = mIndicators.querySelectorAll('.indicator-dot');
                        dots.forEach((d, i) => {
                            if (i === currentImageIndex) d.classList.add('active');
                            else d.classList.remove('active');
                        });
                    }
                };
            }
        } else {
            if (mImgBox) mImgBox.onwheel = null;
        }
    } else {
        // Single Image Fallback
        if (mImg) mImg.src = imgSrc;
        if (mImgBox) mImgBox.onwheel = null; // Ensure wheel event is cleared
    }


    // Apply scrollable state for detail pages
    if (type === 'detail' && mImgBox) {
        mImgBox.classList.add('is-scrollable');
    }
    if (mTitle) mTitle.innerText = title ? title : '[PROJECT_NAME]';

    // 3. Set Content based on Type
    if (type === 'commercial') {
        const requirements = card.getAttribute('data-requirements');
        const process = card.getAttribute('data-process');
        const review = card.getAttribute('data-review');

        const formatText = (text) => text ? text.replace(/<br\s*\/?>/gi, '<span class="modal-text-spacer"></span>') : '';

        // Clear previous data
        if (mLabel1) mLabel1.innerHTML = "";
        if (mData1) mData1.innerHTML = "";
        if (mLabel2) mLabel2.innerHTML = "";
        if (mData2) mData2.innerHTML = "";
        if (mLabel3) mLabel3.innerHTML = "";
        if (mData3) mData3.innerHTML = "";

        if (mLabel1) mLabel1.innerHTML = "<span class='ins-tag'>::</span> 클라이언트 요구사항 <span class='header-sub-en'>CLIENT REQUIREMENTS</span>";
        if (mData1) mData1.innerHTML = requirements ? formatText(requirements) : 'No requirements data.';

        if (mLabel2) mLabel2.innerHTML = "<span class='ins-tag'>::</span> 작업 과정 <span class='header-sub-en'>WORK PROCESS</span>";
        if (mData2) mData2.innerHTML = process ? formatText(process) : 'No process data.';

        if (mLabel3) mLabel3.innerHTML = "<span class='ins-tag'>::</span> 클라이언트 리뷰 <span class='header-sub-en'>CLIENT REVIEW</span>";
        if (mData3) mData3.innerHTML = review ? formatText(review) : 'No review data.';

        if (mGroup3) mGroup3.style.display = 'block';
    } else {
        // Default / General (Banner, Poster, Detail)
        const tools = card.getAttribute('data-tools');
        const desc = card.getAttribute('data-desc');

        const formatText = (text) => text ? text.replace(/<br\s*\/?>/gi, '<span class="modal-text-spacer"></span>') : '';

        mLabel1.innerHTML = "<span class='ins-tag'>::</span> 사용 툴 <span class='header-sub-en'>TOOLS USED</span>";
        mData1.innerHTML = tools ? formatText(tools) : 'No tools specified.';

        mLabel2.innerHTML = "<span class='ins-tag'>::</span> 프로젝트 설명 <span class='header-sub-en'>PROJECT DESCRIPTION</span>";
        mData2.innerHTML = desc ? formatText(desc) : 'No description available.';

        if (mGroup3) mGroup3.style.display = 'none';
    }

    // 4. Show Modal
    modal.classList.add('active');
}

function closeGraphicModal() {
    const modal = document.getElementById('graphic-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('graphic-modal');
    if (e.target === modal) {
        closeGraphicModal();
    }
});

/* =========================================
   [ADD] ABOUT ME ENTRY ANIMATION LOGIC
   ========================================= */
let aboutMeTriggered = false;

function triggerAboutMeReveal() {
    if (aboutMeTriggered) return;
    aboutMeTriggered = true;

    // Ordered selection: PROFILE, STATISTICS, TOOL SET, EXPERIENCE
    // Select based on class names
    const panels = [
        document.querySelector('.panel-tl'), // Profile
        document.querySelector('.panel-tr'), // Statistics
        document.querySelector('.panel-bl'), // Tool Set
        document.querySelector('.panel-br')  // Experience
    ];

    panels.forEach((panel, index) => {
        if (!panel) return;

        setTimeout(() => {
            // 1. Reveal Panel
            panel.classList.add('reveal-active');

            // 2. Trigger Title Flash
            const label = panel.querySelector('.panel-label');
            if (label) {
                // Short delay to sync flash with the end of the float-up
                setTimeout(() => {
                    label.classList.add('title-flash');
                }, 250);
            }
        }, index * 150); // 0.15s Stagger
    });
}

/* =========================================
   [ADD] DEV LOG SEQUENCE ANIMATION LOGIC
   ========================================= */
let devLogTriggered = false;

function generateMosaicGrid() {
    const grid = document.getElementById('mosaic-grid');
    if (!grid) return;

    // Clear existing
    grid.innerHTML = '';

    // Create 100 tiles (10x10)
    for (let i = 0; i < 100; i++) {
        const tile = document.createElement('div');
        tile.classList.add('mosaic-tile');
        grid.appendChild(tile);
    }
}

function triggerDevLogSequence() {
    if (devLogTriggered) return;
    devLogTriggered = true;

    const warning = document.getElementById('dev-log-warning');
    const visualPane = document.getElementById('visual-pane');
    const terminalPane = document.getElementById('terminal-pane');

    // Hide Warning immediately
    if (warning) warning.style.display = 'none';

    // Reveal Panes immediately
    if (visualPane) visualPane.style.opacity = '1';
    if (terminalPane) terminalPane.style.opacity = '1';

    // Start Typewriter and Carousel immediately
    window.dispatchEvent(new Event('startTypewriter'));
    startImageCarousel();
}

// Image Carousel Logic
let carouselInterval = null;

function startImageCarousel() {
    const images = [
        { src: 'images/1.png', caption: 'MAIN PAGE - ENTRY POINT' },
        { src: 'images/2.png', caption: 'WEB DESIGN - PROJECT SHOWCASE' },
        { src: 'images/3.png', caption: 'TEAM PROJECT - COLLABORATION' },
        { src: 'images/4.png', caption: 'GRAPHIC DESIGN - VISUAL ARCHIVE' },
        { src: 'images/5.png', caption: 'DETAIL PAGE - CONTENT VIEW' },
        { src: 'images/6.png', caption: 'SYSTEM DEV LOG - META PAGE' }
    ];

    let currentImageIndex = 0;
    const imgElement = document.getElementById('carousel-img');
    const captionElement = document.getElementById('visual-caption');
    const mosaicGrid = document.getElementById('mosaic-grid');

    if (!imgElement || !captionElement || !mosaicGrid) return;

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const imageData = images[currentImageIndex];

        // Regenerate mosaic grid
        generateMosaicGrid();
        const tiles = document.querySelectorAll('.mosaic-tile');

        // Change image immediately (hidden under mosaic)
        imgElement.src = imageData.src;
        captionElement.textContent = `> LOADING PAGE [${currentImageIndex + 1}/6] - ${imageData.caption}`;

        // Reveal with mosaic effect (faster for carousel transitions)
        const indices = Array.from({ length: 100 }, (_, i) => i);
        indices.forEach((tileIndex, i) => {
            setTimeout(() => {
                if (tiles[tileIndex]) tiles[tileIndex].style.opacity = '0';
            }, i * 8); // Faster: 8ms per tile -> 0.8s total
        });
    }

    // Start carousel after 2.5 seconds
    setTimeout(() => {
        carouselInterval = setInterval(changeImage, 2500); // Change every 2.5s
    }, 2500);
}

/* =========================================
   [ADD] NEXT_FILE BUTTON ACTIVATION EFFECT
   ========================================= */
let nextFileActivated = false;

function triggerNextFileActivation() {
    if (nextFileActivated) return; // Run only once per page load
    nextFileActivated = true;

    const nextBtn = document.getElementById('next-file-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const mobileBtn = Array.from(tabButtons).find(btn => btn.textContent.includes('MOBILE_MODE'));

    // Trigger activation effect on NEXT_FILE button
    if (nextBtn) {
        setTimeout(() => {
            nextBtn.classList.add('system-activated');

            // Remove class after animation completes (3 blinks × 2s = 6s)
            setTimeout(() => {
                nextBtn.classList.remove('system-activated');
            }, 7000);
        }, 500);
    }

    // Trigger activation effect on MOBILE_MODE button
    if (mobileBtn) {
        setTimeout(() => {
            mobileBtn.classList.add('system-activated');

            // Remove class after animation completes
            setTimeout(() => {
                mobileBtn.classList.remove('system-activated');
            }, 7000);
        }, 500);
    }
}

/* =========================================
   [SCROLL PROPAGATION FIX]
   내부 스크롤이 있는 영역에서 끝까지 도달했을 때만 
   fullPage.js의 섹션 이동이 작동하도록 제어
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // 제어할 컨테이너 목록
    const scrollContainers = [
        '.graphic-archive-wrapper',
        '.terminal-content'
    ];

    scrollContainers.forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;

        let lastWheelTime = 0;
        const throttleTime = 500; // 스크롤이 너무 빠르게 연달아 호출되는 것 방지

        container.addEventListener('wheel', (e) => {
            const delta = e.deltaY;
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;

            const now = Date.now();

            // 1. 위로 스크롤할 때: 이미 맨 위거나 내부 스크롤이 불필요한 경우 이전 섹션으로 이동
            if (delta < 0 && (scrollTop <= 0 || scrollHeight <= clientHeight)) {
                if (now - lastWheelTime > throttleTime) {
                    if (window.fullpage_api) fullpage_api.moveSectionUp();
                    lastWheelTime = now;
                }
            }
            // 2. 아래로 스크롤할 때: 이미 맨 아래거나 내부 스크롤이 불필요한 경우 다음 섹션으로 이동
            else if (delta > 0 && (scrollTop + clientHeight >= scrollHeight - 1 || scrollHeight <= clientHeight)) {
                if (now - lastWheelTime > throttleTime) {
                    if (window.fullpage_api) fullpage_api.moveSectionDown();
                    lastWheelTime = now;
                }
            }
            // 그 외에는 내부 스크롤을 수행 (normalScrollElements에 등록되어 있으므로 전파 중단은 선택사항)
            else {
                e.stopPropagation();
            }
        }, { passive: false });
    });
});


const avatar = document.querySelector('.avatar-center-stage .holo-avatar-img');

function setAvatar(src) {
  avatar.src = src;
}

function resetAvatar() {
  avatar.src = 'images/profile2.png';
}

// panel-tr
document.querySelectorAll('.panel-tr').forEach(el => {
  el.addEventListener('mouseover', () => setAvatar('images/profile3.png'));
  el.addEventListener('mouseout', resetAvatar);
});

// panel-br
document.querySelectorAll('.panel-br').forEach(el => {
  el.addEventListener('mouseover', () => setAvatar('images/profile4.png'));
  el.addEventListener('mouseout', resetAvatar);
});

// panel-tl
document.querySelectorAll('.panel-tl').forEach(el => {
  el.addEventListener('mouseover', () => setAvatar('images/profile5.png'));
  el.addEventListener('mouseout', resetAvatar);
});

// panel-tb
document.querySelectorAll('.panel-bl').forEach(el => {
  el.addEventListener('mouseover', () => setAvatar('images/profile6.png'));
  el.addEventListener('mouseout', resetAvatar);
});