document.addEventListener('DOMContentLoaded', () => {
  // Render Hero Section
  document.getElementById('profile-title').textContent = CONFIG.profile.title;
  document.getElementById('profile-desc').textContent = CONFIG.profile.description;

  // Render Projects Grid
  const projectsGrid = document.getElementById('projects-grid');
  
  CONFIG.projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const techListHtml = project.techStack
      .map(tech => `<span class="tech-item">${tech}</span>`)
      .join('');

    card.innerHTML = `
      <div>
        <span class="project-tag">${project.tag}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${techListHtml}
        </div>
      </div>
      <a href="${project.link}" class="btn-link">Lihat Project</a>
    `;

    projectsGrid.appendChild(card);
  });
});
