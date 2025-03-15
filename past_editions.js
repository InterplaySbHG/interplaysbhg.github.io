document.addEventListener("DOMContentLoaded", function () {
    // Fetch the editions data from the JSON file
    fetch('editions.json')
        .then(response => response.json())
        .then(data => {
            // Get the container where the editions will be displayed
            const editionsList = document.getElementById('editions-list');

            // Loop through each edition and create a list item
            data.editions.forEach(edition => {
                const editionItem = document.createElement('li');
                
                editionItem.innerHTML = `
                    <h3><a href="edition.html?edition=${edition.id}">${edition.title}</a></h3>
                    <p>Date: ${edition.date}</p>
                    <p>Location: ${edition.location}</p>
                    <img src="${edition.poster}" alt="Poster for ${edition.title}" class="edition-poster">
                `;
                
                editionsList.appendChild(editionItem);
            });
        })
        .catch(error => {
            console.error('Error loading editions:', error);
        });
});
