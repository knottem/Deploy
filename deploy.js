const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(express.json());


app.post('/deploy', (req, res) => {
    const repos = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const { repository } = req.body;
    const repoName = repository.name;

    const repoConfig = repos.find(r => r.repo === repoName);

    if (repoConfig) {
        console.log(`Deploying ${repoName}...`);
        console.log(`Running ${repoConfig.sh}`);
        const { sh } = repoConfig;
        const { exec } = require('child_process');
        exec(sh, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err });
            }
            if (stderr) {
                console.error(stderr);
                return res.status(500).json({ error: stderr });
            }
            console.log(stdout.trim());
        });
        return res.status(200).json({ message: 'Deploying: ' + repoName});
    } else {
        console.log(`Repository ${repoName} not found in config.json`);
        return res.status(404).json({ error: 'Repository not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});