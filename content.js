let reloadInterval;

function clickButtonWhenVisible(buttonId) {
    const button = document.getElementById(buttonId);
    if (button && button.offsetParent !== null) {  // Check if the button is visible
        button.click();
        console.log(`Button with ID '${buttonId}' clicked!`);

        return true;  // Return true when button is clicked
    }
    return false;  // Return false if button is not found or not clicked
}

function checkButtons() {
    // First button to click on the current page
    const button1Clicked = clickButtonWhenVisible('synopsis-book-button');  // Replace with the first button's ID

    // If the first button is clicked and there's a navigation, check for the second button
    if (button1Clicked) {
        // Stop the reload once the first button is clicked
        clearInterval(reloadInterval);

        // Wait for the next page to load and observe for the second button
        const observer = new MutationObserver(() => {
            const listItems = document.querySelectorAll('li');
            const content = "Saturday Pass"; // The content you're looking for
            console.log(listItems);
            for(let i = 0; i<listItems.length; i++) {
                if (listItems[i].textContent.trim() === content) {
                    listItems[i].click();
                    break;
                }
            }
            const button2Clicked = clickButtonWhenVisible('booking-continue-button');  // Replace with the second button's ID

            if (button2Clicked) {
                console.log('Second button clicked, stopping observer.');
                observer.disconnect();  // Stop observing after the second button is clicked
            }
        });

        // Start observing the DOM for changes on the new page
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Reload the page every 7 seconds
reloadInterval = setInterval(() => {
    window.location.reload();
}, 7000);

// Continuously check for the buttons after page load
const observer = new MutationObserver(() => {
    checkButtons();  // Run the function to check for buttons
});

// Start observing the body for changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });
