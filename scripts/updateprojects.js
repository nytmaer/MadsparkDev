// scripts/updateProjects.js
import fs from "fs";

const username = "nytmaer";

async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
  const data = await res.json();

  return data
    .filter(repo => !repo.fork)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      updated: repo.updated_at,
    }));
}

async function main() {
  const repos = await fetchRepos();

  fs.writeFileSync("data/projects.json", JSON.stringify(repos, null, 2));
  console.log("Projects updated.");
}

main();
