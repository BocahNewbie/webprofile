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
                { label: "Wedding Pastel", url: "/Pastel?to=Warga+Indonesia" },
                { label: "Wedding Nuansa Langit", url: "/Langit?to=Warga+Indonesia" },
                { label: "Wedding Sunda", url: "/Sunda?to=Warga+Indonesia" },
                { label: "Wedding Ciamis", url: "/Ciamis?to=Warga+Indonesia" }
            ]
        }
    ]
};

// Data 10 Lagu Pilihan (Versi Cover dengan Informasi Terpisah)
const MUSIC_PLAYLIST = [
    {
        title: "Nanti Kita Seperti Ini",
        artist: "Batas Senja",
        cover: "Jeyma Monica",
        src: "nantikitasepertiini.mp3"
    },
    {
        title: "Bergema Sampai Selamanya",
        artist: "Nadhif Basalamah",
        cover: "Aini",
        src: "bergemasampaiselamanya.mp3"
    },
    {
        title: "Sesi Potret",
        artist: "eñau feat. Ari Lesmana",
        cover: "Thalita Ayudya",
        src: "sesipotret.mp3"
    },
    {
        title: "Bersamamu",
        artist: "Vierra",
        cover: "Sasa Tasia",
        src: "bersamamu.mp3"
    },
    {
        title: "Sempurna",
        artist: "Andra and The BackBone",
        cover: "PI7U",
        src: "sempurna.mp3"
    },
    {
        title: "Rabun Jauh",
        artist: "Bernadya",
        cover: "VONA",
        src: "rabunjauh.mp3"
    },
    {
        title: "Dunia Yang Nanti",
        artist: "Raim Laode",
        cover: "GRWtune",
        src: "duniayangnanti.mp3"
    },
    {
        title: "1000x",
        artist: "Gea Indrawari",
        cover: "Shaka Music",
        src: "1000x.mp3"
    },
    {
        title: "Jatuh Suka",
        artist: "Tulus",
        cover: "Tami Aulia",
        src: "jatuhsuka.mp3"
    },
    {
        title: "Kita Lewati Berdua",
        artist: "Overnight",
        cover: "Whykustik",
        src: "kitalewatiberdua.mp3"
    }
];
