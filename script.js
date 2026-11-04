document.addEventListener('DOMContentLoaded', () => {
  // --- BAGIAN 1: RENDER PROFILE & PROJECTS ---
  if (typeof CONFIG !== 'undefined') {
    document.getElementById('profile-title').textContent = CONFIG.profile.title;
    document.getElementById('profile-subtitle').textContent = CONFIG.profile.subtitle;
    document.getElementById('profile-desc').textContent = CONFIG.profile.description;

    const projectsGrid = document.getElementById('projects-grid');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalLinks = document.getElementById('modal-links');

    CONFIG.projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';

      card.innerHTML = `
        <div>
          <span class="project-tag">${project.tag}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
        </div>
        <button class="btn-link open-modal-btn" data-id="${project.id}">Detail Project</button>
      `;

      projectsGrid.appendChild(card);
    });

    function openModal(projectId) {
      const project = CONFIG.projects.find(p => p.id === projectId);
      if (!project) return;

      modalTag.textContent = project.tag;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.fullDescription || project.description;

      modalLinks.innerHTML = project.links
        .map(link => `<a href="${link.url}" target="_blank" class="modal-btn-link">${link.label} &rarr;</a>`)
        .join('');

      modal.classList.add('active');
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('open-modal-btn')) {
        const projectId = e.target.getAttribute('data-id');
        openModal(projectId);
      }
    });

    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // --- BAGIAN 2: MUSIC PLAYER & YOUTUBE STREAM LOGIC ---
  let currentTrackIndex = 0;
  let isPlaying = false;
  const audioElement = document.getElementById('audio-element');

  function initMusicPlayer() {
    const playlistContainer = document.getElementById('playlist-list');
    playlistContainer.innerHTML = '';

    if (typeof MUSIC_PLAYLIST !== 'undefined') {
      MUSIC_PLAYLIST.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `<span>${index + 1}. ${track.title} - <small>${track.artist}</small></span> <span>▶</span>`;
        item.onclick = () => playTrack(index);
        playlistContainer.appendChild(item);
      });

      loadTrack(currentTrackIndex);
    }
  }

  function loadTrack(index) {
    if (typeof MUSIC_PLAYLIST === 'undefined') return;
    currentTrackIndex = index;
    audioElement.src = MUSIC_PLAYLIST[index].src;
    document.getElementById('track-title').innerText = MUSIC_PLAYLIST[index].title;
    document.getElementById('track-artist').innerText = MUSIC_PLAYLIST[index].artist;
  }

  function togglePlay() {
    if (isPlaying) {
      audioElement.pause();
      document.getElementById('icon-play').style.display = 'block';
      document.getElementById('icon-pause').style.display = 'none';
      isPlaying = false;
    } else {
      audioElement.play().then(() => {
        document.getElementById('icon-play').style.display = 'none';
        document.getElementById('icon-pause').style.display = 'block';
        isPlaying = true;
      }).catch(e => console.log("Audio play error:", e));
    }
  }

  function playTrack(index) {
    loadTrack(index);
    audioElement.play().then(() => {
      document.getElementById('icon-play').style.display = 'none';
      document.getElementById('icon-pause').style.display = 'block';
      isPlaying = true;
    }).catch(e => console.log("Play error:", e));
    closeMusicModal();
  }

  document.getElementById('player-toggle-btn').onclick = togglePlay;

  document.getElementById('next-btn').onclick = () => {
    if (typeof MUSIC_PLAYLIST === 'undefined') return;
    currentTrackIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
    playTrack(currentTrackIndex);
  };

  document.getElementById('prev-btn').onclick = () => {
    if (typeof MUSIC_PLAYLIST === 'undefined') return;
    currentTrackIndex = (currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    playTrack(currentTrackIndex);
  };

  audioElement.ontimeupdate = () => {
    if (audioElement.duration) {
      const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
      document.getElementById('progress-bar').value = progressPercent;
      
      document.getElementById('current-time').innerText = formatTime(audioElement.currentTime);
      document.getElementById('duration').innerText = formatTime(audioElement.duration);
    }
  };

  document.getElementById('progress-bar').oninput = (e) => {
    const time = (e.target.value / 100) * audioElement.duration;
    audioElement.currentTime = time;
  };

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Kontrol Modal Musik
  const musicModal = document.getElementById('music-modal');
  document.getElementById('playlist-btn').onclick = () => { musicModal.style.display = 'flex'; };
  document.getElementById('youtube-custom-btn').onclick = () => { musicModal.style.display = 'flex'; };
  document.getElementById('music-modal-close').onclick = () => { closeMusicModal(); };

  function closeMusicModal() {
    musicModal.style.display = 'none';
  }

  // Tutup modal jika klik di luar kotak konten modal
  musicModal.addEventListener('click', (e) => {
    if (e.target === musicModal) {
      closeMusicModal();
    }
  });

  // Tab Switcher di dalam Modal Musik (Playlist vs YouTube)
  document.querySelectorAll('.music-tabs .tab-btn').forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll('.music-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.music-tab-content').forEach(c => c.style.display = 'none');
      
      e.target.classList.add('active');
      const targetId = e.target.getAttribute('data-target');
      document.getElementById(targetId).style.display = 'block';
    };
  });

  // Fitur Custom YouTube Link
  document.getElementById('play-youtube-btn').onclick = () => {
    const url = document.getElementById('youtube-url-input').value;
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      const container = document.getElementById('youtube-player-container');
      container.innerHTML = `<iframe width="0" height="0" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay"></iframe>`;
      
      audioElement.pause(); // Jeda audio lokal jika sedang memutar lagu dari playlist
      document.getElementById('track-title').innerText = "Custom YouTube Audio";
      document.getElementById('track-artist').innerText = "Streaming dari Link";
      document.getElementById('icon-play').style.display = 'none';
      document.getElementById('icon-pause').style.display = 'block';
      isPlaying = true;
      
      closeMusicModal();
    } else {
      alert("Link YouTube tidak valid! Pastikan format link benar.");
    }
  };

  // Jalankan inisialisasi pemutar musik
  initMusicPlayer();
});
