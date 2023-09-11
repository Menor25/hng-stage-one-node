const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/api', (req, res) => {
  // Retrieve query parameters
  const { slack_name, track } = req.query;

  // VSet current UTC time within +/-2 minutes
  const currentUtcTime = new Date();
  currentUtcTime.setMinutes(currentUtcTime.getMinutes() + Math.floor(Math.random() * 5) - 2); // Randomize within +/-2 minutes

  // GitHub URLs
  const githubFileUrl = 'https://github.com/username/repo/blob/main/file_name.ext';
  const githubRepoUrl = 'https://github.com/username/repo';

  // Prepare the response data
  const data = {
    slack_name,
    current_day: new Date().toLocaleDateString('en-US', { weekday: 'long' }), // Full day name
    utc_time: currentUtcTime.toISOString(),
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