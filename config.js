const CONFIG = {
  profile: {
    title: "Selamat Datang di Portofolio Saya",
    description: "Saya seorang pengembang web yang berfokus pada pembuatan aplikasi interaktif, platform pendaftaran digital, dan media undangan online modern."
  },
  projects: [
    {
      id: "game",
      tag: "Interactive Game",
      title: "Browser Web Game",
      description: "Game berbasis web interaktif yang dikembangkan menggunakan HTML5 Canvas dan JavaScript.",
      fullDescription: "Project game berbasis web interaktif dengan mekanik gameplay yang ringan dan responsif. Pengguna dapat langsung memainkan game tanpa perlu melakukan instalasi tambahan.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
      links: [
        { label: "Game Bertani", url: "/bertani" },
        { label: "Team Bocah Racing", url: "/racing" }
      ]
    },
    {
      id: "pendaftaran",
      tag: "Web Application",
      title: "Sistem Pendaftaran Online",
      description: "Platform formulir digital terintegrasi untuk mengelola registrasi peserta.",
      fullDescription: "Sistem pendaftaran online berbasis web yang dirancang untuk memudahkan manajemen formulir registrasi.",
      techStack: ["HTML/CSS", "JavaScript", "Google Apps Script"],
      links: [
        { label: "Buka Aplikasi Pendaftaran", url: "/pendaftaran" }
      ]
    },
    {
      id: "invitation",
      tag: "Digital Platform",
      title: "Undangan Digital Interaktif",
      description: "Web undangan acara dengan desain modern dan fitur interaktif.",
      fullDescription: "Platform undangan digital serbaguna yang menyajikan tampilan elegan dengan fitur hitung mundur dan integrasi peta.",
      techStack: ["HTML5", "CSS Glassmorphism", "JavaScript"],
      links: [
        { label: "Lihat Undangan", url: "/invitation" }
      ]
    }
  ]
};
