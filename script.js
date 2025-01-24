const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-item');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;
const maxDots = 5;

// Cria as bolinhas de navegação
function createDots() {
    const dotsCount = Math.min(items.length, maxDots);
    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('button');
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

// Atualiza as bolinhas de navegação
function updateDots() {
    const dots = document.querySelectorAll('.carousel-dots button');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex % Math.min(items.length, maxDots)) {
            dot.classList.add('active');
        }
    });
}

// Atualiza o carrossel para exibir o próximo projeto
function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    track.style.transition = 'transform 0.5s ease-in-out'; // Animação suave
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Reseta a posição para o loop infinito (sem salto visual)
    if (currentIndex === items.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0; // Reseta o índice para o início
            track.style.transform = `translateX(0px)`;
        }, 500); // Aguarda a animação terminar antes de resetar
    }
}

// Configura o intervalo para passar os itens automaticamente
setInterval(() => {
    currentIndex = (currentIndex + 1) % (items.length + 1); // Inclui o loop infinito
    updateCarousel();
    updateDots();
}, 6000); // 6 segundos por item

createDots();

// Adiciona a lógica para o botão "Voltar ao Topo"
const btnVoltarTopo = document.getElementById('btnVoltarTopo');

// Mostra o botão ao rolar para baixo
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnVoltarTopo.classList.add('show');
    } else {
        btnVoltarTopo.classList.remove('show');
    }
});

// Rola suavemente para o topo ao clicar no botão
btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

