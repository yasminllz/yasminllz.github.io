// Questões Page JavaScript
// TODO: conectar com backend quando disponível

class QuestoesManager {
    constructor() {
        this.questoes = [];
        this.filteredQuestoes = [];
        this.currentPage = 1;
        this.questoesPorPagina = 10;
        this.currentQuestao = null;
        this.timer = null;
        this.timerSeconds = 0;
        this.timerActive = false;
        this.userStats = this.loadUserStats();
        
        this.init();
    }

    init() {
        this.loadSampleQuestoes();
        this.setupEventListeners();
        this.updateStats();
        this.renderQuestoes();
    }

    loadSampleQuestoes() {
        // Sample questions data
        this.questoes = [
            {
                id: 1,
                numero: "Q001",
                disciplina: "matematica",
                ano: "2023",
                tipo: "enem",
                dificuldade: "medio",
                enunciado: "Uma função f(x) = ax² + bx + c tem como gráfico uma parábola que passa pelos pontos (0, 3), (1, 6) e (2, 11). Determine o valor de a + b + c.",
                alternativas: [
                    { letra: "A", texto: "10" },
                    { letra: "B", texto: "11" },
                    { letra: "C", texto: "12" },
                    { letra: "D", texto: "13" },
                    { letra: "E", texto: "14" }
                ],
                gabarito: "A",
                explicacao: "Substituindo os pontos na função: f(0) = c = 3, f(1) = a + b + c = 6, f(2) = 4a + 2b + c = 11. Resolvendo o sistema: a = 1, b = 2, c = 3. Portanto, a + b + c = 6."
            },
            {
                id: 2,
                numero: "Q002",
                disciplina: "portugues",
                ano: "2023",
                tipo: "enem",
                dificuldade: "facil",
                enunciado: "Leia o texto abaixo e identifique a figura de linguagem predominante: 'O vento sussurrava segredos entre as folhas, enquanto a lua sorria timidamente no céu estrelado.'",
                alternativas: [
                    { letra: "A", texto: "Metáfora" },
                    { letra: "B", texto: "Personificação" },
                    { letra: "C", texto: "Hipérbole" },
                    { letra: "D", texto: "Ironia" },
                    { letra: "E", texto: "Antítese" }
                ],
                gabarito: "B",
                explicacao: "A personificação é evidente quando elementos da natureza (vento, lua) recebem características humanas (sussurrar, sorrir)."
            },
            {
                id: 3,
                numero: "Q003",
                disciplina: "fisica",
                ano: "2022",
                tipo: "enem",
                dificuldade: "dificil",
                enunciado: "Um corpo de massa 2 kg é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando g = 10 m/s², qual a altura máxima atingida?",
                alternativas: [
                    { letra: "A", texto: "15 m" },
                    { letra: "B", texto: "20 m" },
                    { letra: "C", texto: "25 m" },
                    { letra: "D", texto: "30 m" },
                    { letra: "E", texto: "40 m" }
                ],
                gabarito: "B",
                explicacao: "Usando a equação v² = v₀² - 2gh, onde v = 0 no ponto mais alto: 0 = 400 - 20h, logo h = 20 m."
            },
            {
                id: 4,
                numero: "Q004",
                disciplina: "quimica",
                ano: "2022",
                tipo: "vestibular",
                dificuldade: "medio",
                enunciado: "Qual é a massa molar do sulfato de alumínio Al₂(SO₄)₃? (Dados: Al = 27, S = 32, O = 16)",
                alternativas: [
                    { letra: "A", texto: "342 g/mol" },
                    { letra: "B", texto: "294 g/mol" },
                    { letra: "C", texto: "278 g/mol" },
                    { letra: "D", texto: "315 g/mol" },
                    { letra: "E", texto: "360 g/mol" }
                ],
                gabarito: "A",
                explicacao: "Al₂(SO₄)₃: 2×27 + 3×(32 + 4×16) = 54 + 3×96 = 54 + 288 = 342 g/mol"
            },
            {
                id: 5,
                numero: "Q005",
                disciplina: "biologia",
                ano: "2021",
                tipo: "enem",
                dificuldade: "facil",
                enunciado: "Qual organela celular é responsável pela síntese de proteínas?",
                alternativas: [
                    { letra: "A", texto: "Mitocôndria" },
                    { letra: "B", texto: "Ribossomo" },
                    { letra: "C", texto: "Núcleo" },
                    { letra: "D", texto: "Complexo de Golgi" },
                    { letra: "E", texto: "Retículo Endoplasmático" }
                ],
                gabarito: "B",
                explicacao: "Os ribossomos são as organelas responsáveis pela síntese de proteínas, onde ocorre a tradução do RNA mensageiro."
            }
        ];

        this.filteredQuestoes = [...this.questoes];
    }

    setupEventListeners() {
        // Filter buttons
        document.getElementById('aplicar-filtros').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('limpar-filtros').addEventListener('click', () => {
            this.clearFilters();
        });

        // Load more button
        document.getElementById('carregar-mais').addEventListener('click', () => {
            this.loadMoreQuestoes();
        });

        // Modal functionality
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        document.getElementById('questao-modal').addEventListener('click', (e) => {
            if (e.target.id === 'questao-modal') {
                this.closeModal();
            }
        });

        // Timer functionality
        document.getElementById('timer-toggle').addEventListener('click', () => {
            this.toggleTimer();
        });

        // Question actions
        document.getElementById('marcar-revisar').addEventListener('click', () => {
            this.marcarParaRevisar();
        });

        document.getElementById('confirmar-resposta').addEventListener('click', () => {
            this.confirmarResposta();
        });

        document.getElementById('proxima-questao').addEventListener('click', () => {
            this.proximaQuestao();
        });
    }

    applyFilters() {
        const disciplina = document.getElementById('disciplina').value;
        const ano = document.getElementById('ano').value;
        const tipo = document.getElementById('tipo').value;
        const dificuldade = document.getElementById('dificuldade').value;

        this.filteredQuestoes = this.questoes.filter(questao => {
            return (disciplina === 'todas' || questao.disciplina === disciplina) &&
                   (ano === 'todos' || questao.ano === ano) &&
                   (tipo === 'todos' || questao.tipo === tipo) &&
                   (dificuldade === 'todas' || questao.dificuldade === dificuldade);
        });

        this.currentPage = 1;
        this.renderQuestoes();
        this.showToast(`${this.filteredQuestoes.length} questões encontradas`);
    }

    clearFilters() {
        document.getElementById('disciplina').value = 'todas';
        document.getElementById('ano').value = 'todos';
        document.getElementById('tipo').value = 'todos';
        document.getElementById('dificuldade').value = 'todas';
        
        this.filteredQuestoes = [...this.questoes];
        this.currentPage = 1;
        this.renderQuestoes();
        this.showToast('Filtros limpos');
    }

    renderQuestoes() {
        const container = document.getElementById('questoes-container');
        const startIndex = 0;
        const endIndex = this.currentPage * this.questoesPorPagina;
        const questoesToShow = this.filteredQuestoes.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            container.innerHTML = '';
        }

        questoesToShow.forEach((questao, index) => {
            if (index >= (this.currentPage - 1) * this.questoesPorPagina) {
                const questaoCard = this.createQuestaoCard(questao);
                container.appendChild(questaoCard);
            }
        });

        // Update total count
        document.getElementById('total-questoes').textContent = this.filteredQuestoes.length;

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('carregar-mais');
        if (endIndex >= this.filteredQuestoes.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createQuestaoCard(questao) {
        const card = document.createElement('div');
        card.className = 'questao-card';
        card.innerHTML = `
            <div class="questao-header">
                <div class="questao-info">
                    <span class="questao-numero">${questao.numero}</span>
                    <span class="questao-disciplina">${this.getDisciplinaName(questao.disciplina)}</span>
                    <span class="questao-dificuldade dificuldade-${questao.dificuldade}">
                        ${this.getDificuldadeName(questao.dificuldade)}
                    </span>
                </div>
                <div class="questao-meta">
                    <span>${questao.tipo.toUpperCase()} ${questao.ano}</span>
                </div>
            </div>
            <div class="questao-enunciado-preview">
                ${questao.enunciado}
            </div>
            <div class="questao-actions">
                <button class="questao-btn gabarito" onclick="questoesManager.mostrarGabarito(${questao.id})">
                    <i class="fas fa-key"></i>
                    Ver Gabarito
                </button>
                <button class="questao-btn resolver" onclick="questoesManager.resolverQuestao(${questao.id})">
                    <i class="fas fa-play"></i>
                    Resolver
                </button>
            </div>
        `;
        return card;
    }

    loadMoreQuestoes() {
        this.currentPage++;
        this.renderQuestoes();
    }

    resolverQuestao(questaoId) {
        this.currentQuestao = this.questoes.find(q => q.id === questaoId);
        if (!this.currentQuestao) return;

        this.openModal();
        this.renderQuestaoModal();
        this.resetTimer();
    }

    mostrarGabarito(questaoId) {
        const questao = this.questoes.find(q => q.id === questaoId);
        if (!questao) return;

        this.showToast(`Gabarito: ${questao.gabarito} - ${questao.explicacao.substring(0, 100)}...`, 'info');
    }

    openModal() {
        const modal = document.getElementById('questao-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('questao-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.stopTimer();
        this.resetQuestaoModal();
    }

    renderQuestaoModal() {
        if (!this.currentQuestao) return;

        document.getElementById('modal-questao-titulo').textContent = 
            `${this.currentQuestao.numero} - ${this.getDisciplinaName(this.currentQuestao.disciplina)}`;

        document.getElementById('questao-enunciado').textContent = this.currentQuestao.enunciado;

        const alternativasContainer = document.getElementById('questao-alternativas');
        alternativasContainer.innerHTML = '';

        this.currentQuestao.alternativas.forEach(alt => {
            const alternativa = document.createElement('div');
            alternativa.className = 'alternativa';
            alternativa.dataset.letra = alt.letra;
            alternativa.innerHTML = `
                <div class="alternativa-letra">${alt.letra}</div>
                <div class="alternativa-texto">${alt.texto}</div>
            `;
            
            alternativa.addEventListener('click', () => {
                this.selectAlternativa(alt.letra);
            });
            
            alternativasContainer.appendChild(alternativa);
        });

        // Reset modal state
        document.getElementById('questao-resultado').style.display = 'none';
        document.getElementById('confirmar-resposta').disabled = true;
    }

    selectAlternativa(letra) {
        // Remove previous selection
        document.querySelectorAll('.alternativa').forEach(alt => {
            alt.classList.remove('selected');
        });

        // Add selection to clicked alternative
        document.querySelector(`[data-letra="${letra}"]`).classList.add('selected');
        
        // Enable confirm button
        document.getElementById('confirmar-resposta').disabled = false;
        
        this.selectedAlternativa = letra;
    }

    confirmarResposta() {
        if (!this.selectedAlternativa || !this.currentQuestao) return;

        const isCorrect = this.selectedAlternativa === this.currentQuestao.gabarito;
        
        // Update user stats
        this.updateUserStats(isCorrect, this.timerSeconds);
        
        // Show result
        this.showResultado(isCorrect);
        
        // Stop timer
        this.stopTimer();
    }

    showResultado(isCorrect) {
        const resultadoContainer = document.getElementById('questao-resultado');
        const statusElement = resultadoContainer.querySelector('.resultado-status');
        const explicacaoElement = document.getElementById('explicacao-texto');
        
        statusElement.className = `resultado-status ${isCorrect ? 'correto' : 'incorreto'}`;
        statusElement.innerHTML = `
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
            <span>${isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}</span>
        `;
        
        explicacaoElement.textContent = this.currentQuestao.explicacao;
        resultadoContainer.style.display = 'block';
        
        // Disable confirm button
        document.getElementById('confirmar-resposta').disabled = true;
    }

    proximaQuestao() {
        // Find next question
        const currentIndex = this.filteredQuestoes.findIndex(q => q.id === this.currentQuestao.id);
        const nextIndex = (currentIndex + 1) % this.filteredQuestoes.length;
        const nextQuestao = this.filteredQuestoes[nextIndex];
        
        this.currentQuestao = nextQuestao;
        this.renderQuestaoModal();
        this.resetTimer();
        this.selectedAlternativa = null;
    }

    resetQuestaoModal() {
        this.selectedAlternativa = null;
        document.getElementById('questao-resultado').style.display = 'none';
    }

    toggleTimer() {
        if (this.timerActive) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.timerActive = true;
        document.getElementById('timer-toggle').classList.add('active');
        
        this.timer = setInterval(() => {
            this.timerSeconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        this.timerActive = false;
        document.getElementById('timer-toggle').classList.remove('active');
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    resetTimer() {
        this.stopTimer();
        this.timerSeconds = 0;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerSeconds / 60);
        const seconds = this.timerSeconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
    }

    marcarParaRevisar() {
        if (!this.currentQuestao) return;
        
        const marcadas = JSON.parse(localStorage.getItem('questoes_marcadas') || '[]');
        
        if (!marcadas.includes(this.currentQuestao.id)) {
            marcadas.push(this.currentQuestao.id);
            localStorage.setItem('questoes_marcadas', JSON.stringify(marcadas));
            this.showToast('Questão marcada para revisar');
        } else {
            this.showToast('Questão já estava marcada');
        }
        
        this.updateStats();
    }

    updateUserStats(isCorrect, timeSpent) {
        const today = new Date().toDateString();
        
        if (!this.userStats[today]) {
            this.userStats[today] = {
                questoes: 0,
                acertos: 0,
                tempoTotal: 0
            };
        }
        
        this.userStats[today].questoes++;
        if (isCorrect) this.userStats[today].acertos++;
        this.userStats[today].tempoTotal += timeSpent;
        
        this.saveUserStats();
        this.updateStats();
    }

    updateStats() {
        const today = new Date().toDateString();
        const todayStats = this.userStats[today] || { questoes: 0, acertos: 0, tempoTotal: 0 };
        const marcadas = JSON.parse(localStorage.getItem('questoes_marcadas') || '[]');
        
        document.getElementById('questoes-respondidas').textContent = todayStats.questoes;
        
        const taxaAcerto = todayStats.questoes > 0 ? 
            Math.round((todayStats.acertos / todayStats.questoes) * 100) : 0;
        document.getElementById('taxa-acerto').textContent = `${taxaAcerto}%`;
        
        const tempoMedio = todayStats.questoes > 0 ? 
            Math.round(todayStats.tempoTotal / todayStats.questoes / 60) : 0;
        document.getElementById('tempo-medio').textContent = `${tempoMedio}min`;
        
        document.getElementById('marcadas-revisar').textContent = marcadas.length;
    }

    loadUserStats() {
        return JSON.parse(localStorage.getItem('questoes_stats') || '{}');
    }

    saveUserStats() {
        localStorage.setItem('questoes_stats', JSON.stringify(this.userStats));
    }

    getDisciplinaName(disciplina) {
        const names = {
            'matematica': 'Matemática',
            'portugues': 'Português',
            'fisica': 'Física',
            'quimica': 'Química',
            'biologia': 'Biologia',
            'historia': 'História',
            'geografia': 'Geografia',
            'filosofia': 'Filosofia',
            'sociologia': 'Sociologia'
        };
        return names[disciplina] || disciplina;
    }

    getDificuldadeName(dificuldade) {
        const names = {
            'facil': 'Fácil',
            'medio': 'Médio',
            'dificil': 'Difícil'
        };
        return names[dificuldade] || dificuldade;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        const toastIcon = toast.querySelector('i');
        
        toastMessage.textContent = message;
        
        // Update icon and color based on type
        switch (type) {
            case 'error':
                toastIcon.className = 'fas fa-exclamation-circle';
                toast.style.background = 'linear-gradient(135deg, var(--error-color), #dc2626)';
                break;
            case 'info':
                toastIcon.className = 'fas fa-info-circle';
                toast.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
                break;
            default:
                toastIcon.className = 'fas fa-check-circle';
                toast.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.questoesManager = new QuestoesManager();
});

// Export for use in other modules
window.QuestoesManager = QuestoesManager;