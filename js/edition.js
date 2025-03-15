document.addEventListener("DOMContentLoaded", function () {
    // Get the edition ID from the URL (e.g., "edition1", "edition2")
    const urlParams = new URLSearchParams(window.location.search);
    const editionId = urlParams.get('edition'); // URL will look like edition1.html?edition=edition1

    // Fetch editions data from JSON
    fetch('editions.js')
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
                    li.textContent = organizer;
                    organizersList.appendChild(li);
                });

                // Add talks
                const talkList = document.getElementById('talk-list');
                edition.talks.forEach(talk => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${talk.title}</strong> by ${talk.speaker}<br><p>${talk.details}</p>`;
                    talkList.appendChild(li);
                });
            } else {
                // Handle the case where the edition was not found
                document.getElementById('edition-title').textContent = "Edition not found";
            }
        })
        .catch(error => {
            console.error('Error loading edition data:', error);
        });
});
