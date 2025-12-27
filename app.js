// ========================================
// FERNANDA XIMENA AWARDS - APP.JS
// HTML/CSS/JS Vanilla Version
// ========================================

// === ESTADO DE LA APLICACIÓN ===
let currentView = 'landing'; // 'landing', 'login', 'dashboard'
let isAuthenticated = false;
let guests = [];
let categories = [];
let selectedDresscode = null;
let showRegistrationModal = false;
let currentDashboardTab = 'guests';
let searchTerm = '';

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderApp();
    startCountdown();

    // Event delegation para manejar clicks dinámicos
    document.addEventListener('click', handleGlobalClick);
    
    // Optimización: Prevenir scroll jank
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Aquí puedes agregar lógica de scroll si es necesaria
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

// === UTILITY FUNCTIONS ===
// Debounce para prevenir llamadas excesivas
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === LOCAL STORAGE ===
function loadFromLocalStorage() {
    const savedGuests = localStorage.getItem('guest_list');
    const savedCategories = localStorage.getItem('award_categories');

    guests = savedGuests ? JSON.parse(savedGuests) : MOCK_GUESTS;
    categories = savedCategories ? JSON.parse(savedCategories) : INITIAL_AWARD_CATEGORIES;
}

function saveToLocalStorage() {
    localStorage.setItem('guest_list', JSON.stringify(guests));
    localStorage.setItem('award_categories', JSON.stringify(categories));
}

// === RENDER PRINCIPAL ===
function renderApp() {
    const root = document.getElementById('root');

    let html = '';

    if (currentView === 'landing') {
        html = renderLandingView();
    } else if (currentView === 'login') {
        html = renderAdminLogin();
    } else if (currentView === 'dashboard' && isAuthenticated) {
        html = renderDashboardView();
    }

    // Agregar modales si están activos
    if (showRegistrationModal) {
        html += renderRegistrationModal();
    }

    if (selectedDresscode) {
        html += renderDresscodeGallery();
    }

    root.innerHTML = html;
    
    // Reattach event listeners después de cada render
    attachDresscodeListeners();
    
    // Attach character validation if registration modal is open
    if (showRegistrationModal) {
        attachCharacterValidation();
    }
    
    // Actualizar countdown inmediatamente después de renderizar
    updateCountdown();
}

// === CHARACTER VALIDATION ===
function attachCharacterValidation() {
    const characterInput = document.getElementById('character-input');
    const characterError = document.getElementById('character-error');
    const form = document.getElementById('registration-form');
    
    if (characterInput && characterError) {
        // Validar en tiempo real mientras escribe
        characterInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (isGlindaReserved(value)) {
                characterError.style.display = 'block';
                characterInput.style.borderColor = 'rgba(239,68,68,0.5)';
                characterInput.style.background = 'rgba(239,68,68,0.05)';
            } else {
                characterError.style.display = 'none';
                characterInput.style.borderColor = '';
                characterInput.style.background = '';
            }
        });
        
        // Validar al perder el foco
        characterInput.addEventListener('blur', (e) => {
            const value = e.target.value;
            if (isGlindaReserved(value)) {
                characterError.style.display = 'block';
                characterInput.style.borderColor = 'rgba(239,68,68,0.5)';
            }
        });
    }
}

// Función para detectar "Glinda" en todas sus variaciones
function isGlindaReserved(text) {
    if (!text) return false;
    
    // Normalizar el texto: quitar espacios, acentos y convertir a minúsculas
    const normalized = text
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/\s+/g, '') // Quitar espacios
        .replace(/[^a-z]/g, ''); // Quitar caracteres especiales
    
    // Variaciones de Glinda a detectar
    const glindaVariations = [
        'glinda',
        'glynda',
        'gllinda',
        'gl1nda',
        'glind4',
        'gIinda', // con i mayúscula
        'glindawicked',
        'glindabuena',
        'glindabruja',
        'labuenabruja'
    ];
    
    // Verificar si contiene alguna variación
    return glindaVariations.some(variation => normalized.includes(variation));
}

// === DRESSCODE EVENT LISTENERS ===
function attachDresscodeListeners() {
    // Listeners para abrir galería de dresscode
    const dresscodeButtons = document.querySelectorAll('[data-action="open-dresscode"]');
    dresscodeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const categoryId = button.getAttribute('data-category-id');
            selectedDresscode = DRESSCODE_CATEGORIES.find(c => c.id === categoryId);
            console.log('Opening dresscode:', selectedDresscode);
            renderApp();
        });
    });
    
    // Listeners para cerrar galería de dresscode
    const closeDresscodeButtons = document.querySelectorAll('[data-action="close-dresscode"]');
    closeDresscodeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectedDresscode = null;
            console.log('Closing dresscode');
            renderApp();
        });
    });
}

// === COUNTDOWN ===
function startCountdown() {
    let lastUpdate = 0;
    const updateInterval = 1000; // Actualizar cada segundo
    
    function update(timestamp) {
        if (timestamp - lastUpdate >= updateInterval) {
            updateCountdown();
            lastUpdate = timestamp;
        }
        requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = EVENT_DETAILS.TARGET_DATE - now;

    if (distance < 0) {
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar los valores en el DOM
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// === EVENT HANDLERS ===
function handleGlobalClick(e) {
    const target = e.target;
    const action = target.getAttribute('data-action');

    if (!action) return;

    e.preventDefault();

    switch (action) {
        case 'open-register':
            showRegistrationModal = true;
            renderApp();
            break;
        case 'close-register':
            showRegistrationModal = false;
            renderApp();
            break;
        case 'enter-admin':
            currentView = 'login';
            renderApp();
            break;
        case 'back-to-landing':
            currentView = 'landing';
            isAuthenticated = false;
            renderApp();
            break;
        case 'submit-login':
            handleLogin(e);
            break;
        case 'submit-register':
            handleRegister(e);
            break;
        case 'open-dresscode':
            const categoryId = target.getAttribute('data-category-id');
            selectedDresscode = DRESSCODE_CATEGORIES.find(c => c.id === categoryId);
            renderApp();
            break;
        case 'close-dresscode':
            selectedDresscode = null;
            renderApp();
            break;
        case 'toggle-status':
            const guestId = target.getAttribute('data-guest-id');
            handleToggleStatus(guestId);
            break;
        case 'vote':
            const categoryId2 = target.getAttribute('data-category-id');
            const nomineeId = target.getAttribute('data-nominee-id');
            handleVote(categoryId2, nomineeId);
            break;
        case 'switch-tab':
            currentDashboardTab = target.getAttribute('data-tab');
            renderApp();
            break;
    }
}

function handleLogin(e) {
    const form = e.target.closest('form');
    const username = form.querySelector('#login-username').value;
    const password = form.querySelector('#login-password').value;

    if (username === 'admin' && password === 'admin') {
        isAuthenticated = true;
        currentView = 'dashboard';
        renderApp();
    } else {
        alert('ERROR: CREDENCIALES INVÁLIDAS');
    }
}

function handleRegister(e) {
    const form = e.target.closest('form');
    const formData = new FormData(form);

    const character = formData.get('character');
    
    // Validación mejorada para Glinda en todas sus variaciones
    if (character && isGlindaReserved(character)) {
        // Mostrar el error visual
        const characterInput = document.getElementById('character-input');
        const characterError = document.getElementById('character-error');
        
        if (characterInput && characterError) {
            characterError.style.display = 'block';
            characterInput.style.borderColor = 'rgba(239,68,68,0.5)';
            characterInput.style.background = 'rgba(239,68,68,0.05)';
            characterInput.focus();
            
            // Hacer scroll suave al error
            characterError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        return false;
    }

    const newGuest = {
        id: Date.now().toString(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        age: parseInt(formData.get('age')),
        character: character || 'Por definir',
        status: GUEST_STATUS.CONFIRMED,
        registrationNumber: String(guests.length + 1).padStart(3, '0'),
        qrCode: `QR_${Date.now()}`
    };

    guests.push(newGuest);
    saveToLocalStorage();

    // Mostrar pantalla de éxito
    showSuccessScreen(newGuest);
}

function showSuccessScreen(guest) {
    const modal = document.querySelector('.modal-container');
    if (!modal) return;

    modal.innerHTML = `
        <button class="modal-close" data-action="close-register">✕</button>
        <div style="text-align: center; padding: 2rem 0; animation: fadeIn 0.6s ease-out;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">✓</div>
            <h3 class="font-cinzel text-gold-gradient" style="font-size: 2rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.2em;">¡Registro Exitoso!</h3>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem;">Tu invitación ha sido confirmada</p>
            
            <div style="background: rgba(255,255,255,0.05); border: 2px solid rgba(212,175,55,0.3); padding: 2rem; display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
                <div style="text-align: left;">
                    <span class="font-cinzel" style="font-size: 0.625rem; color: #D4AF37; letter-spacing: 0.3em; display: block; margin-bottom: 0.5rem;">CÓDIGO DE ACCESO</span>
                    <span class="font-cinzel" style="font-size: 3rem; color: white;">${guest.registrationNumber}</span>
                    <div class="font-cinzel" style="font-size: 1.125rem; color: rgba(255,255,255,0.8); text-transform: uppercase; margin-top: 1rem;">${guest.name}</div>
                </div>
                <div style="width: 128px; height: 128px; background: white; padding: 0.5rem;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(JSON.stringify(guest))}" alt="QR" style="width: 100%; height: 100%;" />
                </div>
            </div>
            
            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.4); font-style: italic; margin-bottom: 2rem;">
                📱 Guarda este código QR - Lo necesitarás para entrar a la gala.
            </p>
            
            <button class="btn btn-secondary" data-action="close-register">FINALIZAR</button>
        </div>
    `;
}

function handleToggleStatus(guestId) {
    const guest = guests.find(g => g.id === guestId);
    if (guest) {
        guest.status = guest.status === GUEST_STATUS.CHECKED_IN ? GUEST_STATUS.CONFIRMED : GUEST_STATUS.CHECKED_IN;
        saveToLocalStorage();
        renderApp();
    }
}

function handleVote(categoryId, nomineeId) {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
        const nominee = category.nominees.find(n => n.id === nomineeId);
        if (nominee) {
            nominee.votes++;
            saveToLocalStorage();
            renderApp();
        }
    }
}

// === RENDER COMPONENTS ===
function renderLandingView() {
    return `
        <div class="relative" style="overflow: hidden;">
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-overlay"></div>
                <div class="spotlight spotlight-left"></div>
                <div class="spotlight spotlight-right"></div>
                
                <div class="hero-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <p class="font-cinzel text-gold" style="font-size: 0.875rem; letter-spacing: 0.4em; text-transform: uppercase;">Estás invitado a la gala de</p>
                    <h1 class="hero-title text-gold-gradient">
                        ${EVENT_DETAILS.NAME}
                    </h1>
                    <p class="font-playfair italic" style="font-size: 1.5rem; color: rgba(255,255,255,0.9); letter-spacing: 0.3em;">
                        ${EVENT_DETAILS.HOST} &bull; ${EVENT_DETAILS.SUBTITLE}
                    </p>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 2rem;">
                        <button class="btn btn-primary shine-effect" data-action="open-register">
                            CONFIRMAR ASISTENCIA
                        </button>
                        <a href="#itinerario" class="btn btn-secondary">
                            VER ITINERARIO
                        </a>
                    </div>
                </div>
                
                <div style="position: absolute; bottom: 2.5rem; width: 100%; display: flex; flex-direction: column; align-items: center; color: rgba(212,175,55,0.6); font-family: Cinzel, serif; font-size: 0.875rem; letter-spacing: 0.2em; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <span>${EVENT_DETAILS.DATE}</span>
                        <span style="height: 1rem; width: 1px; background: rgba(212,175,55,0.3);"></span>
                        <span>${EVENT_DETAILS.TIME}</span>
                    </div>
                    <a href="${EVENT_DETAILS.MAP_URL}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.5rem; color: #D4AF37; text-decoration: none; border-bottom: 1px solid rgba(212,175,55,0.2); transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.3em;">
                        📍 <span>${EVENT_DETAILS.LOCATION}</span> 🔗
                    </a>
                </div>
            </section>
            
            <!-- Countdown -->
            <section class="countdown-section">
                <div class="countdown-container">
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-days">00</span>
                        <span class="countdown-label">Días</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-hours">00</span>
                        <span class="countdown-label">Horas</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-minutes">00</span>
                        <span class="countdown-label">Minutos</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-seconds">00</span>
                        <span class="countdown-label">Segundos</span>
                    </div>
                </div>
            </section>
            
            <!-- Dresscode -->
            <section style="padding: 6rem 1.5rem; max-width: 90rem; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 4rem;">
                    <h2 class="font-cinzel text-gold-gradient" style="font-size: 2.25rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Dresscode: Personaje de Cine</h2>
                    <p class="font-playfair italic" style="font-size: 1.25rem; color: rgba(255,255,255,0.5); margin-bottom: 1rem;">"${EVENT_DETAILS.DRESSCODE_QUOTE}"</p>
                    <p class="font-cinzel text-gold" style="font-size: 0.625rem; letter-spacing: 0.3em; text-transform: uppercase;">Selecciona una categoría para ver ejemplos reales</p>
                </div>
                
                <div class="dresscode-grid">
                    ${DRESSCODE_CATEGORIES.map(cat => `
                        <button class="dresscode-card hw-accelerate" data-action="open-dresscode" data-category-id="${cat.id}">
                            <img src="${cat.coverImage}" alt="${cat.title}" loading="lazy" decoding="async" />
                            <div class="dresscode-card-content">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <div style="height: 1px; width: 2rem; background: rgba(212,175,55,0.5); transition: width 0.3s;"></div>
                                    <span class="font-cinzel" style="color: #D4AF37; font-size: 0.625rem; letter-spacing: 0.3em; text-transform: uppercase;">Click para inspirarte</span>
                                </div>
                                <h3>${cat.title}</h3>
                                <p style="font-size: 0.625rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem;">${cat.description}</p>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </section>
            
            <!-- Categories -->
            <section style="padding: 6rem 1.5rem; background: rgba(0,0,0,0.5); border-top: 1px solid rgba(212,175,55,0.1); border-bottom: 1px solid rgba(212,175,55,0.1);">
                <div style="max-width: 90rem; margin: 0 auto;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; gap: 1rem;">
                        <div>
                            <p class="font-cinzel text-gold" style="font-size: 0.75rem; letter-spacing: 0.3em; margin-bottom: 0.5rem; text-transform: uppercase;">Categorías Oficiales</p>
                            <h2 class="font-cinzel" style="font-size: 2.25rem; text-transform: uppercase; letter-spacing: 0.1em;">Estatuillas de la Noche</h2>
                        </div>
                        <p style="max-width: 28rem; color: rgba(255,255,255,0.4); font-size: 0.875rem; text-align: right;">
                            Los premios serán elegidos por el público asistente mediante votación en vivo durante la gala.
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                        ${categories.map(cat => `
                            <div style="padding: 2rem; border: 1px solid rgba(212,175,55,0.1); background: linear-gradient(to bottom right, rgba(212,175,55,0.05), transparent); transition: border-color 0.3s;" onmouseover="this.style.borderColor='rgba(212,175,55,0.3)'" onmouseout="this.style.borderColor='rgba(212,175,55,0.1)'">
                                <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">${cat.icon}</span>
                                <h4 class="font-cinzel text-gold" style="font-size: 1.125rem; margin-bottom: 0.5rem;">${cat.name}</h4>
                                <p style="font-size: 0.625rem; color: rgba(255,255,255,0.3); letter-spacing: 0.3em; text-transform: uppercase;">Nominación Abierta</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            
            <!-- Schedule -->
            <section id="itinerario" style="padding: 8rem 1.5rem;">
                <div class="timeline-container">
                    <h2 class="font-cinzel" style="font-size: 1.875rem; text-align: center; margin-bottom: 6rem; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,255,255,0.9);">
                        Itinerario de la Gala
                    </h2>
                    
                    <div>
                        ${SCHEDULE.map(item => `
                            <div class="timeline-item">
                                <div class="timeline-dot">
                                    <div class="timeline-dot-inner"></div>
                                </div>
                                <div class="font-cinzel text-gold" style="font-size: 1.125rem; letter-spacing: 0.3em; margin-bottom: 0.25rem;">
                                    ${item.time}
                                </div>
                                <h3 class="font-cinzel" style="font-size: clamp(1.5rem, 4vw, 1.875rem); font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
                                    ${item.activity}
                                </h3>
                                <p style="color: rgba(255,255,255,0.4); font-size: 0.875rem; max-width: 32rem;">
                                    ${item.description}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            
            <!-- Venue -->
            <section style="position: relative; padding: 8rem 1.5rem; overflow: hidden; border-top: 1px solid rgba(212,175,55,0.1);">
                <div style="position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop'); background-size: cover; background-attachment: fixed; background-position: center; opacity: 0.2; filter: grayscale(100%);"></div>
                <div style="position: relative; z-index: 10; max-width: 80rem; margin: 0 auto; text-align: center; display: flex; flex-direction: column; gap: 2rem;">
                    <span class="font-cinzel text-gold" style="font-size: 0.875rem; letter-spacing: 0.5em; text-transform: uppercase;">The Location</span>
                    <h2 class="font-cinzel text-gold-gradient" style="font-size: clamp(3rem, 10vw, 6rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em;">
                        ${EVENT_DETAILS.LOCATION}
                    </h2>
                    <p class="font-playfair italic" style="color: rgba(255,255,255,0.8); font-size: clamp(1.25rem, 4vw, 2.25rem); max-width: 48rem; margin: 0 auto; line-height: 1.3;">
                        Luces, cámara y el máximo hype. El spot oficial donde vamos a hacer historia y celebrar la noche más icónica del año.
                    </p>
                    <div style="padding-top: 2rem;">
                        <a href="${EVENT_DETAILS.MAP_URL}" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 1rem;">
                            🧭 Ver Mapa Oficial
                        </a>
                    </div>
                </div>
            </section>
            
            <!-- Footer -->
            <footer style="position: relative; padding: 10rem 1.5rem; text-align: center; background: black; overflow: hidden; border-top: 1px solid rgba(212,175,55,0.1);">
                <div style="max-width: 64rem; margin: 0 auto; display: flex; flex-direction: column; gap: 5rem;">
                    <h4 class="font-cinzel" style="font-size: clamp(1.875rem, 5vw, 3rem); color: white; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 900;">
                        ¿ESTÁS LISTO PARA SER LA ESTRELLA?
                    </h4>
                    
                    <div style="display: flex; justify-content: center;">
                        <button class="btn btn-primary shine-effect" data-action="open-register" style="padding: 1.75rem 5rem; font-size: 1.125rem;">
                            SÍ, CONFIRMO MI ASISTENCIA
                        </button>
                    </div>
                    
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4rem 4rem; padding-top: 2.5rem;">
                        <div class="font-cinzel" style="display: flex; align-items: center; gap: 0.75rem; color: rgba(255,255,255,0.5); font-size: 0.75rem; letter-spacing: 0.4em; text-transform: uppercase;">
                            📍 <span>${EVENT_DETAILS.LOCATION}</span>
                        </div>
                        <div class="font-cinzel" style="display: flex; align-items: center; gap: 0.75rem; color: rgba(255,255,255,0.5); font-size: 0.75rem; letter-spacing: 0.4em; text-transform: uppercase;">
                            ⭐ <span>ESTRICTO DRESSCODE</span>
                        </div>
                        <div class="font-cinzel" style="display: flex; align-items: center; gap: 0.75rem; color: rgba(255,255,255,0.5); font-size: 0.75rem; letter-spacing: 0.4em; text-transform: uppercase;">
                            🎫 <span>RSVP</span>
                        </div>
                    </div>
                    
                    <div style="padding-top: 6rem; opacity: 0.3; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.3'">
                        <button class="font-cinzel" data-action="enter-admin" style="font-size: 0.625rem; color: rgba(255,255,255,0.3); letter-spacing: 0.6em; text-transform: uppercase; background: transparent; border: none; cursor: pointer; transition: color 0.3s;" onmouseover="this.style.color='#D4AF37'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">
                            SISTEMA DE GESTIÓN ADMINISTRATIVA
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

function renderRegistrationModal() {
    return `
        <div class="modal-overlay animate-fadeIn">
            <div class="modal-container">
                <button class="modal-close" data-action="close-register">✕</button>
                
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div style="text-align: center; display: flex; flex-direction: column; gap: 1rem;">
                        <div class="animate-bounce" style="font-size: 2.5rem;">🎭</div>
                        <h2 class="font-cinzel text-gold-gradient" style="font-size: 1.875rem; letter-spacing: 0.3em; text-transform: uppercase;">Confirmar Asistencia</h2>
                        <p class="font-playfair italic" style="color: rgba(255,255,255,0.5);">Regístrate para la gala más esperada del año</p>
                    </div>
                    
                    <form id="registration-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" name="name" class="form-input" placeholder="Ej: María Fernanda González" required />
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                            <div class="form-group">
                                <label class="form-label">Edad *</label>
                                <input type="number" name="age" class="form-input" required />
                            </div>
                            <div class="form-group">
                                <label class="form-label">Teléfono *</label>
                                <input type="tel" name="phone" class="form-input" required />
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Correo Electrónico *</label>
                            <input type="email" name="email" class="form-input" placeholder="tu@email.com" required />
                        </div>
                        
                        <div style="padding-top: 1rem; border-top: 1px solid rgba(212,175,55,0.1);">
                            <div class="form-group">
                                <label class="form-label">Disfraz / Personaje</label>
                                <input type="text" id="character-input" name="character" class="form-input" placeholder="Ej: John Wick, Mia Wallace..." />
                                <div id="character-error" style="display: none; margin-top: 0.5rem; padding: 0.75rem; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 4px;">
                                    <div style="display: flex; align-items: start; gap: 0.75rem;">
                                        <span style="font-size: 1.5rem;">👑</span>
                                        <div style="flex: 1;">
                                            <p style="font-size: 0.875rem; color: #fca5a5; font-family: Cinzel, serif; font-weight: bold; margin-bottom: 0.25rem;">PERSONAJE RESERVADO</p>
                                            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.7); line-height: 1.5;">
                                                Este personaje está exclusivamente reservado para la anfitriona principal de la gala. Por favor, selecciona otro personaje icónico para tu entrada triunfal.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(212,175,55,0.1); border-radius: 0.25rem; display: flex; align-items: start; gap: 1rem; margin-top: 1rem;">
                                <span style="color: #D4AF37; flex-shrink: 0;">ℹ️</span>
                                <p style="font-size: 0.625rem; color: rgba(255,255,255,0.5); font-style: italic; line-height: 1.6;">
                                    Protocolo de Gala: Se solicita a los distinguidos invitados evitar el personaje de <span style="color: #D4AF37; font-weight: bold;">"${EVENT_DETAILS.RESERVED_CHARACTER}"</span>, ya que es el disfraz seleccionado por la anfitriona principal para la apertura de la noche.
                                </p>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary shine-effect" data-action="submit-register" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                            <span>🎫</span> CONFIRMAR MI REGISTRO
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderDresscodeGallery() {
    if (!selectedDresscode) return '';

    return `
        <div class="modal-overlay animate-fadeIn" style="z-index: 110; position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(0,0,0,0.98); backdrop-filter: blur(10px);">
            <div class="modal-container" style="position: relative; background: linear-gradient(to bottom, #0A0A0A, #050505); border: 1px solid rgba(212,175,55,0.3); width: 100%; max-width: 90rem; max-height: 95vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.9);">
                <button class="modal-close" data-action="close-dresscode" style="position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10; width: 3rem; height: 3rem; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); border: 1px solid rgba(212,175,55,0.3); color: #D4AF37; border-radius: 50%; cursor: pointer; transition: all 0.4s; box-shadow: 0 0 20px rgba(212,175,55,0.3); font-family: Cinzel, serif; font-size: 1.25rem; font-weight: 300; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(212,175,55,0.1)'; this.style.borderColor='#D4AF37'; this.style.transform='rotate(90deg) scale(1.1)'; this.style.boxShadow='0 0 30px rgba(212,175,55,0.6)';" onmouseout="this.style.background='rgba(0,0,0,0.9)'; this.style.borderColor='rgba(212,175,55,0.3)'; this.style.transform='rotate(0deg) scale(1)'; this.style.boxShadow='0 0 20px rgba(212,175,55,0.3)';">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div style="padding: 3rem 2rem;">
                    <!-- Header Section -->
                    <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(212,175,55,0.1);">
                        <div style="display: flex; align-items: start; gap: 1.5rem;">
                            <div style="flex-shrink: 0;">
                                <div style="width: 5rem; height: 5rem; border-radius: 50%; background: linear-gradient(to bottom right, rgba(212,175,55,0.2), transparent); border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(212,175,55,0.2);">
                                    <span style="font-size: 2rem;">⭐</span>
                                </div>
                            </div>
                            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.75rem;">
                                <span class="font-cinzel" style="color: rgba(212,175,55,0.6); font-size: 0.75rem; letter-spacing: 0.4em; text-transform: uppercase; display: block;">Inspiración Dresscode</span>
                                <h3 class="font-cinzel text-gold-gradient" style="font-size: clamp(2rem, 5vw, 3.5rem); text-transform: uppercase; font-weight: 900; letter-spacing: -0.02em;">${selectedDresscode.title}</h3>
                                <p class="font-playfair italic" style="color: rgba(255,255,255,0.7); font-size: clamp(1rem, 2vw, 1.25rem); max-width: 50rem; line-height: 1.6;">
                                    ${selectedDresscode.description}
                                </p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.1); border-radius: 4px;">
                            <span style="font-size: 1rem;">🔒</span>
                            <p style="font-size: 0.875rem; color: rgba(212,175,55,0.5); font-family: Cinzel, serif; letter-spacing: 0.1em; text-transform: uppercase;">
                                Nota: Los personajes marcados como reservados no permiten duplicados
                            </p>
                        </div>
                    </div>

                    <!-- Gallery Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
                        ${selectedDresscode.examples.map(example => {
        const isReserved = example.character.toLowerCase().includes('reservado');
        return `
                            <div style="display: flex; flex-direction: column; gap: 0.75rem; transition: transform 0.3s;" onmouseover="if(!${isReserved}) this.style.transform='translateY(-4px)';" onmouseout="this.style.transform='translateY(0)';">
                                <div style="position: relative; aspect-ratio: 2/3; overflow: hidden; background: linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent); border: 1px solid ${isReserved ? 'rgba(127,29,29,0.3)' : 'rgba(212,175,55,0.2)'}; transition: all 0.5s; box-shadow: 0 0 20px ${isReserved ? 'rgba(127,29,29,0.2)' : 'rgba(212,175,55,0.1)'};' onmouseover="if(!${isReserved}) { this.style.borderColor='rgba(212,175,55,0.5)'; this.style.boxShadow='0 0 30px rgba(212,175,55,0.3)'; }" onmouseout="if(!${isReserved}) { this.style.borderColor='rgba(212,175,55,0.2)'; this.style.boxShadow='0 0 20px rgba(212,175,55,0.1)'; }">
                                    <img src="${example.image}" alt="${example.character}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; ${isReserved ? 'opacity: 0.3; filter: grayscale(100%);' : ''}" onerror="this.style.display='none'; this.parentElement.innerHTML+='<div style=\\'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem;\\'><div style=\\'width: 3rem; height: 3rem; border-radius: 50%; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;\\'><svg style=\\'width: 1.5rem; height: 1.5rem; color: rgba(212,175,55,0.4);\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\\'></path></svg></div><span style=\\'color: rgba(212,175,55,0.4); font-size: 0.625rem; font-family: Cinzel, serif; letter-spacing: 0.1em; text-transform: uppercase;\\'>Agrega tu foto aquí</span></div>';" onmouseover="if(!${isReserved}) this.style.transform='scale(1.1)';" onmouseout="if(!${isReserved}) this.style.transform='scale(1)';" />
                                    ${isReserved ? `
                                        <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0.75rem; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);">
                                            <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: rgba(127,29,29,0.2); border: 1px solid rgba(127,29,29,0.3); display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                                <span style="font-size: 1.125rem; color: #ef4444;">🔒</span>
                                            </div>
                                            <span style="background: linear-gradient(to right, #7f1d1d, #991b1b); color: white; padding: 0.25rem 0.5rem; font-family: Cinzel, serif; font-size: 0.5625rem; font-weight: bold; letter-spacing: 0.3em; text-transform: uppercase; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                                                Reservado
                                            </span>
                                            <p style="font-size: 0.5625rem; color: rgba(255,255,255,0.8); margin-top: 0.5rem; font-family: Cinzel, serif; line-height: 1.3; letter-spacing: 0.05em;">
                                                Personaje<br/>Exclusivo
                                            </p>
                                        </div>
                                    ` : `<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.2); transition: opacity 0.3s;" onmouseover="this.style.opacity='0';" onmouseout="this.style.opacity='1';"></div>`}
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                                    <h4 class="font-cinzel" style="font-size: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.2; color: ${isReserved ? 'rgba(239,68,68,0.6)' : '#D4AF37'}; transition: color 0.3s;" onmouseover="if(!${isReserved}) this.style.color='white';" onmouseout="if(!${isReserved}) this.style.color='#D4AF37';">${example.character.replace(' (RESERVADO)', '')}</h4>
                                    <p style="font-size: 0.625rem; color: rgba(255,255,255,0.4); font-family: Cinzel, serif; letter-spacing: 0.15em; text-transform: uppercase; display: flex; align-items: center; gap: 0.375rem;">
                                        <span style="font-size: 0.5rem;">▶️</span> ${example.movie}
                                    </p>
                                </div>
                            </div>
                        `;
    }).join('')}
                    </div>

                    <!-- Footer Button -->
                    <div style="text-align: center; padding-top: 2rem; border-top: 1px solid rgba(212,175,55,0.1);">
                        <button class="btn btn-primary" data-action="close-dresscode" style="font-family: Cinzel, serif; background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728); color: black; padding: 1rem 3rem; letter-spacing: 0.2em; font-weight: bold; text-transform: uppercase; cursor: pointer; border: none; transition: all 0.3s; box-shadow: 0 0 20px rgba(212,175,55,0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 30px rgba(212,175,55,0.5)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 20px rgba(212,175,55,0.3)';">
                            Cerrar Galería
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAdminLogin() {
    return `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: black; position: relative; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 70%); pointer-events: none;"></div>
            
            <div style="position: relative; width: 100%; max-width: 28rem; animation: fadeIn 0.6s ease-out;">
                <button data-action="back-to-landing" style="position: absolute; top: -3rem; left: 0; color: rgba(255,255,255,0.3); display: flex; align-items: center; gap: 0.5rem; font-family: Cinzel, serif; font-size: 0.625rem; letter-spacing: 0.3em; background: transparent; border: none; cursor: pointer; transition: color 0.3s; text-transform: uppercase;" onmouseover="this.style.color='#D4AF37'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">
                    ✕ VOLVER A LA GALA
                </button>
                
                <div style="background: #0c0c0c; border: 1px solid rgba(212,175,55,0.2); padding: 3rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); display: flex; flex-direction: column; gap: 2.5rem;">
                    <div style="text-align: center; display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: inline-flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; border: 1px solid rgba(212,175,55,0.3); border-radius: 50%; margin: 0 auto 1rem;">
                            <span style="font-size: 1.5rem;">🔒</span>
                        </div>
                        <h2 class="font-cinzel text-gold-gradient" style="font-size: 1.5rem; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 900;">Admin Access</h2>
                        <p class="font-playfair italic" style="color: rgba(255,255,255,0.4); font-size: 0.875rem;">Ingrese credenciales de seguridad</p>
                    </div>
                    
                    <form id="login-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label class="form-label" style="color: rgba(212,175,55,0.6);">Usuario</label>
                            <div style="position: relative;">
                                <input type="text" id="login-username" class="form-input font-cinzel" placeholder="admin" required style="padding-left: 3rem; font-size: 0.875rem;" />
                                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.2);">👤</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" style="color: rgba(212,175,55,0.6);">Contraseña</label>
                            <div style="position: relative;">
                                <input type="password" id="login-password" class="form-input font-cinzel" placeholder="••••••••" required style="padding-left: 3rem; font-size: 0.875rem;" />
                                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.2);">🔒</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" data-action="submit-login" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 1rem; letter-spacing: 0.3em;">
                            AUTENTICAR <span>→</span>
                        </button>
                    </form>
                    
                    <p class="font-cinzel" style="text-align: center; font-size: 0.5rem; color: rgba(255,255,255,0.1); letter-spacing: 0.2em; text-transform: uppercase;">
                        Sistema Encriptado de Gestión de Eventos VIP
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderDashboardView() {
    const filteredGuests = guests.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.character.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return `
        <div style="min-height: 100vh; background: #0A0A0A; color: white; display: flex; flex-direction: column;">
            <!-- Header -->
            <header style="position: sticky; top: 0; z-index: 40; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212,175,55,0.2); padding: 1rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button data-action="back-to-landing" style="color: #D4AF37; display: flex; align-items: center; gap: 0.5rem; font-family: Cinzel, serif; font-size: 0.75rem; text-transform: uppercase; background: transparent; border: none; cursor: pointer; transition: color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#D4AF37'">
                        ← Volver
                    </button>
                    <h2 class="font-cinzel text-gold-gradient" style="font-size: 1.25rem; letter-spacing: 0.2em; font-weight: 900; text-transform: uppercase;">Hollywood Admin</h2>
                </div>
                
                <nav class="tabs-container">
                    ${[
            { id: 'guests', label: 'Invitados', icon: '👥' },
            { id: 'checkin', label: 'Check-In', icon: '📸' },
            { id: 'voting', label: 'Votaciones', icon: '🗳️' },
            { id: 'results', label: 'Resultados', icon: '📊' }
        ].map(tab => `
                        <button class="tab-button ${currentDashboardTab === tab.id ? 'active' : ''}" data-action="switch-tab" data-tab="${tab.id}">
                            <span>${tab.icon}</span>
                            <span class="hidden sm:inline">${tab.label}</span>
                        </button>
                    `).join('')}
                </nav>
            </header>
            
            <!-- Content -->
            <main style="flex: 1; padding: 1.5rem; max-width: 90rem; margin: 0 auto; width: 100%;">
                ${currentDashboardTab === 'guests' ? renderGuestsTab(filteredGuests) : ''}
                ${currentDashboardTab === 'checkin' ? renderCheckinTab() : ''}
                ${currentDashboardTab === 'voting' ? renderVotingTab() : ''}
                ${currentDashboardTab === 'results' ? renderResultsTab() : ''}
            </main>
        </div>
    `;
}

function renderGuestsTab(filteredGuests) {
    return `
        <div class="animate-fadeIn" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                <h3 class="font-cinzel" style="font-size: 1.5rem;">Control de Invitados</h3>
                <div style="position: relative; width: 100%; max-width: 20rem;">
                    <input type="text" placeholder="Buscar por nombre o personaje..." class="form-input" style="padding-left: 3rem; border-radius: 9999px; font-size: 0.875rem;" oninput="searchTerm = this.value; renderApp();" value="${searchTerm}" />
                    <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3);">🔍</span>
                </div>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Personaje</th>
                            <th>Estatus</th>
                            <th style="text-align: right;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredGuests.map(g => `
                            <tr>
                                <td style="font-weight: 500;">${g.name}</td>
                                <td style="font-style: italic; color: rgba(255,255,255,0.5);">${g.character}</td>
                                <td>
                                    <span class="badge ${g.status === GUEST_STATUS.CHECKED_IN ? 'badge-checked-in' : g.status === GUEST_STATUS.CONFIRMED ? 'badge-confirmed' : 'badge-pending'}">
                                        ${g.status}
                                    </span>
                                </td>
                                <td style="text-align: right;">
                                    <button class="btn" data-action="toggle-status" data-guest-id="${g.id}" style="font-size: 0.625rem; padding: 0.25rem 0.75rem; ${g.status === GUEST_STATUS.CHECKED_IN ? 'border: 1px solid rgba(239,68,68,0.3); color: #EF4444;' : 'border: 1px solid rgba(212,175,55,0.3); color: #D4AF37;'}">
                                        ${g.status === GUEST_STATUS.CHECKED_IN ? 'Cancelar Entrada' : 'Marcar Entrada'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderCheckinTab() {
    return `
        <div class="animate-fadeIn" style="min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 2rem;">
            <div style="position: relative; width: 16rem; height: 16rem; border: 2px solid rgba(212,175,55,0.3); border-radius: 1.5rem; overflow: hidden; background: black; display: flex; align-items: center; justify-content: center;">
                <div class="animate-scan" style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #D4AF37; box-shadow: 0 0 20px rgba(212,175,55,1);"></div>
                <span class="font-cinzel italic" style="color: rgba(255,255,255,0.2); font-size: 0.875rem; padding: 2rem; text-align: center;">MODO ESCÁNER ACTIVO<br/>(Cámara Simulada)</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <h4 class="font-cinzel text-gold" style="font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.3em;">Apunta el Código QR</h4>
                <p style="max-width: 20rem; color: rgba(255,255,255,0.4); font-size: 0.875rem;">
                    Utiliza la cámara para validar entradas automáticamente y asignar números de participante.
                </p>
            </div>
        </div>
    `;
}

function renderVotingTab() {
    return `
        <div class="animate-fadeIn" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${categories.map(cat => `
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span style="font-size: 1.875rem;">${cat.icon}</span>
                        <h3 class="font-cinzel text-gold-gradient" style="font-size: 1.25rem; text-transform: uppercase;">${cat.name}</h3>
                    </div>
                    <div style="display: grid; gap: 0.75rem;">
                        ${cat.nominees.map(nom => `
                            <button data-action="vote" data-category-id="${cat.id}" data-nominee-id="${nom.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); text-align: left; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='rgba(212,175,55,0.5)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <div>
                                    <div style="font-weight: bold; color: white; transition: color 0.3s;" onmouseover="this.style.color='#D4AF37'" onmouseout="this.style.color='white'">${nom.name}</div>
                                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); font-style: italic;">como ${nom.character}</div>
                                </div>
                                <div class="font-cinzel" style="color: #D4AF37; font-size: 1.125rem; background: rgba(212,175,55,0.05); padding: 0.25rem 1rem; border: 1px solid rgba(212,175,55,0.2);">
                                    ${nom.votes}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <button style="width: 100%; padding: 1rem; border: 2px dashed rgba(255,255,255,0.1); color: rgba(255,255,255,0.2); font-family: Cinzel, serif; font-size: 0.75rem; background: transparent; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.borderColor='rgba(212,175,55,0.3)'; this.style.color='#D4AF37';" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.color='rgba(255,255,255,0.2)';">
                        + AÑADIR NOMINADO
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function renderResultsTab() {
    return `
        <div class="animate-fadeIn" style="display: flex; flex-direction: column; gap: 3rem;">
            <div style="text-align: center;">
                <h3 class="font-cinzel text-gold-gradient" style="font-size: 2.25rem; text-transform: uppercase; margin-bottom: 0.5rem;">Ranking en Vivo</h3>
                <p style="color: rgba(255,255,255,0.4); font-size: 0.875rem;">Monitorea la tendencia de votos por categoría</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
                ${categories.map(cat => {
        const sortedNominees = [...cat.nominees].sort((a, b) => b.votes - a.votes);
        const winner = sortedNominees[0];

        return `
                        <div style="position: relative; padding: 2.5rem; background: linear-gradient(to bottom right, rgba(212,175,55,0.1), transparent); border: 1px solid rgba(212,175,55,0.2); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden;">
                            <span style="position: absolute; top: -1rem; right: -1rem; font-size: 8rem; opacity: 0.05;">🏆</span>
                            
                            <div style="position: relative; z-index: 10; display: flex; flex-direction: column; gap: 2rem;">
                                <div>
                                    <p class="font-cinzel text-gold" style="font-size: 0.625rem; letter-spacing: 0.3em; text-transform: uppercase;">${cat.name}</p>
                                    <h4 class="font-cinzel" style="font-size: 1.5rem; text-transform: uppercase;">Líder Actual</h4>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 1.5rem;">
                                    <div style="width: 6rem; height: 6rem; border-radius: 50%; background: rgba(212,175,55,0.2); border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                                        ${winner.emoji}
                                    </div>
                                    <div style="flex: 1;">
                                        <div class="font-cinzel text-gold-gradient" style="font-size: 1.5rem;">${winner.name}</div>
                                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); font-style: italic; margin-bottom: 0.5rem;">como ${winner.character}</div>
                                        <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                                            <span style="font-size: 2.5rem; font-weight: 900; color: white;">${winner.votes}</span>
                                            <span class="font-cinzel" style="font-size: 0.625rem; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.3em; font-weight: bold;">Puntos</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    ${sortedNominees.map(nom => `
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <div style="flex: 1; background: rgba(255,255,255,0.05); height: 2rem; border-radius: 0.25rem; overflow: hidden;">
                                                <div style="height: 100%; background: ${nom === winner ? '#D4AF37' : 'rgba(255,255,255,0.2)'}; width: ${Math.max((nom.votes / Math.max(...sortedNominees.map(n => n.votes))) * 100, 5)}%; transition: width 0.3s;"></div>
                                            </div>
                                            <span class="font-cinzel" style="font-size: 0.625rem; color: rgba(255,255,255,0.6); min-width: 6rem;">${nom.name}</span>
                                            <span class="font-cinzel" style="font-size: 0.75rem; color: #D4AF37; min-width: 2rem; text-align: right;">${nom.votes}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            
            <div style="text-align: center; padding-top: 2rem;">
                <button class="btn" style="background: rgba(127,29,29,0.5); border: 1px solid #EF4444; color: white; padding: 1rem 3rem; letter-spacing: 0.3em; font-family: Cinzel, serif; text-transform: uppercase; transition: background 0.3s;" onmouseover="this.style.background='rgb(127,29,29)'" onmouseout="this.style.background='rgba(127,29,29,0.5)'">
                    Cerrar Votaciones y Definir Ganadores
                </button>
            </div>
        </div>
    `;
}
