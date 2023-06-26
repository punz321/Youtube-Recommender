// Get references to the form, input field, and results container
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

// Add an event listener for the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const query = input.value; // Get the user's search query

  // Make an API request to your backend
  fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query }) // Send the query in the request body
  })
  .then(response => response.json())
  .then(data => {
    // Process the API response here
    displayResults(data); // Call a function to display the video results
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Function to display the video results
function displayResults(data) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Loop through the video data and generate HTML dynamically
  data.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">
        <img src="${video.thumbnail}" alt="${video.title}">
        <h2>${video.title}</h2>
      </a>
      <p>${video.description}</p>
    `;
    resultsContainer.appendChild(videoElement);
  });
}
