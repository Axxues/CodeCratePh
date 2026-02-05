/* =========================================
   1. Global Theme & Navigation Logic
   ========================================= */

// Initialize Theme (Run immediately)
if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
        } else {
            menu.classList.add('hidden');
        }
    }
}

/* =========================================
   2. Catalog Page Logic (Filters & Sorting)
   ========================================= */

function toggleFilters() {
    const content = document.getElementById('filterContent');
    const arrow = document.getElementById('filterArrow');
    if (content && arrow) {
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }
}

function toggleSort() {
    const menu = document.getElementById('sortMenu');
    const arrow = document.getElementById('sortArrow');
    if (menu && arrow) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
            arrow.classList.add('rotate-180');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
            arrow.classList.remove('rotate-180');
        }
    }
}

function selectSort(element, value) {
    const sortValueInput = document.getElementById('sortValue');
    const sortText = document.getElementById('sortText');
    
    if (sortValueInput && sortText) {
        sortValueInput.value = value;
        sortText.innerText = value;

        // Reset all options
        const options = document.querySelectorAll('.sort-option');
        options.forEach(opt => {
            opt.classList.remove('text-blue-600', 'font-bold', 'bg-blue-50', 'dark:bg-slate-800/80');
            opt.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:bg-blue-50', 'dark:hover:bg-slate-800');
            const checkIcon = opt.querySelector('.fa-check');
            if (checkIcon) checkIcon.classList.add('hidden');
        });

        // Highlight selected
        element.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-blue-50', 'dark:hover:bg-slate-800');
        element.classList.add('text-blue-600', 'font-bold', 'bg-blue-50', 'dark:bg-slate-800/80');
        const activeCheck = element.querySelector('.fa-check');
        if (activeCheck) activeCheck.classList.remove('hidden');

        toggleSort();
    }
}

/* =========================================
   3. Contact Page Logic (Custom Dropdown)
   ========================================= */

function toggleSelect() {
    const menu = document.getElementById('selectMenu');
    const arrow = document.getElementById('selectArrow');
    if (menu && arrow) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
            arrow.classList.add('rotate-180');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
            arrow.classList.remove('rotate-180');
        }
    }
}

function selectOption(event, value) {
    event.stopPropagation();
    
    const subjectInput = document.getElementById('selectedSubject');
    const textElement = document.getElementById('selectText');
    
    if (subjectInput && textElement) {
        subjectInput.value = value;
        textElement.innerText = value;
        textElement.classList.remove('opacity-70');
        textElement.classList.add('font-bold', 'text-blue-600', 'dark:text-white');

        document.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('bg-blue-50', 'dark:bg-slate-800');
        });
        event.currentTarget.classList.add('bg-blue-50', 'dark:bg-slate-800');

        toggleSelect();
        const trigger = document.getElementById('selectTrigger');
        if (trigger) trigger.focus();
    }
}

/* =========================================
   4. Interaction Logic (Likes/Buttons)
   ========================================= */

function toggleLike(btn) {
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    
    if (icon && span) {
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'text-red-500', 'animate-pop');
            btn.classList.add('text-red-500');
            span.innerText = "Helpful (1)";
        } else {
            icon.classList.remove('fas', 'text-red-500', 'animate-pop');
            icon.classList.add('far');
            btn.classList.remove('text-red-500');
            span.innerText = "Helpful?";
        }
    }
}

/* =========================================
   5. Form Validation & Auth Logic
   ========================================= */

function showError() {
    const errorBox = document.getElementById('error-message');
    if (errorBox) {
        errorBox.classList.remove('hidden');
        errorBox.classList.remove('animate-shake');
        void errorBox.offsetWidth; // Trigger reflow to restart animation
        errorBox.classList.add('animate-shake');
    }
}

function validateForm() {
    const fields = ['fname', 'lname', 'email', 'pass'];
    let hasError = false;

    // Reset errors
    document.querySelectorAll('[id^="error-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input').forEach(el => el.classList.remove('border-red-500', 'animate-shake'));

    // Check Inputs
    fields.forEach(id => {
        const input = document.getElementById(`input-${id}`);
        const error = document.getElementById(`error-${id}`);
        if (input && error) {
            if (!input.value.trim()) {
                error.classList.remove('hidden');
                input.classList.add('border-red-500', 'animate-shake');
                hasError = true;
            }
        }
    });

    // Check Terms Checkbox
    const terms = document.getElementById('input-terms');
    const termsError = document.getElementById('error-terms');
    if (terms && termsError) {
        if (!terms.checked) {
            termsError.classList.remove('hidden');
            hasError = true;
        }
    }

    if (!hasError) {
        alert('Registration Successful (Demo)');
    }
}

/* =========================================
   6. Global Event Listeners (Closing Dropdowns)
   ========================================= */

window.onclick = function(event) {
    // Close Catalog Sort Menu
    const sortTrigger = document.getElementById('sortTrigger');
    const sortMenu = document.getElementById('sortMenu');
    if (sortTrigger && sortMenu) {
        if (!sortTrigger.contains(event.target) && !sortMenu.classList.contains('hidden')) {
            toggleSort();
        }
    }

    // Close Contact Select Menu
    const selectTrigger = document.getElementById('selectTrigger');
    const selectMenu = document.getElementById('selectMenu');
    if (selectTrigger && selectMenu) {
        if (!selectTrigger.contains(event.target) && !selectMenu.classList.contains('hidden')) {
            toggleSelect();
        }
    }
}

/* =========================================
   7. Logged In Profile Menu Logic
   ========================================= */

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    const arrow = document.getElementById('profileArrow');
    
    if (menu && arrow) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
            arrow.classList.add('rotate-180');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
            arrow.classList.remove('rotate-180');
        }
    }
}

// Update the global window.onclick to include closing the profile menu
const existingWindowOnClick = window.onclick;

window.onclick = function(event) {
    // Call existing listeners if they exist
    if (typeof existingWindowOnClick === 'function') {
        existingWindowOnClick(event);
    }

    // Close Profile Menu
    const profileTrigger = document.getElementById('profileTrigger');
    const profileMenu = document.getElementById('profileMenu');
    if (profileTrigger && profileMenu) {
        // If click is NOT on the trigger and NOT on the menu itself
        if (!profileTrigger.contains(event.target) && !profileMenu.contains(event.target) && !profileMenu.classList.contains('hidden')) {
            toggleProfileMenu();
        }
    }
}

/* =========================================
   8. Notification Menu Logic
   ========================================= */

function toggleNotificationMenu() {
    const menu = document.getElementById('notifMenu');
    
    // Close Profile menu if open (prevent overlapping)
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu && !profileMenu.classList.contains('hidden')) {
        profileMenu.classList.add('hidden');
        document.getElementById('profileArrow')?.classList.remove('rotate-180');
    }

    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
        }
    }
}

// --- NEW: Mobile Notification Toggle ---
function toggleMobileNotif() {
    const menu = document.getElementById('mobileNotifMenu');
    // Close other menus to avoid overlap
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }

    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
        }
    }
}

// --- UPDATED: Global Click Listener ---
window.onclick = function(event) {
    // 1. Desktop Notification
    const notifTrigger = document.getElementById('notifTrigger');
    const notifMenu = document.getElementById('notifMenu');
    if (notifTrigger && notifMenu) {
        if (!notifTrigger.contains(event.target) && !notifMenu.contains(event.target) && !notifMenu.classList.contains('hidden')) {
            toggleNotificationMenu();
        }
    }

    // 2. Desktop Profile
    const profileTrigger = document.getElementById('profileTrigger');
    const profileMenu = document.getElementById('profileMenu');
    if (profileTrigger && profileMenu) {
        if (!profileTrigger.contains(event.target) && !profileMenu.contains(event.target) && !profileMenu.classList.contains('hidden')) {
            toggleProfileMenu();
        }
    }

    // 3. Mobile Notification (NEW)
    const mobileNotifTrigger = document.getElementById('mobileNotifTrigger');
    const mobileNotifMenu = document.getElementById('mobileNotifMenu');
    if (mobileNotifTrigger && mobileNotifMenu) {
        if (!mobileNotifTrigger.contains(event.target) && !mobileNotifMenu.contains(event.target) && !mobileNotifMenu.classList.contains('hidden')) {
            toggleMobileNotif();
        }
    }
}

