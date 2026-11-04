const CONFIG = {
    profile: {
        title: "Selamat Datang di Rumah Bocah",
        subtitle: "DIGITAL SOLUTION PARTNER",
        description: "Seseorang yang berfokus membangun solusi digital interaktif. Saya melayani pembuatan undangan digital kustom (pernikahan, khitanan, & acara lainnya) yang tampilannya disesuaikan dengan keinginan kalian, sistem pendaftaran online untuk event & perlombaan tingkat menengah, serta sedang mengembangkan web game interaktif tanpa perlu instalasi."
    },
    projects: [
        {
            id: "game",
            tag: "Interactive Game",
            title: "Browser Web Game",
            description: "Game berbasis web interaktif yang masih perlu dikembangkan.",
            fullDescription: "Project game berbasis web interaktif dengan mekanik gameplay yang ringan dan responsif. Pengguna dapat langsung memainkan game tanpa perlu melakukan instalasi tambahan.",
            links: [
                { label: "Game Bertani", url: "/bertani" },
                { label: "Team Bocah Racing", url: "/racing" }
            ]
        },
        {
            id: "pendaftaran",
            tag: "Web Application",
            title: "Sistem Aplikasi Online",
            description: "Platform formulir digital terintegrasi.",
            fullDescription: "Sistem pendaftaran online dan lainnya yang berbasis web dirancang untuk memudahkan manajemen formulir registrasi dalam skala kecil.",
            links: [
                { label: "Buka Aplikasi Pendaftaran", url: "/pendaftaran" }
            ]
        },
        {
            id: "invitation",
            tag: "Digital Platform",
            title: "Undangan Digital",
            description: "Web undangan acara.",
            fullDescription: "Platform undangan digital untuk Wedding, Khitanan, Birthday Party atau undangan makan, memudahkan silaturahmi dengan saudara jauh, dengan fitur hitung mundur dan integrasi peta. Lalu untuk tampilan bisa di sesuaikan dengan yang kalian inginkan",
            links: [
                { label: "Wedding Natural", url: "/Natural?to=Warga+Indonesia" },
                { label: "Wedding Java Dinasty", url: "/Java?to=Warga+Indonesia" },
                { label: "Wedding Spesial", url: "/Spesial?to=Warga+Indonesia" },
                { label: "Wedding Merah", url: "/Merah?to=Warga+Indonesia" },
                { label: "Wedding Nuansa Langit", url: "/Langit?to=Warga+Indonesia" },
                { label: "Wedding Sunda", url: "/Sunda?to=Warga+Indonesia" },
                { label: "Wedding Ciamis", url: "/Ciamis?to=Warga+Indonesia" }
            ]
        }
    ]
};

// Data 10 Lagu Pilihan (Bisa diganti link MP3-nya sesuai keinginanmu)
const MUSIC_PLAYLIST = [
    { title: "Lofi Study Session", artist: "Bocah Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Chill Coding Vibe", artist: "Rumah Bocah", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Midnight Coffee", artist: "Siamar Sound", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Javanese Ambient", artist: "Traditional", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Sunset Roadventure", artist: "Touring Mix", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Morning Energy", artist: "Bocah Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Relaxing Rain", artist: "Nature Sounds", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Night Cyberpunk", artist: "Synthwave", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Happy Weekend", artist: "Akustik Santai", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Final Destination", artist: "Bocah Chill", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];
