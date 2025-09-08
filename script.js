async function loadProjects() {
  const response = await fetch('https://api.github.com/users/DylanTarwater/repos');
  const repos = await response.json();
  const list = document.getElementById('projects');
  repos
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .forEach((repo) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = repo.html_url;
      link.textContent = repo.name;
      li.appendChild(link);
      if (repo.description) {
        const p = document.createElement('p');
        p.textContent = repo.description;
        li.appendChild(p);
      }
      list.appendChild(li);
    });
}

loadProjects().catch((err) => {
  document.getElementById('projects').textContent = 'Failed to load projects.';
  console.error(err);
});
