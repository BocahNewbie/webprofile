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

    if (modalClose) modalClose.addEventListener('click', () => modal.classList.remove('active'));
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  // --- MUSIC PLAYER & YOUTUBE PLAYER INTEGRATION ---
  let currentTrackIndex = 0;
  let isPlaying = false;
  let currentSource = 'audio'; // 'audio' atau 'youtube'
  let ytPlayer = null;
  let ytInterval = null;

  const audioElement = document.getElementById('audio-element');
  const progressBar = document.getElementById('progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');

  // Load YouTube IFrame Player API secara dinamis
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('youtube-player-container', {
      height: '0',
      width: '0',
      videoId: '',
      playerVars: {
        'playsinline': 1,
        'controls': 0
      },
      events: {
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  };

  function onPlayerStateChange(event) {
    if (currentSource !== 'youtube') return;

    // YT.PlayerState.BUFFERING = 3
    if (event.data === YT.PlayerState.BUFFERING) {
      trackTitle.innerHTML = `<span class="buffering-spinner"></span> Memuat YouTube...`;
      trackArtist.innerText = "Mengambil data stream...";
    }

    // YT.PlayerState.PLAYING = 1
    if (event.data === YT.PlayerState.PLAYING) {
      trackTitle.innerText = "Custom YouTube Audio";
      trackArtist.innerText = "Streaming dari Link";
      setPlayStateUI(true);
      startYTProgressTracking();
    }

    // YT.PlayerState.PAUSED = 2 atau ENDED = 0
    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
      setPlayStateUI(false);
      stopYTProgressTracking();
    }
  }

  function onPlayerError(e) {
    alert("Gagal memuat video YouTube. Pastikan link valid dan video tidak dibatasi/private.");
    trackTitle.innerText = "Pilih atau Masukkan Lagu";
    trackArtist.innerText = "Rumah Bocah Music";
    setPlayStateUI(false);
  }

  function setPlayStateUI(playing) {
    isPlaying = playing;
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    if (iconPlay && iconPause) {
      iconPlay.style.display = playing ? 'none' : 'block';
      iconPause.style.display = playing ? 'block' : 'none';
    }
  }

  function initMusicPlayer() {
    const playlistContainer = document.getElementById('playlist-list');
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    if (typeof MUSIC_PLAYLIST !== 'undefined') {
      MUSIC_PLAYLIST.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
          <div>
            <strong>${index + 1}. ${track.title}</strong> (Cover)<br>
            <small style="color: #94a3b8;">Asli: ${track.artist} | Cover oleh: ${track.cover}</small>
          </div>
          <span>▶</span>
        `;
        item.onclick = () => playTrackFromPlaylist(index);
        playlistContainer.appendChild(item);
      });

      loadTrack(currentTrackIndex);
    }
  }

  function loadTrack(index) {
    if (typeof MUSIC_PLAYLIST === 'undefined') return;
    currentTrackIndex = index;
    const track = MUSIC_PLAYLIST[index];
    
    audioElement.src = track.src;
    if (trackTitle) trackTitle.innerText = `${track.title} (Cover)`;
    if (trackArtist) trackArtist.innerText = `Asli: ${track.artist} • Cover: ${track.cover}`;
  }

  function loadTrack(index) {
    if (typeof MUSIC_PLAYLIST === 'undefined') return;
    currentTrackIndex = index;
    audioElement.src = MUSIC_PLAYLIST[index].src;
    if (trackTitle) trackTitle.innerText = MUSIC_PLAYLIST[index].title;
    if (trackArtist) trackArtist.innerText = MUSIC_PLAYLIST[index].artist;
  }

  function stopYoutubeIfActive() {
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
      ytPlayer.stopVideo();
    }
    stopYTProgressTracking();
  }

  function playTrackFromPlaylist(index) {
    currentSource = 'audio';
    stopYoutubeIfActive();

    loadTrack(index);
    audioElement.play().then(() => {
      setPlayStateUI(true);
    }).catch(e => console.log("Play error:", e));

    closeMusicModal();
  }

  function togglePlay() {
    if (currentSource === 'youtube' && ytPlayer) {
      const state = ytPlayer.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
      return;
    }

    // Audio Lokal
    if (isPlaying) {
      audioElement.pause();
      setPlayStateUI(false);
    } else {
      audioElement.play().then(() => {
        setPlayStateUI(true);
      }).catch(e => console.log("Audio play error:", e));
    }
  }

  const toggleBtn = document.getElementById('player-toggle-btn');
  if (toggleBtn) toggleBtn.onclick = togglePlay;

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (typeof MUSIC_PLAYLIST === 'undefined') return;
      currentTrackIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
      playTrackFromPlaylist(currentTrackIndex);
    };
  }

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (typeof MUSIC_PLAYLIST === 'undefined') return;
      currentTrackIndex = (currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
      playTrackFromPlaylist(currentTrackIndex);
    };
  }

  // --- PROGRESS BAR & WAKTU AUDIO LOKAL ---
  audioElement.addEventListener('loadedmetadata', () => {
    if (currentSource === 'audio' && durationEl) {
      durationEl.innerText = formatTime(audioElement.duration);
    }
  });

  audioElement.ontimeupdate = () => {
    if (currentSource !== 'audio') return;

    if (audioElement.duration && !isNaN(audioElement.duration)) {
      const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
      if (progressBar) progressBar.value = progressPercent;
      if (currentTimeEl) currentTimeEl.innerText = formatTime(audioElement.currentTime);
      if (durationEl) durationEl.innerText = formatTime(audioElement.duration);
    }
  };

  // --- PROGRESS BAR & WAKTU YOUTUBE ---
  function startYTProgressTracking() {
    stopYTProgressTracking();
    ytInterval = setInterval(() => {
      if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        const currentTime = ytPlayer.getCurrentTime() || 0;
        const duration = ytPlayer.getDuration() || 0;

        if (currentTimeEl) currentTimeEl.innerText = formatTime(currentTime);
        if (durationEl) durationEl.innerText = formatTime(duration);

        if (duration > 0 && progressBar) {
          progressBar.value = (currentTime / duration) * 100;
        }
      }
    }, 500);
  }

  function stopYTProgressTracking() {
    if (ytInterval) {
      clearInterval(ytInterval);
      ytInterval = null;
    }
  }

  // Handle Seek/Scrub pada Progress Bar
  if (progressBar) {
    progressBar.oninput = (e) => {
      const percent = e.target.value;

      if (currentSource === 'audio' && audioElement.duration) {
        audioElement.currentTime = (percent / 100) * audioElement.duration;
      } else if (currentSource === 'youtube' && ytPlayer && typeof ytPlayer.getDuration === 'function') {
        const totalDuration = ytPlayer.getDuration();
        if (totalDuration > 0) {
          const seekTime = (percent / 100) * totalDuration;
          ytPlayer.seekTo(seekTime, true);
        }
      }
    };
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // --- KONTROL MODAL MUSIK ---
  const musicModal = document.getElementById('music-modal');
  const playlistBtn = document.getElementById('playlist-btn');
  const youtubeCustomBtn = document.getElementById('youtube-custom-btn');
  const musicModalClose = document.getElementById('music-modal-close');

  function openMusicModal(tabTarget) {
    if (!musicModal) return;
    musicModal.classList.add('active');

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

  if (playlistBtn) playlistBtn.onclick = () => openMusicModal('playlist-section');
  if (youtubeCustomBtn) youtubeCustomBtn.onclick = () => openMusicModal('youtube-section');
  if (musicModalClose) musicModalClose.onclick = closeMusicModal;

  if (musicModal) {
    musicModal.addEventListener('click', (e) => {
      if (e.target === musicModal) closeMusicModal();
    });
  }

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

  // Ekstraksi Video ID YouTube
  function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Fitur Pemutaran YouTube via Player API
  const playYoutubeBtn = document.getElementById('play-youtube-btn');
  if (playYoutubeBtn) {
    playYoutubeBtn.onclick = () => {
      const urlInput = document.getElementById('youtube-url-input');
      if (!urlInput) return;
      const videoId = extractYoutubeId(urlInput.value.trim());

      if (videoId && ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
        currentSource = 'youtube';
        audioElement.pause();

        if (trackTitle) {
          trackTitle.innerHTML = `<span class="buffering-spinner"></span> Memuat YouTube...`;
        }
        if (trackArtist) {
          trackArtist.innerText = "Mengambil data stream...";
        }

        closeMusicModal();

        // Muat & Putar video YouTube menggunakan IFrame API resmi
        ytPlayer.loadVideoById(videoId);
      } else {
        alert("Link YouTube tidak valid! Pastikan format link benar (contoh: https://www.youtube.com/watch?v=xxxxxx).");
      }
    };
  }

  initMusicPlayer();
});
