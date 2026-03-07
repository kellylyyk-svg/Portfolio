
document.addEventListener('DOMContentLoaded', function () {
    initDescriptionToggle();
});

function initDescriptionToggle() {
    const descGroups = document.querySelectorAll('.description-group');

    descGroups.forEach(group => {
        const btn = group.querySelector('.desc-plus-btn');
        const popup = group.querySelector('.desc-popup');

        if (!btn || !popup) return;

        // Move popup to <body> so it's free from any overflow:hidden ancestor
        document.body.appendChild(popup);

        // Helper: position popup above the + button
        function positionPopup() {
            const btnRect = btn.getBoundingClientRect();
            const popupWidth = Math.min(380, window.innerWidth * 0.9);

            // Center popup horizontally over the button, keep inside viewport
            let left = btnRect.left + btnRect.width / 2 - popupWidth / 2;
            left = Math.max(10, Math.min(left, window.innerWidth - popupWidth - 10));

            // Place popup above the button
            const bottom = window.innerHeight - btnRect.top + 12;

            popup.style.width = popupWidth + 'px';
            popup.style.left = left + 'px';
            popup.style.bottom = bottom + 'px';
            popup.style.top = 'auto';
        }

        // Click Event
        btn.addEventListener('click', function (e) {
            e.stopPropagation();

            const isActive = group.classList.contains('active');

            // Close all others
            document.querySelectorAll('.description-group.active').forEach(activeGroup => {
                activeGroup.classList.remove('active');
                const activeBtn = activeGroup.querySelector('.desc-plus-btn');
                if (activeBtn) activeBtn.textContent = '+';
                const activePopup = activeGroup._popup;
                if (activePopup) {
                    activePopup.style.opacity = '';
                    activePopup.style.visibility = '';
                    activePopup.style.transform = '';
                    activePopup.style.pointerEvents = '';
                }
            });

            if (!isActive) {
                group.classList.add('active');
                group._popup = popup;
                btn.textContent = '-';
                positionPopup();
                popup.style.opacity = '1';
                popup.style.visibility = 'visible';
                popup.style.transform = 'translateY(0) scale(1)';
                popup.style.pointerEvents = 'auto';
            } else {
                group.classList.remove('active');
                btn.textContent = '+';
                popup.style.opacity = '';
                popup.style.visibility = '';
                popup.style.transform = '';
                popup.style.pointerEvents = '';
            }
        });
    });

    // Close when clicking outside any popup or desc-plus-btn
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.description-group') && !e.target.closest('.desc-popup')) {
            document.querySelectorAll('.description-group.active').forEach(activeGroup => {
                activeGroup.classList.remove('active');
                const activeBtn = activeGroup.querySelector('.desc-plus-btn');
                if (activeBtn) activeBtn.textContent = '+';
                const activePopup = activeGroup._popup;
                if (activePopup) {
                    activePopup.style.opacity = '';
                    activePopup.style.visibility = '';
                    activePopup.style.transform = '';
                    activePopup.style.pointerEvents = '';
                }
            });
        }
    });

    // Reposition on resize/scroll if any popup is open
    window.addEventListener('resize', repositionActive);
    window.addEventListener('scroll', repositionActive, true);

    function repositionActive() {
        document.querySelectorAll('.description-group.active').forEach(group => {
            const btn = group.querySelector('.desc-plus-btn');
            const popup = group._popup;
            if (btn && popup) {
                const btnRect = btn.getBoundingClientRect();
                const popupWidth = Math.min(380, window.innerWidth * 0.9);
                let left = btnRect.left + btnRect.width / 2 - popupWidth / 2;
                left = Math.max(10, Math.min(left, window.innerWidth - popupWidth - 10));
                const bottom = window.innerHeight - btnRect.top + 12;
                popup.style.width = popupWidth + 'px';
                popup.style.left = left + 'px';
                popup.style.bottom = bottom + 'px';
            }
        });
    }
}
