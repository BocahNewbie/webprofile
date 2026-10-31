document.addEventListener('DOMContentLoaded', () => {
  // Render Hero
  document.getElementById('profile-title').textContent = CONFIG.profile.title;
  document.getElementById('profile-desc').textContent = CONFIG.profile.description;

  const projectsGrid = document.getElementById('projects-grid');
  
  // Elements Modal
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLinks = document.getElementById('modal-links');

  // Render Projects Grid
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
        <div class="project-tech">${techListHtml}</div>
      </div>
      <button class="btn-link open-modal-btn" data-id="${project.id}">Detail Project</button>
    `;

    projectsGrid.appendChild(card);
  });

  // Fungsi Buka Modal
  function openModal(projectId) {
    const project = CONFIG.projects.find(p => p.id === projectId);
    if (!project) return;

    modalTag.textContent = project.tag;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.fullDescription || project.description;

    // Render Tech Stack
    modalTech.innerHTML = project.techStack
      .map(tech => `<span class="tech-item">${tech}</span>`)
      .join('');

    // Render External Links
    modalLinks.innerHTML = project.links
      .map(link => `<a href="${link.url}" target="_blank" class="modal-btn-link">${link.label} &rarr;</a>`)
      .join('');

    modal.classList.add('active');
  }

  // Event Listener Klik Tombol Card
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-modal-btn')) {
      const projectId = e.target.getAttribute('data-id');
      openModal(projectId);
    }
  });

  // Tutup Modal
  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});
