let timeLeft = 270; // 4:30 in seconds
let position = 3;
const timerDisplay = document.getElementById('timer-display');
const queueStatus = document.getElementById('queue-status');
const queueSubtext = document.getElementById('queue-subtext');
const progressFill = document.getElementById('progress-fill');
const statusTitle = document.getElementById('status-title');
const heroSection = document.getElementById('hero-section');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateUI() {
    timerDisplay.textContent = formatTime(timeLeft);

    // Calculate progress (starting from 33% at 4:30 to 100% at 0:00)
    const progress = 33 + ((270 - timeLeft) / 270) * 67;
    progressFill.style.width = `${Math.min(progress, 100)}%`;

    if (position > 1) {
        queueStatus.innerHTML = `Eres el número <span class="font-bold text-primary">${position}</span> en la fila de preparación`;
        queueSubtext.textContent = `${position - 1} pedidos antes que el tuyo`;
    } else if (position === 1 && timeLeft > 0) {
        queueStatus.innerHTML = `¡Siguiente en la fila! <span class="font-bold text-primary">Tu pedido casi está listo</span>`;
        queueSubtext.textContent = `Preparando tus piezas de pollo...`;
    }

    if (timeLeft <= 0 && position === 1) {
        // Success State
        statusTitle.textContent = "✅ ¡Tu pedido está listo para recoger!";
        statusTitle.classList.remove('text-primary');
        statusTitle.classList.add('text-green-600');
        timerDisplay.textContent = "¡LISTO!";
        timerDisplay.classList.add('text-green-600');
        queueStatus.innerHTML = "Dirígete al mostrador #1";
        queueSubtext.textContent = "Presenta tu número de orden #KFC-8743";
        progressFill.classList.replace('bg-primary', 'bg-green-600');
        clearInterval(timerInterval);
        clearInterval(positionInterval);
    }
}

// Timer counts down every second
const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateUI();
    }
}, 1000);

// Position improves every 10 seconds
const positionInterval = setInterval(() => {
    if (position > 1) {
        position--;
        timeLeft = Math.max(0, timeLeft - 60);
        updateUI();
    }
}, 10000);

// Initial UI update
updateUI();
