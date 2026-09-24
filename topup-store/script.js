// Data Dummy Games
const games = [
    {
        id: 'mlbb',
        title: 'Mobile Legends',
        publisher: 'Moonton',
        icon: 'assets/games/mlbb/icon.webp',
        prices: [
            { id: 'ml1', name: '86 Diamonds', price: 23000 },
            { id: 'ml2', name: '172 Diamonds', price: 46000 },
            { id: 'ml3', name: '257 Diamonds', price: 69000 },
            { id: 'ml4', name: '706 Diamonds', price: 180000 },
            { id: 'ml5', name: 'Twilight Pass', price: 135000 },
            { id: 'ml6', name: 'Weekly Diamond Pass', price: 28000 }
        ]
    },
    {
        id: 'ff',
        title: 'Free Fire',
        publisher: 'Garena',
        icon: 'assets/games/ff/icon.webp',
        prices: [
            { id: 'ff1', name: '70 Diamonds', price: 10000 },
            { id: 'ff2', name: '140 Diamonds', price: 20000 },
            { id: 'ff3', name: '355 Diamonds', price: 50000 },
            { id: 'ff4', name: '720 Diamonds', price: 100000 },
            { id: 'ff5', name: 'Weekly Membership', price: 30000 }
        ]
    },
    {
        id: 'pubgm',
        title: 'PUBG Mobile',
        publisher: 'Level Infinite',
        icon: 'assets/games/pubgm/icon.webp',
        prices: [
            { id: 'pubg1', name: '60 UC', price: 14000 },
            { id: 'pubg2', name: '325 UC', price: 70000 },
            { id: 'pubg3', name: '660 UC', price: 140000 },
            { id: 'pubg4', name: '1800 UC', price: 350000 }
        ]
    },
    {
        id: 'genshin',
        title: 'Genshin Impact',
        publisher: 'HoYoverse',
        icon: 'assets/games/genshin/icon.webp',
        prices: [
            { id: 'gi1', name: '60 Genesis Crystals', price: 16000 },
            { id: 'gi2', name: '300+30 Genesis Crystals', price: 79000 },
            { id: 'gi3', name: '980+110 Genesis Crystals', price: 249000 },
            { id: 'gi4', name: 'Blessing of the Welkin Moon', price: 79000 }
        ]
    },
    {
        id: 'valo',
        title: 'Valorant',
        publisher: 'Riot Games',
        icon: 'assets/games/valo/icon.webp',
        prices: [
            { id: 'val1', name: '420 VP', price: 50000 },
            { id: 'val2', name: '700 VP', price: 80000 },
            { id: 'val3', name: '1375 VP', price: 150000 },
            { id: 'val4', name: '3400 VP', price: 350000 }
        ]
    },
    {
        id: 'roblox',
        title: 'Roblox',
        publisher: 'Roblox Corporation',
        icon: 'assets/games/roblox/icon.webp',
        prices: [
            { id: 'rbx1', name: '80 Robux', price: 15000 },
            { id: 'rbx2', name: '400 Robux', price: 75000 },
            { id: 'rbx3', name: '800 Robux', price: 150000 },
            { id: 'rbx4', name: '1700 Robux', price: 300000 },
            { id: 'rbx5', name: 'Premium 450', price: 75000 }
        ]
    },
    {
        id: 'hsr',
        title: 'Honkai: Star Rail',
        publisher: 'HoYoverse',
        icon: 'assets/games/hsr/icon.webp',
        prices: [
            { id: 'hsr1', name: '60 Oneiric Shard', price: 16000 },
            { id: 'hsr2', name: '300+30 Oneiric Shard', price: 79000 },
            { id: 'hsr3', name: '980+110 Oneiric Shard', price: 249000 },
            { id: 'hsr4', name: 'Express Supply Pass', price: 79000 }
        ]
    },
    {
        id: 'hi3',
        title: 'Honkai Impact 3rd',
        publisher: 'HoYoverse',
        icon: 'assets/games/hi3/icon.webp',
        prices: [
            { id: 'hi1', name: '65 Crystals', price: 16000 },
            { id: 'hi2', name: '330 Crystals', price: 79000 },
            { id: 'hi3', name: '710 Crystals', price: 159000 },
            { id: 'hi4', name: 'Monthly Card', price: 79000 }
        ]
    },
    {
        id: 'hok',
        title: 'Honor of Kings',
        publisher: 'Level Infinite',
        icon: 'assets/games/hok/icon.webp',
        prices: [
            { id: 'hok1', name: '16 Tokens', price: 4000 },
            { id: 'hok2', name: '80 Tokens', price: 16000 },
            { id: 'hok3', name: '240 Tokens', price: 49000 },
            { id: 'hok4', name: 'Weekly Card', price: 16000 }
        ]
    },
    {
        id: 'zzz',
        title: 'Zenless Zone Zero',
        publisher: 'HoYoverse',
        icon: 'assets/games/zzz/icon.webp',
        prices: [
            { id: 'zzz1', name: '60 Monochromes', price: 16000 },
            { id: 'zzz2', name: '300 Monochromes', price: 79000 },
            { id: 'zzz3', name: '980 Monochromes', price: 249000 },
            { id: 'zzz4', name: 'Inter-Knot Membership', price: 79000 }
        ]
    },
    {
        id: 'wuwa',
        title: 'Wuthering Waves',
        publisher: 'Kuro Games',
        icon: 'assets/games/wuwa/icon.webp',
        prices: [
            { id: 'wuwa1', name: '60 Lunites', price: 16000 },
            { id: 'wuwa2', name: '300 Lunites', price: 79000 },
            { id: 'wuwa3', name: '980 Lunites', price: 249000 },
            { id: 'wuwa4', name: 'Lunite Subscription', price: 79000 }
        ]
    }
];

const WHATSAPP_NUMBER = '6285942510943';

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

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
        // Create Slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${src}" alt="Promo Banner ${index + 1}">`;
        track.appendChild(slide);

        // Create Indicator
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

// Auto slide
setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
}, 5000);


// --- GAME GRID LOGIC ---
const gameGrid = document.getElementById('gameGrid');

function initGames() {
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
    selectedPrice = null; // reset selection
    
    document.getElementById('modalGameIcon').src = game.icon;
    document.getElementById('modalGameTitle').textContent = game.title;
    document.getElementById('modalGamePublisher').textContent = game.publisher;
    
    // Render prices
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
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function selectPrice(cardElement, priceItem) {
    // Remove active class from all
    document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
    // Add active class to selected
    cardElement.classList.add('selected');
    
    selectedPrice = priceItem;
    
    // Update Order Summary
    document.getElementById('summaryItem').textContent = priceItem.name;
    document.getElementById('summaryPrice').textContent = formatRupiah(priceItem.price);
    orderSummary.style.display = 'block';
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside content
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
    
    window.open(waUrl, '_blank');
});


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initGames();
});
