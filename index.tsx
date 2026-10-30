import React, { useState, useEffect } from 'react';

// --- ICONS (SVG) ---
const Icons = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Guide: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>,
  Target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  Feather: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>,
  Layers: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>,
  Write: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  Gamepad: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>,
  MusicOn: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>,
  MusicOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
};

// --- AUDIO HELPERS ---
const playSfx = (type) => {
  const sounds = {
    correct: 'https://actions.google.com/sounds/v1/cartoon/xylophone_chime.ogg',
    wrong: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
    win: 'https://actions.google.com/sounds/v1/cartoon/magic_chime_scifi.ogg',
    click: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
    slide: 'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'
  };
  if (sounds[type]) {
    const audio = new Audio(sounds[type]);
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Audio play failed:", e));
  }
};

// --- MAIN COMPONENT ---
export default function MPIApp() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = React.useRef(null);

  // Injecting Custom Fonts & Animations for Pixar Style
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
      
      body {
        font-family: 'Nunito', sans-serif;
        background-color: #a29bfe;
        background-image: linear-gradient(180deg, #a29bfe 0%, #fd79a8 100%);
        min-height: 100vh;
        margin: 0;
      }
      
      .btn-3d {
        transition: all 0.15s ease;
        box-shadow: 0 6px 0 rgba(0,0,0,0.2);
      }
      .btn-3d:active {
        transform: translateY(4px);
        box-shadow: 0 2px 0 rgba(0,0,0,0.2);
      }
      
      .card-3d {
        box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 8px 0 rgba(0,0,0,0.1);
        border: 4px solid #fff;
      }

      .bounce-in {
        animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes bounceIn {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }

      .float-anim {
        animation: floatAnim 3s ease-in-out infinite;
      }
      
      @keyframes floatAnim {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      .clouds {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Icons.Home, color: 'bg-pink-500 border-pink-700' },
    { id: 'panduan', label: 'Panduan', icon: Icons.Guide, color: 'bg-orange-500 border-orange-700' },
    { id: 'tujuan', label: 'Tujuan', icon: Icons.Target, color: 'bg-yellow-500 border-yellow-700' },
    { id: 'puisi-baru', label: 'Puisi Baru', icon: Icons.Feather, color: 'bg-teal-500 border-teal-700' },
    { id: 'struktur', label: 'Struktur Puisi', icon: Icons.Layers, color: 'bg-blue-500 border-blue-700' },
    { id: 'menulis', label: 'Menulis Puisi', icon: Icons.Write, color: 'bg-purple-500 border-purple-700' },
    { id: 'bermain', label: 'Bermain Gim', icon: Icons.Gamepad, color: 'bg-red-500 border-red-700' }
  ];

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.4; // Mengatur volume BGM agar tidak menutupi efek suara (SFX)
      audioRef.current.play().catch(e => console.log("BGM play failed:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pb-10 z-10 relative">
      {/* Background Music Audio Element - Diganti dengan musik piano yang ceria & bouncy */}
      <audio ref={audioRef} loop>
        <source src="https://upload.wikimedia.org/wikipedia/commons/b/b5/The_Entertainer_%28ragtime%29.ogg" type="audio/ogg" />
      </audio>

      {/* Decorative Clouds Background */}
      <div className="clouds flex justify-around overflow-hidden">
        <svg width="250" height="120" viewBox="0 0 24 24" fill="#ffffff" className="mt-8 float-anim"><path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.17 0-.337.013-.5.037C16.275 6.55 13.374 4 9.875 4 5.526 4 2 7.582 2 12s3.526 8 7.875 8h7.625z"/></svg>
        <svg width="180" height="90" viewBox="0 0 24 24" fill="#ffffff" className="mt-40 opacity-70 float-anim" style={{animationDelay: '1s'}}><path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.17 0-.337.013-.5.037C16.275 6.55 13.374 4 9.875 4 5.526 4 2 7.582 2 12s3.526 8 7.875 8h7.625z"/></svg>
      </div>

      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white/40 backdrop-blur-md md:h-screen sticky top-0 flex flex-col p-4 shadow-xl z-20 overflow-y-auto">
        <div className="text-center mb-6 mt-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg mb-3 transform rotate-3 float-anim">
            <div className="text-white transform -rotate-3"><Icons.Feather /></div>
          </div>
          <h1 className="text-2xl font-black text-white drop-shadow-md tracking-wide">JELAJAH PUISI</h1>
          <p className="text-sm text-purple-900 font-bold mt-1 bg-white/50 inline-block px-3 py-1 rounded-full">Kelas 9 Fase D</p>
        </div>
        
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                playSfx('slide'); // <-- Menambahkan suara saat pindah slide/menu
              }}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-white transition-all btn-3d border-b-4
                ${activeTab === item.id 
                  ? `${item.color} transform translate-y-1 border-b-0 mb-1` 
                  : `bg-white/80 text-gray-700 border-gray-300 hover:bg-white`
                }`}
            >
              <div className={activeTab === item.id ? 'text-white' : item.color.split(' ')[0].replace('bg-', 'text-') }>
                <item.icon />
              </div>
              <span className="hidden md:block whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 z-20">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 card-3d bounce-in min-h-[80vh] relative">
          
          {/* Floating BGM Toggle */}
          <button 
            onClick={toggleMusic}
            className={`absolute -top-4 -right-4 p-3 rounded-full btn-3d shadow-lg border-2 border-white z-50 transition-colors ${isMusicPlaying ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            title="Nyalakan/Matikan Suara Latar"
          >
            {isMusicPlaying ? <Icons.MusicOn /> : <Icons.MusicOff />}
          </button>

          {/* RENDER TAB CONTENT */}
          {activeTab === 'beranda' && <TabBeranda setTab={setActiveTab} />}
          {activeTab === 'panduan' && <TabPanduan />}
          {activeTab === 'tujuan' && <TabTujuan />}
          {activeTab === 'puisi-baru' && <TabPuisiBaru />}
          {activeTab === 'struktur' && <TabStruktur />}
          {activeTab === 'menulis' && <TabMenulis />}
          {activeTab === 'bermain' && <TabBermain />}

          {/* Footer Developer Info */}
          <div className="absolute bottom-4 right-6 text-right opacity-70 hover:opacity-100 transition-opacity">
            <p className="text-xs font-bold text-gray-500">Dikembangkan oleh:</p>
            <p className="text-sm font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full shadow-sm border border-purple-200 inline-block mt-1 flex items-center gap-1">
              <Icons.Heart /> Asep Sauma, S.Pd.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// TABS COMPONENTS
// ==========================================

function TabBeranda({ setTab }) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-block bg-teal-300 text-teal-900 px-6 py-2 rounded-full font-black text-xl mb-4 border-2 border-white shadow-md transform -rotate-2">
        Halo Pujangga Muda! ✨
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-purple-600 mb-6 drop-shadow-sm leading-tight">
        Ekspresikan Dirimu Lewat <span className="text-pink-500">Puisi</span>!
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
        Mari bermain dengan kata-kata, temukan keindahan rima, dan curahkan isi hatimu. Belajar puisi itu bebas, asyik, dan magis!
      </p>
      
      <img 
        src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop" 
        alt="Hero Image" 
        className="mx-auto rounded-3xl shadow-lg border-4 border-white mb-8 hover:scale-[1.02] transition-transform duration-300 object-cover h-64 md:h-80 w-full max-w-2xl"
      />

      <button 
        onClick={() => setTab('panduan')}
        className="bg-pink-500 hover:bg-pink-400 text-white font-black text-xl py-4 px-10 rounded-full btn-3d border-b-4 border-pink-700 mx-auto block w-fit float-anim"
      >
        MULAI MENJELAJAH! 🚀
      </button>
    </div>
  );
}

function TabPanduan() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-black text-orange-500 border-b-4 border-orange-200 pb-2 inline-block">Panduan Petualangan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-bl-3xl font-black text-xl">1</div>
          <h3 className="text-xl font-bold text-orange-800 mb-2">Cek Tujuanmu</h3>
          <p className="text-gray-600 font-semibold">Lihat menu <strong>Tujuan</strong> untuk mengetahui apa saja kekuatan super (materi) yang akan kamu kuasai hari ini.</p>
        </div>
        
        <div className="bg-teal-50 p-6 rounded-2xl border-2 border-teal-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 bg-teal-500 text-white w-12 h-12 flex items-center justify-center rounded-bl-3xl font-black text-xl">2</div>
          <h3 className="text-xl font-bold text-teal-800 mb-2">Kenali Puisi Baru</h3>
          <p className="text-gray-600 font-semibold">Buka menu <strong>Puisi Baru</strong> untuk melihat jenis-jenis puisi modern yang tidak kaku dan penuh kebebasan berekspresi.</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-bl-3xl font-black text-xl">3</div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">Pahami Strukturnya</h3>
          <p className="text-gray-600 font-semibold">Pelajari rahasia resep puisi yang bagus di menu <strong>Struktur Puisi</strong>. Ada unsur fisik (yang terlihat) dan unsur batin (makna).</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200 shadow-sm relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute top-0 right-0 bg-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-bl-3xl font-black text-xl">4</div>
          <h3 className="text-xl font-bold text-purple-800 mb-2">Waktunya Berkarya!</h3>
          <p className="text-gray-600 font-semibold">Masuk ke lab eksperimen di menu <strong>Menulis Puisi</strong>. Ikuti langkahnya dan terbitkan puisi pertamamu!</p>
        </div>
      </div>
    </div>
  );
}

function TabTujuan() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-black text-yellow-500 border-b-4 border-yellow-200 pb-2 inline-block">Target Hari Ini 🎯</h2>
      <div className="bg-white border-4 border-yellow-300 rounded-3xl p-6 md:p-8 shadow-lg mt-6 relative">
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transform rotate-12 float-anim">
          <Icons.Target />
        </div>
        <p className="text-gray-600 font-bold mb-4">Setelah mengikuti petualangan ini, kamu diharapkan mampu:</p>
        <ul className="space-y-4 mt-4 text-lg font-semibold text-gray-700">
          <li className="flex gap-4 items-start bg-yellow-50 p-3 rounded-xl border border-yellow-100">
            <span className="bg-teal-100 text-teal-600 p-2 rounded-xl mt-1 shrink-0"><Icons.Check /></span>
            <p>Mengenali dan memahami karakteristik <strong>Puisi Baru</strong> dibandingkan dengan puisi lama.</p>
          </li>
          <li className="flex gap-4 items-start bg-yellow-50 p-3 rounded-xl border border-yellow-100">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-xl mt-1 shrink-0"><Icons.Check /></span>
            <p>Mengidentifikasi unsur pembangun puisi yang terdiri dari <strong>Struktur Fisik</strong> dan <strong>Struktur Batin</strong>.</p>
          </li>
          <li className="flex gap-4 items-start bg-yellow-50 p-3 rounded-xl border border-yellow-100">
            <span className="bg-pink-100 text-pink-600 p-2 rounded-xl mt-1 shrink-0"><Icons.Check /></span>
            <p>Menciptakan atau <strong>Menulis Puisi</strong> karya sendiri dengan memperhatikan diksi, majas, dan tema yang menarik.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TabPuisiBaru() {
  const jenisPuisi = [
    { nama: 'Balada', desc: 'Puisi yang berisi cerita atau kisah. Biasanya tentang kepahlawanan atau tokoh pujaan.', color: 'blue' },
    { nama: 'Elegi', desc: 'Puisi yang mengungkapkan rasa duka cita atau kesedihan yang mendalam. Cocok buat yang lagi galau!', color: 'indigo' },
    { nama: 'Romansa', desc: 'Puisi yang berisi luapan perasaan cinta kasih. Penuh dengan kata-kata manis dan romantis.', color: 'pink' },
    { nama: 'Epigram', desc: 'Puisi yang berisi ajaran hidup atau tuntunan. Sering kali pendek namun maknanya tajam menohok.', color: 'green' },
    { nama: 'Himne', desc: 'Puisi pujaan untuk Tuhan, tanah air, atau pahlawan. Bikin merinding saking sakralnya.', color: 'orange' },
    { nama: 'Ode', desc: 'Puisi sanjungan untuk orang yang berjasa. Nadanya resmi dan penuh gaya bahasa anggun.', color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-black text-teal-500 border-b-4 border-teal-200 pb-2 inline-block mb-4">Apa Itu Puisi Baru?</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-center bg-teal-50 p-6 rounded-3xl border-2 border-teal-200">
        <img 
          src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=200&auto=format&fit=crop" 
          alt="Bebas" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md float-anim object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-gray-700">
            <strong>Puisi Baru</strong> adalah jenis puisi yang bentuknya lebih <em>bebas</em> daripada puisi lama. Bebas dalam arti jumlah baris, suku kata, maupun rima tidak terlalu diatur kaku seperti pantun atau syair.
          </p>
          <p className="text-md font-bold text-teal-700 mt-2">
            Di puisi baru, kamu bebas mengekspresikan diri dengan bentuk yang kamu suka!
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-black text-gray-700 mt-8 mb-4">Jenis-Jenis Puisi Baru (Berdasarkan Isi)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jenisPuisi.map((jenis, index) => (
          <div key={index} className={`bg-white border-l-8 border-${jenis.color}-500 p-4 rounded-r-2xl rounded-l-md shadow-sm hover:-translate-y-1 transition-transform`}>
            <h4 className={`text-xl font-black text-${jenis.color}-600`}>{jenis.nama}</h4>
            <p className="text-gray-600 font-semibold text-sm mt-1">{jenis.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabStruktur() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black text-blue-500 border-b-4 border-blue-200 pb-2 inline-block">Anatomi Sebuah Puisi</h2>
        <p className="text-gray-600 font-bold mt-4">Layaknya sebuah bangunan, puisi juga punya struktur lho! Ada yang terlihat dari luar (Fisik) dan ada makna di dalamnya (Batin).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Struktur Fisik */}
        <div className="bg-white border-4 border-blue-200 rounded-3xl p-6 shadow-md relative mt-6">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-black text-xl py-2 px-6 rounded-full shadow-md border-2 border-white">
            STRUKTUR FISIK 👀
          </div>
          <p className="text-sm font-bold text-center text-blue-400 mt-4 mb-4">Unsur yang bisa langsung dilihat mata.</p>
          
          <ul className="space-y-4">
            <li className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-black text-blue-700 block">1. Tipografi (Perwajahan)</span>
              <span className="text-sm font-semibold text-gray-600">Bentuk puisi. Ada yang rata kiri, zig-zag, atau seperti gambar.</span>
            </li>
            <li className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-black text-blue-700 block">2. Diksi (Pilihan Kata)</span>
              <span className="text-sm font-semibold text-gray-600">Pemilihan kata yang pas, estetik, dan bermakna padat.</span>
            </li>
            <li className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-black text-blue-700 block">3. Imaji (Citraan)</span>
              <span className="text-sm font-semibold text-gray-600">Kata yang memancing indra (penglihatan, pendengaran, perasaan).</span>
            </li>
            <li className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-black text-blue-700 block">4. Majas (Gaya Bahasa)</span>
              <span className="text-sm font-semibold text-gray-600">Bahasa kiasan seperti metafora, personifikasi, hiperbola.</span>
            </li>
            <li className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-black text-blue-700 block">5. Rima & Irama</span>
              <span className="text-sm font-semibold text-gray-600">Persamaan bunyi di akhir baris dan alunan nada saat dibaca.</span>
            </li>
          </ul>
        </div>

        {/* Struktur Batin */}
        <div className="bg-white border-4 border-pink-200 rounded-3xl p-6 shadow-md relative mt-6">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white font-black text-xl py-2 px-6 rounded-full shadow-md border-2 border-white">
            STRUKTUR BATIN 💖
          </div>
          <p className="text-sm font-bold text-center text-pink-400 mt-4 mb-4">Makna tersembunyi di balik kata-kata.</p>
          
          <ul className="space-y-4">
            <li className="bg-pink-50 p-3 rounded-xl border border-pink-100">
              <span className="font-black text-pink-700 block">1. Tema (Sense)</span>
              <span className="text-sm font-semibold text-gray-600">Gagasan pokok atau ide dasar yang mendasari puisi (misal: cinta, alam).</span>
            </li>
            <li className="bg-pink-50 p-3 rounded-xl border border-pink-100">
              <span className="font-black text-pink-700 block">2. Perasaan (Feeling)</span>
              <span className="text-sm font-semibold text-gray-600">Sikap penyair terhadap tema, terlihat dari kata yang dipilih.</span>
            </li>
            <li className="bg-pink-50 p-3 rounded-xl border border-pink-100">
              <span className="font-black text-pink-700 block">3. Nada (Tone)</span>
              <span className="text-sm font-semibold text-gray-600">Sikap penyair kepada pembaca (menggurui, bercerita, menyindir).</span>
            </li>
            <li className="bg-pink-50 p-3 rounded-xl border border-pink-100">
              <span className="font-black text-pink-700 block">4. Amanat (Intention)</span>
              <span className="text-sm font-semibold text-gray-600">Pesan moral atau nasihat yang ingin disampaikan kepada pembaca.</span>
            </li>
          </ul>
          
          <div className="mt-6 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=200&auto=format&fit=crop" 
              alt="Hati" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm float-anim object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabMenulis() {
  const [puisiTitle, setPuisiTitle] = useState('');
  const [puisiContent, setPuisiContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    if(puisiTitle.trim() && puisiContent.trim()) {
      setIsPublished(true);
    }
  };

  const handleReset = () => {
    setIsPublished(false);
    setPuisiTitle('');
    setPuisiContent('');
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-black text-purple-600 border-b-4 border-purple-200 pb-2 inline-block">Studio Puisi ✍️</h2>
      
      {!isPublished ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Langkah Menulis */}
          <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-200">
            <h3 className="text-2xl font-black text-purple-800 mb-4">5 Langkah Ajaib:</h3>
            <ol className="space-y-3 font-semibold text-gray-700">
              <li className="flex gap-2"><span className="bg-purple-200 text-purple-800 w-6 h-6 flex items-center justify-center rounded-full shrink-0">1</span> Tentukan Tema (Misal: Senja, Persahabatan).</li>
              <li className="flex gap-2"><span className="bg-purple-200 text-purple-800 w-6 h-6 flex items-center justify-center rounded-full shrink-0">2</span> Catat kata kunci yang terlintas di otak.</li>
              <li className="flex gap-2"><span className="bg-purple-200 text-purple-800 w-6 h-6 flex items-center justify-center rounded-full shrink-0">3</span> Pilih Diksi (Ganti "bagus" jadi "menawan").</li>
              <li className="flex gap-2"><span className="bg-purple-200 text-purple-800 w-6 h-6 flex items-center justify-center rounded-full shrink-0">4</span> Rangkai dengan Majas dan Rima.</li>
              <li className="flex gap-2"><span className="bg-purple-200 text-purple-800 w-6 h-6 flex items-center justify-center rounded-full shrink-0">5</span> Baca ulang dengan suara lantang!</li>
            </ol>
            <img 
              src="https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=400&auto=format&fit=crop" 
              alt="Inspirasi" 
              className="mt-6 rounded-xl border-4 border-white shadow-sm w-full h-48 object-cover"
            />
          </div>

          {/* Form Menulis */}
          <div className="bg-white p-6 rounded-3xl border-4 border-purple-300 shadow-md">
            <h3 className="text-xl font-black text-purple-600 mb-4">Coba Tulis Puisimu Di Sini!</h3>
            <input 
              type="text" 
              placeholder="Judul Puisimu..." 
              value={puisiTitle}
              onChange={(e) => setPuisiTitle(e.target.value)}
              className="w-full mb-4 p-3 rounded-xl border-2 border-purple-100 bg-purple-50 focus:outline-none focus:border-purple-400 font-bold text-gray-700"
            />
            <textarea 
              placeholder="Ketik baris-baris puisimu yang indah di sini..." 
              rows="6"
              value={puisiContent}
              onChange={(e) => setPuisiContent(e.target.value)}
              className="w-full mb-4 p-3 rounded-xl border-2 border-purple-100 bg-purple-50 focus:outline-none focus:border-purple-400 font-semibold text-gray-700 resize-none"
            ></textarea>
            
            <button 
              onClick={handlePublish}
              disabled={!puisiTitle.trim() || !puisiContent.trim()}
              className={`w-full font-black text-xl py-3 rounded-xl btn-3d border-b-4 transition-all
                ${(!puisiTitle.trim() || !puisiContent.trim()) 
                  ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-400 text-white border-green-700'}`}
            >
              TERBITKAN KARYA! ✨
            </button>
          </div>
        </div>
      ) : (
        /* Hasil Karya */
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-3xl border-4 border-purple-300 shadow-xl text-center bounce-in max-w-2xl mx-auto mt-8">
          <div className="inline-block bg-yellow-400 text-yellow-900 font-black px-4 py-1 rounded-full mb-4 transform -rotate-3">
            Mahakarya Baru! 🌟
          </div>
          <h3 className="text-3xl font-black text-purple-800 mb-6 font-serif tracking-wide">{puisiTitle}</h3>
          
          <div className="text-lg font-semibold text-gray-700 whitespace-pre-wrap italic leading-relaxed mb-8">
            {puisiContent}
          </div>

          <div className="border-t-2 border-purple-200 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-purple-500">Karya: Siswa Hebat Kelas 9</span>
            <button 
              onClick={handleReset}
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-6 rounded-full btn-3d border-b-4 border-purple-700 text-sm"
            >
              Tulis Lagi ✍️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// GAMES COMPONENTS (BARU)
// ==========================================

function TabBermain() {
  const [activeGame, setActiveGame] = useState(null);

  if (!activeGame) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-red-500 border-b-4 border-red-200 pb-2 inline-block">Zona Bermain 🎮</h2>
        <p className="text-gray-600 font-bold mb-6">Pilih gim untuk menguji pengetahuan puisimu. Let's play!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game 1 */}
          <div className="bg-blue-50 p-6 rounded-3xl border-4 border-blue-300 shadow-lg hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => setActiveGame('dnd')}>
            <div className="text-5xl mb-4 float-anim">🛒</div>
            <h3 className="text-xl font-black text-blue-700">Susun Struktur</h3>
            <p className="text-sm font-semibold text-gray-600 mt-2">Kelompokkan unsur puisi ke keranjang yang tepat.</p>
            <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full btn-3d w-full">Mainkan</button>
          </div>

          {/* Game 2 */}
          <div className="bg-teal-50 p-6 rounded-3xl border-4 border-teal-300 shadow-lg hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => setActiveGame('wordsearch')}>
            <div className="text-5xl mb-4 float-anim" style={{animationDelay: '0.2s'}}>🔍</div>
            <h3 className="text-xl font-black text-teal-700">Cari Kata</h3>
            <p className="text-sm font-semibold text-gray-600 mt-2">Temukan istilah-istilah rahasia dalam puisi.</p>
            <button className="mt-4 bg-teal-500 text-white font-bold py-2 px-4 rounded-full btn-3d w-full">Mainkan</button>
          </div>

          {/* Game 3 */}
          <div className="bg-orange-50 p-6 rounded-3xl border-4 border-orange-300 shadow-lg hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => setActiveGame('puzzle')}>
            <div className="text-5xl mb-4 float-anim" style={{animationDelay: '0.4s'}}>🧩</div>
            <h3 className="text-xl font-black text-orange-700">Puzzle Bait</h3>
            <p className="text-sm font-semibold text-gray-600 mt-2">Geser dan susun potongan bait menjadi puisi utuh.</p>
            <button className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-full btn-3d w-full">Mainkan</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setActiveGame(null)}
        className="absolute -top-4 -left-4 md:-left-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full btn-3d z-10 text-sm flex items-center gap-2"
      >
        <span>🔙</span> Kembali
      </button>
      <div className="pt-8">
        {activeGame === 'dnd' && <GameDragDrop />}
        {activeGame === 'wordsearch' && <GameWordSearch />}
        {activeGame === 'puzzle' && <GamePuzzle />}
      </div>
    </div>
  );
}

// --- GIM 1: DRAG AND DROP (Sortir Struktur) ---
function GameDragDrop() {
  const initialItems = [
    { id: 1, name: 'Diksi', type: 'fisik', status: 'pool' },
    { id: 2, name: 'Tema', type: 'batin', status: 'pool' },
    { id: 3, name: 'Majas', type: 'fisik', status: 'pool' },
    { id: 4, name: 'Amanat', type: 'batin', status: 'pool' },
    { id: 5, name: 'Rima', type: 'fisik', status: 'pool' },
    { id: 6, name: 'Nada', type: 'batin', status: 'pool' },
  ];

  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(null); // Utk support HP (Klik & Pindah)
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (items.every(i => i.status !== 'pool')) {
      const isAllCorrect = items.every(i => i.status === i.type);
      if (isAllCorrect && !win) {
        setWin(true);
        playSfx('win'); // Mainkan suara menang
      }
    }
  }, [items, win]);

  const moveItem = (targetStatus) => {
    if (!selectedId) return;
    
    // Cek apakah target keranjang sesuai dengan tipe item (fisik/batin)
    const item = items.find(i => i.id === selectedId);
    if (item.type === targetStatus) {
      playSfx('correct'); // Jawaban benar
    } else {
      playSfx('wrong'); // Jawaban salah
    }

    setItems(items.map(item => item.id === selectedId ? { ...item, status: targetStatus } : item));
    setSelectedId(null);
  };

  const reset = () => { setItems(initialItems); setWin(false); setSelectedId(null); };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-black text-blue-600 mb-2">Keranjang Struktur Puisi</h3>
      <p className="text-gray-600 font-bold mb-6 text-sm">Klik kata di bawah, lalu klik keranjang yang tepat (Fisik / Batin).</p>
      
      {win && (
        <div className="bg-green-100 border-4 border-green-400 p-4 rounded-2xl mb-6 bounce-in">
          <h4 className="text-2xl font-black text-green-600">Luar Biasa! 🎉</h4>
          <p className="text-green-800 font-semibold mb-2">Kamu berhasil memilah semua struktur puisi.</p>
          <button onClick={reset} className="bg-green-500 text-white font-bold py-2 px-6 rounded-full btn-3d">Main Lagi</button>
        </div>
      )}

      {/* Pool Area */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[60px]">
        {items.filter(i => i.status === 'pool').map(item => (
          <button 
            key={item.id}
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`font-black text-lg py-2 px-6 rounded-full btn-3d border-b-4 transition-all
              ${selectedId === item.id ? 'bg-yellow-400 text-yellow-900 border-yellow-600 scale-110' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fisik */}
        <div 
          onClick={() => moveItem('fisik')}
          className={`border-4 rounded-3xl p-6 min-h-[150px] transition-all cursor-pointer
            ${selectedId ? 'border-blue-400 bg-blue-50 hover:bg-blue-100' : 'border-blue-200 bg-white'}`}
        >
          <h4 className="text-xl font-black text-blue-500 mb-4 border-b-2 border-blue-100 pb-2">🧺 Struktur Fisik</h4>
          <div className="flex flex-wrap gap-2">
            {items.filter(i => i.status === 'fisik').map(item => (
              <span key={item.id} className={`font-bold px-3 py-1 rounded-full text-sm ${item.type === 'fisik' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-red-100 text-red-700 border-2 border-red-300 line-through'}`}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Batin */}
        <div 
          onClick={() => moveItem('batin')}
          className={`border-4 rounded-3xl p-6 min-h-[150px] transition-all cursor-pointer
            ${selectedId ? 'border-pink-400 bg-pink-50 hover:bg-pink-100' : 'border-pink-200 bg-white'}`}
        >
          <h4 className="text-xl font-black text-pink-500 mb-4 border-b-2 border-pink-100 pb-2">🧺 Struktur Batin</h4>
          <div className="flex flex-wrap gap-2">
            {items.filter(i => i.status === 'batin').map(item => (
              <span key={item.id} className={`font-bold px-3 py-1 rounded-full text-sm ${item.type === 'batin' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-red-100 text-red-700 border-2 border-red-300 line-through'}`}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- GIM 2: WORD SEARCH (Cari Kata) ---
function GameWordSearch() {
  // Grid 6x6. Kata: PUISI, MAJAS, RIMA, TEMA.
  const initialGrid = [
    ['P', 'U', 'I', 'S', 'I', 'A'],
    ['M', 'A', 'J', 'A', 'S', 'B'],
    ['R', 'I', 'M', 'A', 'X', 'C'],
    ['T', 'E', 'M', 'A', 'Y', 'D'],
    ['B', 'A', 'I', 'T', 'Z', 'E'],
    ['D', 'I', 'K', 'S', 'I', 'F'],
  ];
  
  const targetWords = ['PUISI', 'MAJAS', 'RIMA', 'TEMA', 'BAIT', 'DIKSI'];
  
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]); // Array of strings "r-c"

  const toggleCell = (r, c) => {
    const cellId = `${r}-${c}`;
    if (foundCells.includes(cellId)) return; // Sudah ketemu, abaikan
    
    let newSelected = [...selectedCells];
    if (newSelected.includes(cellId)) {
      newSelected = newSelected.filter(id => id !== cellId);
    } else {
      newSelected.push(cellId);
    }
    setSelectedCells(newSelected);
    checkWords(newSelected);
  };

  const checkWords = (currentSelected) => {
    // Bangun string dari huruf yang di-select (diurutkan berdasarkan klik)
    const selectedLetters = currentSelected.map(id => {
      const [r, c] = id.split('-');
      return initialGrid[r][c];
    }).join('');

    // Cek apakah membentuk kata target (bisa maju/mundur seleksinya)
    const matchedWord = targetWords.find(w => w === selectedLetters || w === selectedLetters.split('').reverse().join(''));
    
    if (matchedWord && !foundWords.includes(matchedWord)) {
      const newFoundWords = [...foundWords, matchedWord];
      setFoundWords(newFoundWords);
      setFoundCells([...foundCells, ...currentSelected]);
      setSelectedCells([]); // Reset seleksi

      // Cek apakah menang
      if (newFoundWords.length === targetWords.length) {
        playSfx('win');
      } else {
        playSfx('correct');
      }
    } else {
      playSfx('click'); // Suara klik biasa jika belum menemukan kata
    }
  };

  const reset = () => { setSelectedCells([]); setFoundWords([]); setFoundCells([]); };

  return (
    <div className="text-center max-w-xl mx-auto">
      <h3 className="text-2xl font-black text-teal-600 mb-2">Detektif Kata 🔍</h3>
      <p className="text-gray-600 font-bold mb-4 text-sm">Klik huruf-huruf berurutan untuk membentuk kata. Temukan: <br/>
        <span className="text-teal-600">{targetWords.join(', ')}</span>
      </p>

      {foundWords.length === targetWords.length && (
         <div className="bg-green-100 border-4 border-green-400 p-4 rounded-2xl mb-6 bounce-in">
           <h4 className="text-2xl font-black text-green-600">Misi Selesai! 🕵️‍♂️</h4>
           <button onClick={reset} className="mt-2 bg-green-500 text-white font-bold py-2 px-6 rounded-full btn-3d">Ulangi Misi</button>
         </div>
      )}

      <div className="bg-teal-900 p-2 md:p-4 rounded-3xl inline-block shadow-lg border-4 border-teal-700">
        <div className="grid grid-cols-6 gap-1 md:gap-2">
          {initialGrid.map((row, rIdx) => 
            row.map((letter, cIdx) => {
              const cellId = `${rIdx}-${cIdx}`;
              const isFound = foundCells.includes(cellId);
              const isSelected = selectedCells.includes(cellId);
              
              let bgClass = "bg-white text-teal-900";
              if (isFound) bgClass = "bg-yellow-400 text-yellow-900";
              else if (isSelected) bgClass = "bg-teal-400 text-white";

              return (
                <button
                  key={cellId}
                  onClick={() => toggleCell(rIdx, cIdx)}
                  className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-black text-xl md:text-2xl btn-3d border-b-4 border-gray-300 transition-colors ${bgClass}`}
                >
                  {letter}
                </button>
              )
            })
          )}
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {targetWords.map(word => (
          <span key={word} className={`px-4 py-1 rounded-full font-bold border-2 ${foundWords.includes(word) ? 'bg-green-100 text-green-700 border-green-400 line-through' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- GIM 3: PUZZLE GESER (Susun Bait) ---
function GamePuzzle() {
  // Kata-kata dari sebuah bait (1-8), 0 = kosong
  const targetState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const words = {
    1: "Pagiku", 2: "Hilang", 3: "Sudah",
    4: "Melayang", 5: "Hari", 6: "Mudaku",
    7: "Telah", 8: "Pergi", 0: ""
  };

  const [tiles, setTiles] = useState([4, 1, 3, 7, 2, 5, 8, 0, 6]); // Initial shuffled state
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (tiles.join(',') === targetState.join(',') && !win) {
      setWin(true);
      playSfx('win');
    }
  }, [tiles, win]);

  const moveTile = (index) => {
    if (win) return;
    const emptyIndex = tiles.indexOf(0);
    // Cek apakah adjacent (atas, bawah, kiri, kanan)
    const isAdjacent = 
      (index === emptyIndex - 1 && emptyIndex % 3 !== 0) || // Kiri
      (index === emptyIndex + 1 && index % 3 !== 0) ||      // Kanan
      (index === emptyIndex - 3) ||                         // Atas
      (index === emptyIndex + 3);                           // Bawah

    if (isAdjacent) {
      playSfx('click'); // Suara klik kotak saat berhasil digeser
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = 0;
      setTiles(newTiles);
    } else {
      playSfx('wrong'); // <-- Menambahkan suara SALAH jika mengklik kotak yang tidak bisa digeser
    }
  };

  const shuffle = () => {
    // Simple shuffle (not guaranteeing solvability for simplicity in snippet, 
    // but hardcoding a known solvable shuffled state is safer)
    setTiles([7, 2, 4, 5, 0, 6, 8, 3, 1]); 
    setWin(false);
  };

  return (
    <div className="text-center max-w-sm mx-auto">
      <h3 className="text-2xl font-black text-orange-600 mb-2">Puzzle Bait 🧩</h3>
      <p className="text-gray-600 font-bold mb-4 text-sm">Geser kotak untuk menyusun bait puisi ini dengan benar!</p>

      {win ? (
        <div className="bg-orange-100 border-4 border-orange-400 p-4 rounded-2xl mb-6 bounce-in">
          <h4 className="text-2xl font-black text-orange-600">Sempurna! ✨</h4>
          <p className="italic text-gray-700 font-bold mt-2">"Pagiku hilang sudah melayang,<br/>Hari mudaku telah pergi."</p>
          <button onClick={shuffle} className="mt-4 bg-orange-500 text-white font-bold py-2 px-6 rounded-full btn-3d">Acak Lagi</button>
        </div>
      ) : (
        <div className="bg-orange-200 p-3 rounded-2xl border-4 border-orange-300 shadow-md">
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile, index) => (
              <div 
                key={index} 
                onClick={() => moveTile(index)}
                className={`h-24 flex items-center justify-center rounded-xl font-black text-lg transition-transform ${
                  tile === 0 
                    ? 'bg-orange-300/30 shadow-inner' 
                    : 'bg-white text-orange-700 btn-3d border-b-4 border-orange-300 cursor-pointer hover:scale-[1.02]'
                }`}
              >
                {words[tile]}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!win && (
        <button onClick={shuffle} className="mt-6 text-orange-500 font-bold hover:underline">
          🔄 Acak Ulang Kotak
        </button>
      )}
    </div>
  );
}