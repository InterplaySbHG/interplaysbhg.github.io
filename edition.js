document.addEventListener("DOMContentLoaded", function () {
    // Get the edition ID from the URL (e.g., "edition1")
    const urlParams = new URLSearchParams(window.location.search);
    const editionId = urlParams.get('edition');

    // Fetch editions data from JSON
    fetch('editions.json')
        .then(response => response.json())
        .then(data => {
            // Find the edition that matches the ID from the URL
            const edition = data.editions.find(e => e.id === editionId);

            if (edition) {
                // Populate the page with the edition data
                document.getElementById('edition-title').textContent = edition.title;
                document.getElementById('edition-date').textContent = `Date: ${edition.date}`;
                document.getElementById('edition-location').textContent = `Location: ${edition.location}`;
                document.getElementById('edition-poster').src = edition.poster;

                // Add organizers
                const organizersList = document.getElementById('edition-organizers');
                edition.organizers.forEach(organizer => {
                    const li = document.createElement('li');
                    li.textContent = `${organizer.name} (${organizer.affiliation})`;
                    organizersList.appendChild(li);
                });

                // Add talks
                const talksList = document.getElementById('talk-list');
                edition.talks.forEach(talk => {
                    const talkItem = document.createElement('li');
                    talkItem.textContent = `${talk.speaker} - ${talk.topic}`;
                    talksList.appendChild(talkItem);
                });
                // Add PDF link for poster
                const pdfLink = document.createElement('a');
                pdfLink.href = edition.posterPdf;
                pdfLink.textContent = 'Download Poster (PDF)';
                pdfLink.target = "_blank";  // Open in a new tab
                document.getElementById('edition-poster-link').appendChild(pdfLink);

            } else {
                // Handle the case where the edition was not found
                document.getElementById('edition-title').textContent = "Edition not found";
            }
        })
        .catch(error => {
            console.error('Error loading edition data:', error);
        });
});
