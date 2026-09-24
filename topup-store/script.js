// Data Games dari Google Sheets
let games = [];
const WHATSAPP_NUMBER = '6285942510943';
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRk8L9OTzuOJ5dV9IpB3dHQlcqS5pZ2vcPqXLGM6omZytMPntNk_mFK872Ny68yC6-R7RW42VJpYaaA/pub?gid=0&single=true&output=csv';

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

// --- GOOGLE SHEETS LOGIC ---
async function loadGamesFromSheet() {
    try {
        let data = '';
        const CACHE_KEY = 'tegamiindex_pricelist_data';
        const CACHE_TIME_KEY = 'tegamiindex_pricelist_time';
        const CACHE_DURATION = 10 * 60 * 1000; // 10 menit (dalam milidetik)
        
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        
        // Cek apakah data tersimpan di cache dan umurnya belum 10 menit
        if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime) < CACHE_DURATION)) {
            data = cachedData;
            console.log('Memuat harga dari Cache Lokal (Super Cepat ⚡)');
        } else {
            // Ambil data baru dari Google Sheets
            const response = await fetch(SHEET_CSV_URL);
            data = await response.text();
            
            // Simpan ke cache
            localStorage.setItem(CACHE_KEY, data);
            localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
            console.log('Mengunduh harga terbaru dari Google Sheets 📡');
        }
        
        const rows = data.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        const gameMap = new Map();
        
        // Mulai dari i = 1 untuk melewati baris judul (Header)
        for (let i = 1; i < rows.length; i++) {
            let values = [];
            let inQuotes = false;
            let currentVal = '';
            
            // Parser CSV sederhana untuk mengatasi koma di dalam teks (misal: "300+30, Bonus")
            for(let char of rows[i]) {
                if(char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentVal.trim());
                    currentVal = '';
                } else {
                    currentVal += char;
                }
            }
            values.push(currentVal.trim());

            if (values.length < 5) continue;
            
            const gameId = values[0].replace(/^"|"$/g, '');
            const gameTitle = values[1].replace(/^"|"$/g, '');
            const publisher = values[2].replace(/^"|"$/g, '');
            const itemName = values[3].replace(/^"|"$/g, '');
            const priceStr = values[4].replace(/^"|"$/g, '');
            
            // Bersihkan harga dari huruf/simbol, ambil angkanya saja
            const price = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
            
            if (!gameId || !itemName || isNaN(price)) continue;
            
            if (!gameMap.has(gameId)) {
                gameMap.set(gameId, {
                    id: gameId,
                    title: gameTitle,
                    publisher: publisher,
                    icon: `assets/games/${gameId}/icon.webp`,
                    prices: []
                });
            }
            
            gameMap.get(gameId).prices.push({
                id: itemName.replace(/\s+/g, '-').toLowerCase(),
                name: itemName,
                price: price
            });
        }
        
        games = Array.from(gameMap.values());
        initGames(); // Render game setelah data berhasil diambil
        
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        document.getElementById('gameGrid').innerHTML = '<p style="text-align:center;width:100%">Gagal memuat data harga dari sistem. Coba muat ulang halaman.</p>';
    }
}

// --- CAROUSEL LOGIC ---
const carouselImages = [
    'assets/promo_banner_1_1783375281743.png',
    'assets/promo_banner_2_1783375295252.png'
];

const track = document.getElementById('carouselTrack');
const indicatorsContainer = document.getElementById('carouselIndicators');
let currentIndex = 0;

function initCarousel() {
    carouselImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${src}" alt="Promo Banner ${index + 1}">`;
        track.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `indicator ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });
}

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
}, 5000);


// --- GAME GRID LOGIC ---
const gameGrid = document.getElementById('gameGrid');

function initGames() {
    // Urutkan game berdasarkan abjad (A-Z)
    games.sort((a, b) => a.title.localeCompare(b.title));
    
    // Kosongkan grid sebelum merender ulang (berjaga-jaga)
    gameGrid.innerHTML = '';
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.icon}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.publisher}</p>
        `;
        card.addEventListener('click', () => openModal(game));
        gameGrid.appendChild(card);
    });
}

// --- MODAL & PRICELIST LOGIC ---
const modal = document.getElementById('priceModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const pricelistGrid = document.getElementById('pricelistGrid');
const orderSummary = document.getElementById('orderSummary');
const btnWhatsapp = document.getElementById('btnWhatsapp');

let selectedGame = null;
let selectedPrice = null;

function openModal(game) {
    selectedGame = game;
    selectedPrice = null; 
    
    document.getElementById('modalGameIcon').src = game.icon;
    document.getElementById('modalGameTitle').textContent = game.title;
    document.getElementById('modalGamePublisher').textContent = game.publisher;
    
    pricelistGrid.innerHTML = '';
    game.prices.forEach(priceItem => {
        const card = document.createElement('div');
        card.className = 'price-card';
        card.innerHTML = `
            <span class="price-item">${priceItem.name}</span>
            <span class="price-value">${formatRupiah(priceItem.price)}</span>
        `;
        card.addEventListener('click', () => selectPrice(card, priceItem));
        pricelistGrid.appendChild(card);
    });

    orderSummary.style.display = 'none';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function selectPrice(cardElement, priceItem) {
    document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
    
    selectedPrice = priceItem;
    
    document.getElementById('summaryItem').textContent = priceItem.name;
    document.getElementById('summaryPrice').textContent = formatRupiah(priceItem.price);
    orderSummary.style.display = 'block';
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


// --- WHATSAPP REDIRECT ---
btnWhatsapp.addEventListener('click', () => {
    if (!selectedGame || !selectedPrice) return;
    
    const text = `Halo Admin Tegamiindex, saya ingin order topup:\n\n*Game:* ${selectedGame.title}\n*Item:* ${selectedPrice.name}\n*Harga:* ${formatRupiah(selectedPrice.price)}\n\nMohon info pembayaran. Terima kasih.`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    // Menggunakan window.location.href agar lebih aman di HP dan tidak terblokir Popup Blocker
    window.location.href = waUrl;
});


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    loadGamesFromSheet(); // Fetch dari Excel Google saat web dibuka
});
