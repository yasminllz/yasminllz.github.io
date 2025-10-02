// Redação Page JavaScript
class RedacaoManager {
    constructor() {
        this.currentTheme = null;
        this.savedRedacoes = JSON.parse(localStorage.getItem('redacoes')) || {};
        this.temas = {
            'educacao-inclusiva': {
                title: 'Desafios da educação inclusiva no Brasil',
                year: '2023',
                content: `
                    <h4>Proposta de Redação - ENEM 2023</h4>
                    <p><strong>Tema:</strong> Desafios da educação inclusiva no Brasil</p>
                    
                    <h5>Textos Motivadores:</h5>
                    <p><strong>Texto I:</strong> A educação inclusiva é um direito fundamental garantido pela Constituição Federal de 1988 e pela Lei Brasileira de Inclusão (LBI). No entanto, a implementação efetiva desse direito ainda enfrenta diversos obstáculos no sistema educacional brasileiro.</p>
                    
                    <p><strong>Texto II:</strong> Segundo dados do Censo Escolar 2022, o Brasil possui mais de 1,3 milhão de estudantes com deficiência matriculados na educação básica. Destes, 87% estão em classes comuns, evidenciando o avanço da política de inclusão, mas também revelando a necessidade de melhor preparação das escolas.</p>
                    
                    <p><strong>Texto III:</strong> "A inclusão não é apenas colocar o aluno com deficiência na sala de aula regular. É preciso adaptar currículos, formar professores, adequar espaços físicos e promover uma mudança cultural que valorize a diversidade." - Especialista em educação inclusiva</p>
                    
                    <h5>Proposta:</h5>
                    <p>A partir da leitura dos textos motivadores e com base nos seus conhecimentos, redija um texto dissertativo-argumentativo sobre o tema <strong>"Desafios da educação inclusiva no Brasil"</strong>. Selecione, organize e relacione, de forma coerente e coesa, argumentos e fatos para defesa de seu ponto de vista. Sua redação deve ter entre 8 e 30 linhas e apresentar uma proposta de intervenção que respeite os direitos humanos.</p>
                `
            },
            'redes-sociais': {
                title: 'O impacto das redes sociais na juventude',
                year: '2022',
                content: `
                    <h4>Proposta de Redação - Simulado ENEM 2022</h4>
                    <p><strong>Tema:</strong> O impacto das redes sociais na juventude brasileira</p>
                    
                    <h5>Textos Motivadores:</h5>
                    <p><strong>Texto I:</strong> Uma pesquisa realizada em 2022 revelou que jovens brasileiros entre 16 e 24 anos passam, em média, 7 horas por dia conectados às redes sociais. Esse tempo de exposição tem gerado debates sobre os efeitos na saúde mental e no desenvolvimento social dessa geração.</p>
                    
                    <p><strong>Texto II:</strong> As redes sociais democratizaram o acesso à informação e criaram novas oportunidades de expressão, aprendizado e conexão. Muitos jovens encontram nas plataformas digitais espaços para desenvolver talentos, construir carreiras e participar de movimentos sociais importantes.</p>
                    
                    <p><strong>Texto III:</strong> Por outro lado, estudos apontam para o aumento de casos de ansiedade, depressão e baixa autoestima entre jovens usuários frequentes de redes sociais, especialmente relacionados à comparação social e ao cyberbullying.</p>
                    
                    <h5>Proposta:</h5>
                    <p>Com base nos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo sobre <strong>"O impacto das redes sociais na juventude brasileira"</strong>. Apresente argumentos consistentes e uma proposta de intervenção que promova o uso consciente e saudável dessas plataformas.</p>
                `
            },
            'meio-ambiente': {
                title: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado',
                year: '2022',
                content: `
                    <h4>Proposta de Redação - ENEM 2022</h4>
                    <p><strong>Tema:</strong> Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil</p>
                    
                    <h5>Textos Motivadores:</h5>
                    <p><strong>Texto I:</strong> O trabalho de cuidado engloba atividades essenciais como cuidar de crianças, idosos, pessoas com deficiência, além das tarefas domésticas. No Brasil, esse trabalho é majoritariamente realizado por mulheres, muitas vezes sem reconhecimento ou remuneração adequada.</p>
                    
                    <p><strong>Texto II:</strong> Dados do IBGE mostram que as mulheres dedicam, em média, 18,1 horas semanais aos afazeres domésticos, enquanto os homens dedicam apenas 10,5 horas. Essa desigualdade impacta diretamente a participação feminina no mercado de trabalho formal.</p>
                    
                    <p><strong>Texto III:</strong> Durante a pandemia de COVID-19, a sobrecarga do trabalho de cuidado sobre as mulheres se intensificou, evidenciando ainda mais a necessidade de políticas públicas que reconheçam e valorizem essas atividades fundamentais para a sociedade.</p>
                    
                    <h5>Proposta:</h5>
                    <p>Redija um texto dissertativo-argumentativo sobre os <strong>"Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil"</strong>. Desenvolva argumentos que demonstrem a importância desse trabalho e apresente uma proposta de intervenção para sua valorização.</p>
                `
            },
            'democratizacao': {
                title: 'Invisibilidade e registro civil: garantia de acesso à cidadania',
                year: '2021',
                content: `
                    <h4>Proposta de Redação - ENEM 2021</h4>
                    <p><strong>Tema:</strong> Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil</p>
                    
                    <h5>Textos Motivadores:</h5>
                    <p><strong>Texto I:</strong> O registro civil é o primeiro documento de um cidadão e garante o acesso a direitos básicos como saúde, educação e programas sociais. No Brasil, ainda existem pessoas que vivem à margem da sociedade por não possuírem documentação adequada.</p>
                    
                    <p><strong>Texto II:</strong> Segundo dados do IBGE, aproximadamente 2,8 milhões de brasileiros não possuem registro de nascimento. Essa situação afeta principalmente populações vulneráveis em áreas rurais, comunidades indígenas e quilombolas, perpetuando ciclos de exclusão social.</p>
                    
                    <p><strong>Texto III:</strong> A falta de documentação civil impede o exercício pleno da cidadania, dificultando o acesso a serviços públicos, benefícios sociais e até mesmo o direito ao voto, criando uma situação de invisibilidade social.</p>
                    
                    <h5>Proposta:</h5>
                    <p>Elabore um texto dissertativo-argumentativo sobre <strong>"Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil"</strong>. Analise as causas e consequências da falta de documentação civil e proponha soluções para garantir que todos os brasileiros tenham acesso a seus direitos fundamentais.</p>
                `
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedRedacao();
        this.updateCounters();
    }

    setupEventListeners() {
        // Modal functionality
        document.querySelectorAll('.btn-ver-proposta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const temaKey = e.target.closest('.tema-card').dataset.tema;
                this.openModal(temaKey);
            });
        });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Click outside modal to close
        document.getElementById('proposta-modal').addEventListener('click', (e) => {
            if (e.target.id === 'proposta-modal') {
                this.closeModal();
            }
        });

        // Use theme button
        document.getElementById('usar-tema').addEventListener('click', () => {
            this.useTheme();
        });

        // Editor functionality
        const editor = document.getElementById('redacao-editor');
        editor.addEventListener('input', () => {
            this.updateCounters();
            this.updateProgress();
        });

        // Save and load buttons
        document.getElementById('save-redacao').addEventListener('click', () => {
            this.saveRedacao();
        });

        document.getElementById('load-redacao').addEventListener('click', () => {
            this.showLoadOptions();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveRedacao();
            }
        });
    }

    openModal(temaKey) {
        const tema = this.temas[temaKey];
        if (!tema) return;

        const modal = document.getElementById('proposta-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        title.textContent = tema.title;
        body.innerHTML = tema.content;
        
        modal.classList.add('active');
        this.currentTheme = temaKey;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('proposta-modal');
        modal.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    useTheme() {
        if (!this.currentTheme) return;
        
        const tema = this.temas[this.currentTheme];
        const temaAtual = document.getElementById('tema-atual');
        
        temaAtual.textContent = `Tema: ${tema.title} (${tema.year})`;
        temaAtual.style.color = 'var(--primary-color)';
        
        this.closeModal();
        this.showToast('Tema selecionado! Comece a escrever sua redação.');
        
        // Focus on editor
        document.getElementById('redacao-editor').focus();
    }

    updateCounters() {
        const editor = document.getElementById('redacao-editor');
        const text = editor.value;
        
        // Word count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        document.getElementById('word-count').textContent = words;
        
        // Character count
        const chars = text.length;
        document.getElementById('char-count').textContent = chars;
        
        // Update counter colors based on limits
        const wordCounter = document.getElementById('word-count');
        const charCounter = document.getElementById('char-count');
        
        if (words >= 200) {
            wordCounter.style.color = 'var(--success-color)';
        } else if (words >= 100) {
            wordCounter.style.color = 'var(--warning-color)';
        } else {
            wordCounter.style.color = 'var(--primary-color)';
        }
        
        if (chars >= 2500) {
            charCounter.style.color = 'var(--warning-color)';
        } else {
            charCounter.style.color = 'var(--primary-color)';
        }
    }

    updateProgress() {
        const editor = document.getElementById('redacao-editor');
        const text = editor.value;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const minWords = 200;
        const maxWords = 400;
        
        let percentage = Math.min((words / minWords) * 100, 100);
        progressFill.style.width = `${percentage}%`;
        
        if (words >= maxWords) {
            progressText.textContent = 'Excelente! Redação com tamanho ideal.';
            progressText.style.color = 'var(--success-color)';
        } else if (words >= minWords) {
            progressText.textContent = 'Bom tamanho! Continue desenvolvendo suas ideias.';
            progressText.style.color = 'var(--success-color)';
        } else if (words >= 100) {
            progressText.textContent = `Faltam ${minWords - words} palavras para o mínimo recomendado.`;
            progressText.style.color = 'var(--warning-color)';
        } else {
            progressText.textContent = 'Mínimo recomendado: 200 palavras';
            progressText.style.color = 'var(--text-muted)';
        }
    }

    saveRedacao() {
        const editor = document.getElementById('redacao-editor');
        const text = editor.value.trim();
        
        if (text === '') {
            this.showToast('Escreva algo antes de salvar!', 'error');
            return;
        }
        
        const now = new Date();
        const timestamp = now.toISOString();
        const dateStr = now.toLocaleDateString('pt-BR');
        const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const redacao = {
            content: text,
            tema: this.currentTheme ? this.temas[this.currentTheme].title : 'Tema livre',
            timestamp: timestamp,
            wordCount: text.split(/\s+/).length,
            charCount: text.length
        };
        
        const key = `redacao_${timestamp}`;
        this.savedRedacoes[key] = redacao;
        
        localStorage.setItem('redacoes', JSON.stringify(this.savedRedacoes));
        
        this.showToast(`Redação salva com sucesso! (${dateStr} às ${timeStr})`);
    }

    loadSavedRedacao() {
        // Load the most recent redacao if exists
        const keys = Object.keys(this.savedRedacoes);
        if (keys.length > 0) {
            const latestKey = keys.sort().pop();
            const redacao = this.savedRedacoes[latestKey];
            
            // Don't auto-load, just indicate there are saved redações
            const loadBtn = document.getElementById('load-redacao');
            loadBtn.innerHTML = `<i class="fas fa-folder-open"></i> Carregar (${keys.length})`;
        }
    }

    showLoadOptions() {
        const keys = Object.keys(this.savedRedacoes);
        
        if (keys.length === 0) {
            this.showToast('Nenhuma redação salva encontrada.', 'info');
            return;
        }
        
        // Create a simple selection dialog
        const options = keys.sort().reverse().slice(0, 5).map(key => {
            const redacao = this.savedRedacoes[key];
            const date = new Date(redacao.timestamp).toLocaleDateString('pt-BR');
            const time = new Date(redacao.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const preview = redacao.content.substring(0, 50) + '...';
            
            return `${date} ${time} - ${redacao.tema} (${redacao.wordCount} palavras)\n"${preview}"`;
        });
        
        const selection = prompt(`Selecione uma redação para carregar (digite o número):\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n\n')}`);
        
        if (selection && !isNaN(selection) && selection >= 1 && selection <= options.length) {
            const selectedKey = keys.sort().reverse()[selection - 1];
            const redacao = this.savedRedacoes[selectedKey];
            
            document.getElementById('redacao-editor').value = redacao.content;
            
            if (redacao.tema !== 'Tema livre') {
                document.getElementById('tema-atual').textContent = `Tema: ${redacao.tema}`;
                document.getElementById('tema-atual').style.color = 'var(--primary-color)';
            }
            
            this.updateCounters();
            this.updateProgress();
            
            this.showToast('Redação carregada com sucesso!');
        }
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

    // Auto-save functionality
    startAutoSave() {
        setInterval(() => {
            const editor = document.getElementById('redacao-editor');
            const text = editor.value.trim();
            
            if (text !== '' && text !== this.lastAutoSave) {
                localStorage.setItem('redacao_autosave', text);
                this.lastAutoSave = text;
            }
        }, 30000); // Auto-save every 30 seconds
    }

    loadAutoSave() {
        const autoSave = localStorage.getItem('redacao_autosave');
        if (autoSave) {
            const editor = document.getElementById('redacao-editor');
            if (editor.value.trim() === '') {
                editor.value = autoSave;
                this.updateCounters();
                this.updateProgress();
                this.showToast('Rascunho recuperado automaticamente.', 'info');
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.redacaoManager = new RedacaoManager();
    
    // Load auto-save after a short delay
    setTimeout(() => {
        window.redacaoManager.loadAutoSave();
        window.redacaoManager.startAutoSave();
    }, 1000);
});

// Export for use in other modules
window.RedacaoManager = RedacaoManager;