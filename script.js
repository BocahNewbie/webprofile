document.addEventListener('DOMContentLoaded', () => {
  // --- RENDER PROFILE & PROJECTS ---
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

  // --- MUSIC PLAYER & YOUTUBE STREAM LOGIC ---
  let currentTrackIndex = 0;
  let isPlaying = false;
  const audioElement = document.getElementById('audio-element');

  function initMusicPlayer() {
    const playlistContainer = document.getElementById('playlist-list');
    if (!playlistContainer) return;
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

  const toggleBtn = document.getElementById('player-toggle-btn');
  if (toggleBtn) toggleBtn.onclick = togglePlay;

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (typeof MUSIC_PLAYLIST === 'undefined') return;
      currentTrackIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
      playTrack(currentTrackIndex);
    };
  }

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (typeof MUSIC_PLAYLIST === 'undefined') return;
      currentTrackIndex = (currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
      playTrack(currentTrackIndex);
    };
  }

  audioElement.ontimeupdate = () => {
    if (audioElement.duration) {
      const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) progressBar.value = progressPercent;
      
      const currentTimeEl = document.getElementById('current-time');
      const durationEl = document.getElementById('duration');
      if (currentTimeEl) currentTimeEl.innerText = formatTime(audioElement.currentTime);
      if (durationEl) durationEl.innerText = formatTime(audioElement.duration);
    }
  };

  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.oninput = (e) => {
      const time = (e.target.value / 100) * audioElement.duration;
      audioElement.currentTime = time;
    };
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // --- KONTROL MODAL MUSIK & YOUTUBE (POP-UP INTERAKTIF) ---
  const musicModal = document.getElementById('music-modal');
  const playlistBtn = document.getElementById('playlist-btn');
  const youtubeCustomBtn = document.getElementById('youtube-custom-btn');
  const musicModalClose = document.getElementById('music-modal-close');

  function openMusicModal(tabTarget) {
    if (!musicModal) return;
    musicModal.classList.add('active');

    // Aktifkan tab yang sesuai (playlist-section atau youtube-section)
    document.querySelectorAll('.music-tabs .tab-btn').forEach(b => {
      if (b.getAttribute('data-target') === tabTarget) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    document.querySelectorAll('.music-tab-content').forEach(c => {
      if (c.id === tabTarget) {
        c.style.display = 'block';
      } else {
        c.style.display = 'none';
      }
    });
  }

  function closeMusicModal() {
    if (musicModal) musicModal.classList.remove('active');
  }

  if (playlistBtn) {
    playlistBtn.onclick = () => openMusicModal('playlist-section');
  }

  if (youtubeCustomBtn) {
    youtubeCustomBtn.onclick = () => openMusicModal('youtube-section');
  }

  if (musicModalClose) {
    musicModalClose.onclick = closeMusicModal;
  }

  if (musicModal) {
    musicModal.addEventListener('click', (e) => {
      if (e.target === musicModal) {
        closeMusicModal();
      }
    });
  }

  // Tab Switcher di dalam Modal Musik
  const tabButtons = document.querySelectorAll('.music-tabs .tab-btn');
  tabButtons.forEach(btn => {
    btn.onclick = (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.music-tab-content').forEach(c => c.style.display = 'none');
      
      e.target.classList.add('active');
      const targetId = e.target.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.style.display = 'block';
    };
  });

  // Fitur Custom YouTube Link
  const playYoutubeBtn = document.getElementById('play-youtube-btn');
  if (playYoutubeBtn) {
    playYoutubeBtn.onclick = () => {
      const urlInput = document.getElementById('youtube-url-input');
      if (!urlInput) return;
      const url = urlInput.value;
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      
      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        const container = document.getElementById('youtube-player-container');
        if (container) {
          container.innerHTML = `<iframe width="0" height="0" src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay"></iframe>`;
        }
        
        audioElement.pause(); // Jeda audio lokal
        const trackTitle = document.getElementById('track-title');
        const trackArtist = document.getElementById('track-artist');
        const iconPlay = document.getElementById('icon-play');
        const iconPause = document.getElementById('icon-pause');

        if (trackTitle) trackTitle.innerText = "Custom YouTube Audio";
        if (trackArtist) trackArtist.innerText = "Streaming dari Link";
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
        isPlaying = true;
        
        closeMusicModal();
      } else {
        alert("Link YouTube tidak valid! Pastikan format link benar.");
      }
    };
  }

  // Jalankan inisialisasi awal pemutar musik
  initMusicPlayer();
});
