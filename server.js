const http = require('http');
const url = require('url');
const axios = require('axios');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const pathname = reqUrl.pathname;

  if (pathname === '/') {
    // Serve the HTML file
    fs.readFile('recommender.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/api/search') {
    // Handle the search request
    const query = reqUrl.query.q;

    // Call the searchVideos function
    searchVideos(query)
      .then((videos) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(videos));
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
  } else {
    // Handle invalid URLs
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to search videos using YouTube Data API
async function searchVideos(query) {
  const apiKey = 'your-youtube-api-key-here';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const videos = response.data.items;
    return videos;
  } catch (error) {
    console.log('An error occurred:', error.response.data.error.message);
    throw error;
  }
}
