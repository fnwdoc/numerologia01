class NumerologiaBot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.currentStep = 'menu';
        this.currentName = '';
        
        this.initializeEventListeners();
        this.showWelcomeMessage();
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
        const lowerMessage = message.toLowerCase().trim();

        if (/^\d+$/.test(message.trim())) {
            const choice = parseInt(message.trim());
            
            if (this.currentStep === 'menu') {
                this.handleMenuChoice(choice);
                return;
            } else if (this.currentStep === 'waiting_analysis') {
                this.performAnalysis(choice);
                return;
            } else if (this.currentStep === 'waiting_suggestion_number') {
                this.gerarSugestoes(choice);
                this.showContinueMenu();
                return;
            } else if (choice >= 1 && choice <= 33) {
                this.explicarNumero(choice);
                this.showContinueMenu();
                return;
            }
        }

        if (lowerMessage === 'menu' || lowerMessage === 'voltar') {
            this.showMainMenu();
            return;
        }

        if (this.currentStep === 'waiting_name') {
            if (message.trim().length > 0) {
                this.currentName = message.trim();
                this.showAnalysisMenu();
            } else {
                this.addBotMessage(`<p>Por favor, digite um nome válido para análise! 😊</p>`);
            }
            return;
        }

        if (lowerMessage.includes('análise completa') || lowerMessage.includes('analise completa')) {
            const nome = message.replace(/análise completa|analise completa/gi, '').trim();
            if (nome) {
                this.analisarNomeCompleto(nome);
                this.showContinueMenu();
            } else {
                this.requestNameInput();
            }
        } else if (lowerMessage.includes('motivação') || lowerMessage.includes('motivacao')) {
            const nome = message.replace(/motivação|motivacao/gi, '').trim();
            if (nome) {
                this.analisarMotivacao(nome);
                this.showContinueMenu();
            } else {
                this.requestNameInput();
            }
        } else if (lowerMessage.includes('impressão') || lowerMessage.includes('impressao')) {
            const nome = message.replace(/impressão|impressao/gi, '').trim();
            if (nome) {
                this.analisarImpressao(nome);
                this.showContinueMenu();
            } else {
                this.requestNameInput();
            }
        } else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
            this.addBotMessage(`
                <p>Olá! 😊</p>
                <p>Estou aqui para ajudar com análises numerológicas empresariais.</p>
            `);
            this.showMainMenu();
        } else if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
            this.showMainMenu();
        } else if (lowerMessage.includes('sugestões') || lowerMessage.includes('sugestoes')) {
            const numeroMatch = message.match(/\d+/);
            if (numeroMatch) {
                const numero = parseInt(numeroMatch[0]);
                this.gerarSugestoes(numero);
                this.showContinueMenu();
            } else {
                this.showSuggestionsMenu();
            }
        } else if (message.trim().length > 0) {
            this.analisarNome(message.trim());
            this.showContinueMenu();
        } else {
            this.addBotMessage(`<p>Por favor, digite algo para eu poder ajudar! 😊</p>`);
            this.showMainMenu();
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

    showMainMenu() {
        this.currentStep = 'menu';
        this.addBotMessage(`
            <div class="menu-container">
                <p><strong>🎯 Escolha uma opção:</strong></p>
                <div class="menu-options">
                    <div class="menu-option" onclick="bot.selectOption(1)">
                        <span class="option-number">1</span>
                        <div class="option-content">
                            <strong>📊 Análise de Nome</strong>
                            <small>Descubra os números da sua empresa</small>
                        </div>
                    </div>
                    <div class="menu-option" onclick="bot.selectOption(2)">
                        <span class="option-number">2</span>
                        <div class="option-content">
                            <strong>🔢 Significado de Números</strong>
                            <small>Entenda o que cada número representa</small>
                        </div>
                    </div>
                    <div class="menu-option" onclick="bot.selectOption(3)">
                        <span class="option-number">3</span>
                        <div class="option-content">
                            <strong>💡 Sugestões de Nomes</strong>
                            <small>Encontre nomes com energia específica</small>
                        </div>
                    </div>
                </div>
                <p class="menu-instruction">Digite o número da opção ou clique diretamente!</p>
            </div>
        `);
    }

    showAnalysisMenu() {
        this.currentStep = 'waiting_analysis';
        this.addBotMessage(`
            <div class="menu-container">
                <p><strong>🔍 Análise para "${this.currentName}"</strong></p>
                <p>Escolha o tipo de análise:</p>
                <div class="menu-options">
                    <div class="menu-option" onclick="bot.selectAnalysis(1)">
                        <span class="option-number">1</span>
                        <div class="option-content">
                            <strong>📊 Análise Básica</strong>
                            <small>Número de Expressão e significado</small>
                        </div>
                    </div>
                    <div class="menu-option" onclick="bot.selectAnalysis(2)">
                        <span class="option-number">2</span>
                        <div class="option-content">
                            <strong>🔍 Análise Completa</strong>
                            <small>Expressão, Motivação e Impressão</small>
                        </div>
                    </div>
                    <div class="menu-option" onclick="bot.selectAnalysis(3)">
                        <span class="option-number">3</span>
                        <div class="option-content">
                            <strong>💭 Número de Motivação</strong>
                            <small>O que a empresa busca</small>
                        </div>
                    </div>
                    <div class="menu-option" onclick="bot.selectAnalysis(4)">
                        <span class="option-number">4</span>
                        <div class="option-content">
                            <strong>👁️ Número de Impressão</strong>
                            <small>Como é percebida pelo público</small>
                        </div>
                    </div>
                </div>
                <p class="menu-instruction">Digite o número da opção ou clique diretamente!</p>
            </div>
        `);
    }

    showSuggestionsMenu() {
        this.currentStep = 'waiting_suggestion_number';
        this.addBotMessage(`
            <div class="menu-container">
                <p><strong>💡 Sugestões de Nomes</strong></p>
                <p>Digite o número desejado (1-9) para gerar sugestões de nomes com essa energia:</p>
                <div class="number-grid">
                    <div class="number-option" onclick="bot.generateSuggestions(1)">1</div>
                    <div class="number-option" onclick="bot.generateSuggestions(2)">2</div>
                    <div class="number-option" onclick="bot.generateSuggestions(3)">3</div>
                    <div class="number-option" onclick="bot.generateSuggestions(4)">4</div>
                    <div class="number-option" onclick="bot.generateSuggestions(5)">5</div>
                    <div class="number-option" onclick="bot.generateSuggestions(6)">6</div>
                    <div class="number-option" onclick="bot.generateSuggestions(7)">7</div>
                    <div class="number-option" onclick="bot.generateSuggestions(8)">8</div>
                    <div class="number-option" onclick="bot.generateSuggestions(9)">9</div>
                </div>
                <p class="menu-instruction">Clique no número ou digite diretamente!</p>
            </div>
        `);
    }

    showContinueMenu() {
        this.addBotMessage(`
            <div class="continue-menu">
                <p><strong>🎯 O que deseja fazer agora?</strong></p>
                <div class="continue-options">
                    <button class="continue-btn" onclick="bot.showMainMenu()">🏠 Menu Principal</button>
                    <button class="continue-btn" onclick="bot.requestNameInput()">🔄 Nova Análise</button>
                </div>
            </div>
        `);
    }

    requestNameInput() {
        this.currentStep = 'waiting_name';
        this.addBotMessage(`
            <p><strong>📝 Digite o nome da empresa para análise:</strong></p>
            <p class="input-hint">Exemplo: "Minha Empresa", "Google", "Apple"</p>
        `);
    }

    handleMenuChoice(choice) {
        switch(choice) {
            case 1:
                this.requestNameInput();
                break;
            case 2:
                this.showNumberExplanationMenu();
                break;
            case 3:
                this.showSuggestionsMenu();
                break;
            default:
                this.addBotMessage(`<p>Opção inválida. Digite 1, 2 ou 3.</p>`);
                this.showMainMenu();
        }
    }

    performAnalysis(choice) {
        if (!this.currentName) {
            this.requestNameInput();
            return;
        }

        switch(choice) {
            case 1:
                this.analisarNome(this.currentName);
                break;
            case 2:
                this.analisarNomeCompleto(this.currentName);
                break;
            case 3:
                this.analisarMotivacao(this.currentName);
                break;
            case 4:
                this.analisarImpressao(this.currentName);
                break;
            default:
                this.addBotMessage(`<p>Opção inválida. Digite 1, 2, 3 ou 4.</p>`);
                this.showAnalysisMenu();
                return;
        }
        this.showContinueMenu();
    }

    showNumberExplanationMenu() {
        this.addBotMessage(`
            <div class="menu-container">
                <p><strong>🔢 Significado dos Números</strong></p>
                <p>Digite um número de 1 a 33 para ver seu significado:</p>
                <div class="number-grid">
                    ${Array.from({length: 9}, (_, i) => 
                        `<div class="number-option" onclick="bot.explainNumber(${i + 1})">${i + 1}</div>`
                    ).join('')}
                </div>
                <p class="menu-instruction">Ou digite qualquer número de 1 a 33!</p>
            </div>
        `);
    }

    selectOption(option) {
        this.addUserMessage(option.toString());
        this.handleMenuChoice(option);
    }

    selectAnalysis(option) {
        this.addUserMessage(option.toString());
        this.performAnalysis(option);
    }

    generateSuggestions(number) {
        this.addUserMessage(number.toString());
        this.gerarSugestoes(number);
        this.showContinueMenu();
    }

    explainNumber(number) {
        this.addUserMessage(number.toString());
        this.explicarNumero(number);
        this.showContinueMenu();
    }

    showWelcomeMessage() {
        this.addBotMessage(`
            <p>👋 Olá! Sou seu assistente de <strong>Numerologia Empresarial</strong>!</p>
            <p>Posso ajudar você a descobrir os números que influenciam sua empresa e orientar na escolha do nome ideal para seu negócio.</p>
        `);
        this.showMainMenu();
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

let bot;
document.addEventListener('DOMContentLoaded', () => {
    bot = new NumerologiaBot();
});
