document.addEventListener('DOMContentLoaded', function () {
    initDescriptionToggle();
});

function initDescriptionToggle() {
    const descGroups = document.querySelectorAll('.description-group');
    const globalPopup = document.getElementById('global-desc-popup');
    const globalPopupText = document.getElementById('global-desc-text');

    descGroups.forEach(group => {
        const btn = group.querySelector('.desc-plus-btn');
        const container = group.querySelector('.desc-container');
        const shortView = group.querySelector('.short-view');

        if (!btn || !container || !shortView) return;

        // Force button visible initially based on user request
        btn.classList.add('visible');

        // Click Event on button
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent document click from closing immediately

            const isActive = group.classList.contains('active');

            // Close all groups and global popup first
            closeAllPopups(descGroups, globalPopup);

            if (!isActive && globalPopup) {
                // Open this group and the global popup
                group.classList.add('active');
                btn.textContent = '-';

                // Copy text from short-view to the global popup dynamically
                // We use replace to convert <br> to spaces for the full view if desired,
                // But the user already has it cleanly formatted without <br> in the original full view.
                // For simplicity we just use innerText to strip HTML or keep innerHTML.
                // Assuming we want to maintain the specific text content:
                // globalPopupText.innerHTML = shortView.innerHTML; 
                // We will leave the HTML as defined in the DOM, or update it via script/data attributes if needed.
                // Since there is only one project description hardcoded right now in index.html, we just show it.

                globalPopup.classList.add('active');
            }
        });
    });

    // Close when clicking outside of any description group or the popup itself
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.description-group') && !e.target.closest('.desc-popup')) {
            closeAllPopups(descGroups, globalPopup);
        }
    });
}

function closeAllPopups(groups, globalPopup) {
    groups.forEach(group => {
        group.classList.remove('active');
        const activeBtn = group.querySelector('.desc-plus-btn');
        if (activeBtn) activeBtn.textContent = '+';
    });

    if (globalPopup) {
        globalPopup.classList.remove('active');
    }
}
