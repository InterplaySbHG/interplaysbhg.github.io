document.addEventListener("DOMContentLoaded", function () {
    // Fetch the editions data from the JSON file
    fetch('editions.json')
        .then(response => response.json())
        .then(data => {
            // Get the container where the editions will be displayed
            const editionsList = document.getElementById('editions-list');

            // Hide bullet points by modifying style
            editionsList.style.listStyleType = 'none';
            editionsList.style.paddingLeft = '0';

            // Loop through each edition and create a list item
            data.editions.forEach(edition => {
                const editionItem = document.createElement('li');
                
                // Format organizers list with only names (no affiliation)
                const organizers = edition.organizers.map(organizer => organizer.name).join(', ');

                editionItem.innerHTML = `
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <img src="${edition.poster}" alt="Poster for ${edition.title}" class="edition-poster" style="width: 150px; height: auto; margin-right: 20px;">
                        <div>
                            <h3><a href="edition.html?edition=${edition.id}">${edition.title}</a></h3>
                            <p><strong>Date:</strong> ${edition.date}</p>
                            <p><strong>Location:</strong> ${edition.location}</p>
                            <p><strong>Organizers:</strong> ${organizers}</p>
                            <p><a href="${edition.posterPdf}" target="_blank">Download Poster (PDF)</a></p>
                        </div>
                    </div>
                `;
                
                editionsList.appendChild(editionItem);
            });
        })
        .catch(error => {
            console.error('Error loading editions:', error);
        });
});
