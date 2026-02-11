// [ADD] Graphic Archive Modal Logic
function openGraphicModal(card) {
    const modal = document.getElementById('graphic-modal');
    if (!modal) return;

    // 1. Get Data from Card
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const process = card.getAttribute('data-process'); // Work Process

    // [MODIFIED] Check for multi-image data first
    const multiImages = card.getAttribute('data-images');
    const imgSrc = card.querySelector('img').src; // Default single image

    // 2. Set Data to Modal
    const mImgBox = document.querySelector('.modal-img-box'); // Container
    // Clear previous content
    mImgBox.innerHTML = '';

    if (multiImages) {
        // Handle multiple images
        const images = multiImages.split(',').map(s => s.trim());
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-multi-img-wrapper';
        wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 20px; width: 100%; height: 100%; overflow-y: auto; align-items: center;';

        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.cssText = 'max-width: 100%; display: block; box-shadow: 0 0 20px rgba(0,0,0,0.5);';
            wrapper.appendChild(img);
        });
        mImgBox.appendChild(wrapper);
    } else {
        // Fallback to single image
        const img = document.createElement('img');
        img.id = 'modal-img';
        img.src = imgSrc;
        img.style.cssText = 'max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);';
        mImgBox.appendChild(img);
    }

    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mProcess = document.getElementById('modal-process');

    if (mTitle) mTitle.innerText = title ? title : '[PROJECT_NAME]';
    if (mDesc) mDesc.innerText = desc ? desc : 'No description available.';
    if (mProcess) mProcess.innerText = process ? process : 'No process data.';

    // 3. Show Modal
    modal.classList.add('active');

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    // normalScrollElements 영역의 네이티브 스크롤도 차단
    var scrollArea = document.querySelector('.graphic-archive-wrapper');
    if (scrollArea) scrollArea.style.overflow = 'hidden';
    // Prevent fullpage.js section scrolling
    if (window.fullpage_api) {
        fullpage_api.setAllowScrolling(false);
        fullpage_api.setKeyboardScrolling(false);
    }
}

function closeGraphicModal() {
    const modal = document.getElementById('graphic-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    // Restore scrolling
    document.body.style.overflow = '';
    var scrollArea = document.querySelector('.graphic-archive-wrapper');
    if (scrollArea) scrollArea.style.overflow = '';
    if (window.fullpage_api) {
        fullpage_api.setAllowScrolling(true);
        fullpage_api.setKeyboardScrolling(true);
    }
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('graphic-modal');
    if (e.target === modal) {
        closeGraphicModal();
    }
});
