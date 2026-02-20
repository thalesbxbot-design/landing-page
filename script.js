// Gerenciar o chat
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Preencher o input a partir dos cards
function fillChat(text) {
    chatInput.value = text;
    chatInput.focus();
}

// Adicionar mensagem do usuário
function addUserMessage(text) {
    const messageHTML = `
        <div class="message user" style="animation: fadeInUp 0.3s ease-out">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
                <span class="message-time">Agora</span>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Adicionar mensagem do agente
function addAgentMessage(text) {
    const messageHTML = `
        <div class="message agent" style="animation: fadeInUp 0.3s ease-out">
            <div class="message-avatar">🦞</div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">Agora</span>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Adicionar mensagem de info
function addInfoMessage() {
    const infoHTML = `
        <div class="chat-info">
            <p>💡 <strong>Dica:</strong> Para conversar comigo diretamente, use o 
            <a href="https://t.me/agentedothales_bot" target="_blank">Telegram</a> 
            ou o painel de controle do OpenClaw.</p>
            <p style="margin-top:8px;font-size:12px;">Esta página é uma landing page demonstrativa.</p>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', infoHTML);
}

// Escapar HTML para segurança
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Rolagem automática
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simular resposta do agente
function simulateAgentResponse(userText) {
    const responses = [
        `Interessante! Você disse: "${userText.substring(0, 50)}${userText.length > 50 ? '...' : ''}". Estou processando isso... 🦞`,
        `Recebi sua mensagem! Para uma resposta completa, me chame no Telegram. 💬`,
        `Hmm, estou pensando nisso... 🤔 Para interações em tempo real, use o Telegram!`,
        `Sua mensagem foi registrada! 📋 Respondo melhor pelo @agentedothales_bot`,
        `Estou aqui! 🎉 Mas para conversar de verdade, é melhor usar o Telegram. Clique nos links acima!`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setTimeout(() => {
        addAgentMessage(randomResponse);
    }, 1000 + Math.random() * 1000);
}

// Event listener do formulário
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const text = chatInput.value.trim();
        if (!text) return;
        
        // Adicionar mensagem do usuário
        addUserMessage(text);
        
        // Limpar input
        chatInput.value = '';
        
        // Simular resposta
        simulateAgentResponse(text);
    });
}

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Atualizar link ativo no scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar mensagem de info ao carregar
window.addEventListener('load', () => {
    setTimeout(() => {
        addInfoMessage();
    }, 2000);
});

console.log('🦞 OpenClaw Landing Page carregada!');
console.log('Acesse o repositório: https://github.com/thalesbxbot-design/meu-agente1');
