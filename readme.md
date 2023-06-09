# My deploy node api

This is a script to deploy my projects to my server. It's a simple node api that takes in a post request with a json body containing the project name. It then runs a bash script that pulls the latest code from main and updates the website for example.

## How to use

1. Clone the repo
2. Create a config.json file in the root of the repo
with the following content for windows:
  ```json
  [
    {
        "repo": "test",
        "sh": "dir"
    }
  ]
  ```
  and the following content for linux:
  ```json
  [
    {
        "repo": "test",
        "sh": "ls"
    }
  ]
  ```
3. Run `npm install`
4. Run `npm start`
5. Send a post request to `localhost:8000/deploy` with a json body containing the repo name

  Here's an example of my config.json
  ```json
  [
    {
        "repo": "fakestore-cart",
        "sh": "cd /www/fakestore-cart && git pull"
    },
    {
        "repo": "test2",
        "sh": "cd /app/test2 && git pull && pm2 restart test2"
    }
  ]
  ```

## How to test locally

1. Clone the repo
2. create a config.json file in the root of the repo. The content should be the same as in the example above
3. Run `npm install` in the folder of the repo
4. Run `npm start`
5. Send a post request to `localhost:8000/deploy` with a json body containing the project name

Example PowerShell command: 
```powershell
Invoke-RestMethod -Uri http://localhost:8000/deploy -Method Post -ContentType 'application/json' -Body '{"repository": {"name": "test"}}'
```

Example Linux command:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"repository": {"name": "test"}}' http://localhost:8000/deploy
```

Example Github Action:
```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        run: |
          curl -X POST https://yourserver.com/deploy/ \
          -H 'Content-Type: application/json' \
          -d '{"repository": {"name": "test"}}'
```
## How to add a new project

1. Create a new repo in config.json
2. Create a new shell script in the config.json "sh" part


## Made by

[Erik Wallenius](https://github.com/knottem/)