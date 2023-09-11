const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/api', (req, res) => {
  // Retrieve query parameters
  const { slack_name, track } = req.query;

  // Set current UTC time within +/-2 minutes
  const currentUtcTime = new Date();
  currentUtcTime =  `${currentUtcTime.getUTCFullYear()}-${String(currentUtcTime.getUTCMonth() + 1).padStart(2, '0')}-${String(currentUtcTime.getUTCDate()).padStart(2, '0')}T${String(currentUtcTime.getUTCHours()).padStart(2, '0')}:${String(currentUtcTime.getUTCMinutes()).padStart(2, '0')}:${String(currentUtcTime.getUTCSeconds()).padStart(2, '0')}Z`
  //currentUtcTime.setMinutes(currentUtcTime.getMinutes() + Math.floor(Math.random() * 5) - 2);

  // Formating the UTC time to the desired format
  const formattedUtcTime = currentUtcTime.toISOString().replace(/\.\d{3}Z$/, 'Z');
  // GitHub URLs
  const githubFileUrl = 'https://github.com/Menor25/hng-stage-one-node/blob/main/server.js';
  const githubRepoUrl = 'https://github.com/Menor25/hng-stage-one-node';

  // Prepare the response data
  const data = {
    slack_name,
    current_day: new Date().toLocaleDateString('en-US', { weekday: 'long' }), // Full day name
    utc_time: currentUtcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  // Return the response in JSON format
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
