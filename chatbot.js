class NumerologiaBot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        this.messageInput.value = '';
        this.sendButton.disabled = true;

        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
            this.sendButton.disabled = false;
        }, 1500);
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('análise completa') || lowerMessage.includes('analise completa')) {
            const nome = message.replace(/análise completa|analise completa/gi, '').trim();
            if (nome) {
                this.analisarNomeCompleto(nome);
            } else {
                this.addBotMessage(`
                    <p>Para análise completa, digite: "análise completa [nome da empresa]"</p>
                    <p>Exemplo: "análise completa Empresa XYZ"</p>
                `);
            }
        } else if (lowerMessage.includes('motivação') || lowerMessage.includes('motivacao')) {
            const nome = message.replace(/motivação|motivacao/gi, '').trim();
            if (nome) {
                this.analisarMotivacao(nome);
            } else {
                this.addBotMessage(`<p>Digite o nome para análise de motivação!</p>`);
            }
        } else if (lowerMessage.includes('impressão') || lowerMessage.includes('impressao')) {
            const nome = message.replace(/impressão|impressao/gi, '').trim();
            if (nome) {
                this.analisarImpressao(nome);
            } else {
                this.addBotMessage(`<p>Digite o nome para análise de impressão!</p>`);
            }
        } else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
            this.addBotMessage(`
                <p>Olá! 😊 Que bom te ver aqui!</p>
                <p>Sou especialista em numerologia empresarial. Digite o nome da sua empresa ou uma pessoa para eu fazer a análise numerológica completa!</p>
            `);
        } else if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
            this.addBotMessage(`
                <p>Posso te ajudar com:</p>
                <ul>
                    <li>📊 <strong>Análise básica</strong> - Digite qualquer nome</li>
                    <li>🔍 <strong>Análise completa</strong> - Digite "análise completa [nome]"</li>
                    <li>💭 <strong>Número de Motivação</strong> - Digite "motivação [nome]"</li>
                    <li>👁️ <strong>Número de Impressão</strong> - Digite "impressão [nome]"</li>
                    <li>🔢 <strong>Significados dos números</strong> - Digite um número de 1 a 33</li>
                    <li>💡 <strong>Sugestões de nomes</strong> - Digite "sugestões" + número desejado</li>
                </ul>
                <p><strong>Exemplos:</strong></p>
                <p>• "análise completa Empresa XYZ"<br>• "motivação Google"<br>• "impressão Apple"</p>
            `);
        } else if (lowerMessage.includes('sugestões') || lowerMessage.includes('sugestoes')) {
            const numero = this.extrairNumero(message);
            if (numero) {
                this.gerarSugestoes(numero);
            } else {
                this.addBotMessage(`
                    <p>Para gerar sugestões, digite o número desejado!</p>
                    <p>Exemplo: "sugestões para número 1" ou "sugestões 8"</p>
                `);
            }
        } else if (this.isNumero(message)) {
            const numero = parseInt(message);
            this.explicarNumero(numero);
        } else {
            this.analisarNome(message);
        }
    }

    analisarNome(nome) {
        const analise = Numerologia.analisarNome(nome);
        
        if (!analise) {
            this.addBotMessage(`
                <p>❌ Por favor, digite um nome válido para análise.</p>
                <p>Exemplo: "João Silva" ou "Empresa ABC"</p>
            `);
            return;
        }

        this.addBotMessage(`
            <p>✨ <strong>Análise Numerológica de "${analise.nome}"</strong></p>
            <div class="number-result">
                <div class="number">Número: ${analise.numero}</div>
                <div class="meaning">${analise.energia}</div>
            </div>
            <p><strong>📖 Significado:</strong><br>${analise.significado}</p>
            <p><strong>💡 Recomendação:</strong><br>${analise.recomendacao}</p>
            <p>💡 <strong>Dica:</strong> Digite "análise completa ${analise.nome}" para ver todos os números!</p>
        `);
    }

    analisarNomeCompleto(nome) {
        const analise = Numerologia.analisarNome(nome);
        
        if (!analise) {
            this.addBotMessage(`<p>❌ Por favor, digite um nome válido para análise completa.</p>`);
            return;
        }

        this.addBotMessage(`
            <p>🔍 <strong>Análise Numerológica Completa de "${analise.nome}"</strong></p>
            
            <div class="analysis-section">
                <h4>📊 Número de Expressão: ${analise.numeroExpressao}</h4>
                <div class="number-result">
                    <div class="number">${analise.numeroExpressao}</div>
                    <div class="meaning">${analise.energiaExpressao}</div>
                </div>
                <p><strong>Significado:</strong> ${analise.significadoExpressao}</p>
                <p><strong>Recomendação:</strong> ${analise.recomendacaoExpressao}</p>
            </div>

            <div class="analysis-section">
                <h4>💭 Número de Motivação: ${analise.numeroMotivacao}</h4>
                <div class="number-result">
                    <div class="number">${analise.numeroMotivacao}</div>
                    <div class="meaning">${analise.energiaMotivacao}</div>
                </div>
                <p><strong>O que busca:</strong> ${analise.significadoMotivacao}</p>
                <p><strong>Recomendação:</strong> ${analise.recomendacaoMotivacao}</p>
            </div>

            <div class="analysis-section">
                <h4>👁️ Número de Impressão: ${analise.numeroImpressao}</h4>
                <div class="number-result">
                    <div class="number">${analise.numeroImpressao}</div>
                    <div class="meaning">${analise.energiaImpressao}</div>
                </div>
                <p><strong>Como é vista:</strong> ${analise.significadoImpressao}</p>
                <p><strong>Recomendação:</strong> ${analise.recomendacaoImpressao}</p>
            </div>

            <div class="analysis-section">
                <h4>🔤 Análise da Primeira Letra: ${analise.primeiraLetra}</h4>
                <p><strong>Primeira Vogal:</strong> ${analise.primeiraVogal}</p>
                <p>${analise.analiseCompleta}</p>
            </div>

            <p><strong>💡 Dica:</strong> Digite "sugestões ${analise.numeroExpressao}" para ver nomes com energia similar!</p>
        `);
    }

    analisarMotivacao(nome) {
        const numeroMotivacao = Numerologia.calcularNumeroMotivacao(nome);
        const significado = Numerologia.obterSignificadoMotivacao(numeroMotivacao);
        const energia = Numerologia.obterEnergia(numeroMotivacao);

        this.addBotMessage(`
            <p>💭 <strong>Análise de Motivação: "${nome}"</strong></p>
            <div class="number-result">
                <div class="number">Motivação: ${numeroMotivacao}</div>
                <div class="meaning">${energia}</div>
            </div>
            <p><strong>O que a empresa busca:</strong><br>${significado}</p>
            <p>Digite "análise completa ${nome}" para ver todos os números!</p>
        `);
    }

    analisarImpressao(nome) {
        const numeroImpressao = Numerologia.calcularNumeroImpressao(nome);
        const significado = Numerologia.obterSignificadoImpressao(numeroImpressao);
        const energia = Numerologia.obterEnergia(numeroImpressao);

        this.addBotMessage(`
            <p>👁️ <strong>Análise de Impressão: "${nome}"</strong></p>
            <div class="number-result">
                <div class="number">Impressão: ${numeroImpressao}</div>
                <div class="meaning">${energia}</div>
            </div>
            <p><strong>Como é percebida pelo público:</strong><br>${significado}</p>
            <p>Digite "análise completa ${nome}" para ver todos os números!</p>
        `);
    }

    explicarNumero(numero) {
        if (numero < 1 || numero > 33 || (numero > 9 && numero !== 11 && numero !== 22 && numero !== 33)) {
            this.addBotMessage(`
                <p>❌ Por favor, digite um número válido (1-9, 11, 22 ou 33).</p>
            `);
            return;
        }

        const significado = Numerologia.obterSignificado(numero);
        const energia = Numerologia.obterEnergia(numero);
        const recomendacao = Numerologia.obterRecomendacao(numero);

        this.addBotMessage(`
            <p>🔢 <strong>Número ${numero}</strong></p>
            <div class="number-result">
                <div class="number">${numero}</div>
                <div class="meaning">${energia}</div>
            </div>
            <p><strong>📖 Significado:</strong><br>${significado}</p>
            <p><strong>💡 Recomendação:</strong><br>${recomendacao}</p>
        `);
    }

    gerarSugestoes(numero) {
        const sugestoes = Numerologia.gerarSugestoes(numero);
        const energia = Numerologia.obterEnergia(numero);

        this.addBotMessage(`
            <p>💡 <strong>Sugestões para o Número ${numero}</strong></p>
            <p><em>${energia}</em></p>
            <p><strong>Palavras-chave sugeridas:</strong></p>
            <ul>
                ${sugestoes.map(palavra => `<li>${palavra}</li>`).join('')}
            </ul>
            <p>Combine essas palavras com seu segmento de negócio para criar nomes poderosos!</p>
        `);
    }

    extrairNumero(texto) {
        const match = texto.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }

    isNumero(texto) {
        return /^\d+$/.test(texto.trim());
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NumerologiaBot();
});
