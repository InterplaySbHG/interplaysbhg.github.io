document.addEventListener("DOMContentLoaded", function () {
    // Fetch the editions data from the JSON file
    fetch('editions.json')
        .then(response => response.json())
        .then(data => {
            const editionsList = document.getElementById('editions-list');

            // Group editions by year
            const groupedByYear = {};

            data.editions.forEach(edition => {
                const year = edition.date.split('/')[0];
                if (!groupedByYear[year]) {
                    groupedByYear[year] = [];
                }
                groupedByYear[year].push(edition);
            });

            // Reverse the years to show most recent first
            const sortedYears = Object.keys(groupedByYear).reverse();

            sortedYears.forEach(year => {
                const yearSection = document.createElement('section');
                const yearTitle = document.createElement('h2');
                yearTitle.textContent = `${year}`;
                yearSection.appendChild(yearTitle);

                const yearList = document.createElement('div'); // Change <ul> to <div>
                groupedByYear[year].forEach(edition => {
                    const editionItem = document.createElement('div'); // Change <li> to <div>
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
                    yearList.appendChild(editionItem);
                });

                yearSection.appendChild(yearList);
                editionsList.appendChild(yearSection);
            });
        })
        .catch(error => {
            console.error('Error loading editions:', error);
        });
});
