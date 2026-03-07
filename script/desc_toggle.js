
document.addEventListener('DOMContentLoaded', function () {
    initDescriptionToggle();
});

function initDescriptionToggle() {
    const descGroups = document.querySelectorAll('.description-group');

    descGroups.forEach(group => {
        const btn = group.querySelector('.desc-plus-btn');
        const container = group.querySelector('.desc-container');
        const shortView = group.querySelector('.short-view');

        if (!btn || !container || !shortView) return;

        // 1. Check if overflow is needed (Optional: auto-show + button if text is long)
        // For now, we force show it or rely on CSS. 
        // But to be smart, let's check height.
        // If content is longer than 3 lines (approx 4.8em with 1.6 line-height), show button.
        // Or simply always show it if the user wants. The user screenshot shows it visible.
        // Let's make sure it's visible.
        btn.classList.add('visible');

        // 2. Click Event
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent bubbling if needed

            const isActive = group.classList.contains('active');

            // Close all others
            document.querySelectorAll('.description-group.active').forEach(activeGroup => {
                activeGroup.classList.remove('active');
                const activeBtn = activeGroup.querySelector('.desc-plus-btn');
                if (activeBtn) activeBtn.textContent = '+';
            });

            if (!isActive) {
                group.classList.add('active');
                btn.textContent = '-'; // Change to minus
            } else {
                // If it was active, it's already closed by the loop above, 
                // but strictly:
                group.classList.remove('active');
                btn.textContent = '+';
            }
        });
    });

    // 3. Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.description-group')) {
            document.querySelectorAll('.description-group.active').forEach(activeGroup => {
                activeGroup.classList.remove('active');
                const activeBtn = activeGroup.querySelector('.desc-plus-btn');
                if (activeBtn) activeBtn.textContent = '+';
            });
        }
    });
}
