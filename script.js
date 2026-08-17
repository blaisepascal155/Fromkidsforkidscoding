// ===== Global Variables =====
let secretNumber = Math.floor(Math.random() * 10) + 1;
let colorOptions = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let currentColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeColorBox();
    setupScrollSpyNavigation();
});

// ===== Toggle Tutorial Content =====
function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    
    // Hide all other tutorials
    document.querySelectorAll('.tutorial-content').forEach(el => {
        if (el.id !== contentId) {
            el.classList.add('hidden');
        }
    });
    
    // Toggle current tutorial
    content.classList.toggle('hidden');
}

// ===== Challenge 1: Guess the Number =====
function checkGuess() {
    const input = document.getElementById('guessInput');
    const resultEl = document.getElementById('guessResult');
    const guess = parseInt(input.value);
    
    if (isNaN(guess)) {
        resultEl.textContent = '❌ Please enter a number!';
        resultEl.style.color = '#FF6B6B';
        return;
    }
    
    if (guess === secretNumber) {
        resultEl.textContent = '🎉 Correct! You guessed it! The number was ' + secretNumber;
        resultEl.style.color = '#4ECDC4';
        secretNumber = Math.floor(Math.random() * 10) + 1;
        input.value = '';
    } else if (guess < secretNumber) {
        resultEl.textContent = '📈 Too low! Try a higher number!';
        resultEl.style.color = '#FFB84D';
    } else {
        resultEl.textContent = '📉 Too high! Try a lower number!';
        resultEl.style.color = '#FFB84D';
    }
}

// Allow Enter key in number input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (document.activeElement.id === 'guessInput') {
            checkGuess();
        } else if (document.activeElement.id === 'colorInput') {
            checkColor();
        }
    }
});

// ===== Challenge 2: Color Name Game =====
function initializeColorBox() {
    const colorBox = document.getElementById('colorBox');
    colorBox.style.backgroundColor = currentColor;
    
    // Add animation
    colorBox.style.animation = 'none';
    setTimeout(() => {
        colorBox.style.animation = 'pulse 2s infinite';
    }, 10);
}

function checkColor() {
    const input = document.getElementById('colorInput');
    const resultEl = document.getElementById('colorResult');
    const guess = input.value.toLowerCase().trim();
    
    if (guess === '') {
        resultEl.textContent = '❌ Please enter a color name!';
        resultEl.style.color = '#FF6B6B';
        return;
    }
    
    if (guess === currentColor) {
        resultEl.textContent = '🎉 Correct! It was ' + currentColor + '!';
        resultEl.style.color = '#4ECDC4';
        currentColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        initializeColorBox();
        input.value = '';
    } else {
        resultEl.textContent = '❌ Nope! That\'s not it. Try again!';
        resultEl.style.color = '#FF6B6B';
    }
}

// ===== Smooth Scroll Navigation =====
function setupScrollSpyNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Add Pulse Animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
        }
        50% {
            box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.1);
        }
    }
`;
document.head.appendChild(style);

// ===== Console Easter Egg =====
console.log('🎉 Welcome to Kids Code Lab!');
console.log('You found the console! Here\'s a secret: You\'re already learning to code! 🚀');
console.log('Keep exploring and learning!');
