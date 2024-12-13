document.addEventListener('DOMContentLoaded', function() {
    const ratingInput = document.getElementById('rating');
    const ratingErrorElement = document.getElementById('ratingError');
    const npsCategoryElement = document.getElementById('npsCategory');
    const reviewForm = document.getElementById('reviewForm');
    const productIdInput = document.getElementById('productId');
    const reviewInput = document.getElementById('review');

    // Rating Input Validation
    ratingInput.addEventListener('input', function() {
        const rating = this.value;
        
        // Check if input contains only digits
        if (!/^\d+$/.test(rating)) {
            ratingErrorElement.textContent = 'Please enter only numeric digits';
            return;
        }
        
        // Check rating range
        const numRating = parseInt(rating);
        if (numRating < 1 || numRating > 10) {
            ratingErrorElement.textContent = 'Rating must be between 1 and 10';
            return;
        }
        
        // Clear error if valid
        ratingErrorElement.textContent = '';
        
        // NPS Category Indication
        let npsCategory = '';
        let npsCategoryColor = '';
        
        if (numRating >= 1 && numRating <= 6) {
            npsCategory = 'Detractor';
            npsCategoryColor = 'red';
        } else if (numRating >= 7 && numRating <= 8) {
            npsCategory = 'Passive';
            npsCategoryColor = 'orange';
        } else if (numRating >= 9 && numRating <= 10) {
            npsCategory = 'Promoter';
            npsCategoryColor = 'green';
        }
        
        npsCategoryElement.textContent = `NPS Category: ${npsCategory}`;
        npsCategoryElement.style.color = npsCategoryColor;
    });

    // Form Submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = productIdInput.value;
        const rating = ratingInput.value;
        const review = reviewInput.value;
        
        // Validate inputs
        if (!productId) {
            alert('Please select a Product ID');
            return;
        }
        
        if (!rating) {
            ratingErrorElement.textContent = 'Please enter a rating';
            return;
        }
        
        const numRating = parseInt(rating);
        if (numRating < 1 || numRating > 10 || !/^\d+$/.test(rating)) {
            ratingErrorElement.textContent = 'Rating must be a number between 1 and 10';
            return;
        }
        
        if (!review) {
            alert('Please provide a review');
            return;
        }
        
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyulHeDXq5NQVPaJrZu4qUy45Nm2vBmWLKu156uwnn-QJiADr85b_Y_9e3lfdR3ebYG/exec';
        
        // Send data to Google Apps Script
        fetch(scriptURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                rating: rating,
                review: review
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you for your review!');
            reviewForm.reset();
            npsCategoryElement.textContent = '';
        })
        .catch(error => {
            alert('Error submitting review. Please try again.');
            console.error('Error:', error);
        });
    });
});