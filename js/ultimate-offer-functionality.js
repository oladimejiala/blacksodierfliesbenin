/* JavaScript for Functionality */
document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        document.querySelectorAll('.countdown-timer').forEach(timer => {
            const endDate = new Date(timer.dataset.end).getTime(2025);
            const now = new Date().getTime();
            const distance = endDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            timer.querySelector('.days').textContent = days.toString().padStart(2, '0');
            timer.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            timer.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
            timer.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        });
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Expand/Collapse
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            btn.nextElementSibling.style.maxHeight = expanded ? '0' : `${btn.nextElementSibling.scrollHeight}px`;
        });
    });
});