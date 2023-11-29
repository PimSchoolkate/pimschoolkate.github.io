document.addEventListener("DOMContentLoaded", function() {
    var filterButtons = document.querySelectorAll('.filter-button');
    var allButton = document.querySelector('.all-btn'); // Replace '.all-button' with the correct class or ID for your "all" button

    // Initially select the "all" button
    if (allButton) {
        allButton.classList.add('selected');
    }

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            filterButtons.forEach(function(otherBtn) {
                otherBtn.classList.remove('selected');
            });

            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            var filterValue = this.getAttribute('data-filter');
            var cards = document.querySelectorAll('.col-md-4');
            cards.forEach(function(card) {
                if (filterValue == 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});