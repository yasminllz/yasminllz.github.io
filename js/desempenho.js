// Desempenho Page JavaScript
class DesempenhoManager {
    constructor() {
        this.currentPeriodo = 'hoje';
        this.currentGraficoTipo = 'acertos';
        this.chart = null;
        this.dadosHistorico = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDadosSimulados();
        this.renderGrafico();
        this.renderHistorico();
        this.updateResumo();
        this.animateCards();
    }

    setupEventListeners() {
        // Período selector
        document.querySelectorAll('.periodo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changePeriodo(e.target.dataset.periodo);
            });
        });

        // Gráfico controls
        document.querySelectorAll('.grafico-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeGraficoTipo(e.target.dataset.tipo);
            });
        });

        // Filtro disciplina
        document.getElementById('filtro-disciplina').addEventListener('change', (e) => {
            this.filterHistorico(e.target.value);
        });

        // Sugestão buttons
        document.querySelectorAll('.sugestao-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSugestaoClick(e.target.closest('.sugestao-card'));
            });
        });
    }

    loadDadosSimulados() {
        // Dados simulados para demonstração
        this.dadosHistorico = [
            {
                data: '2024-01-15',
                disciplina: 'matematica',
                questoes: 15,
                acertos: 12,
                tempo: '45min'
            },
            {
                data: '2024-01-14',
                disciplina: 'portugues',
                questoes: 20,
                acertos: 18,
                tempo: '38min'
            },
            {
                data: '2024-01-14',
                disciplina: 'fisica',
                questoes: 10,
                acertos: 6,
                tempo: '52min'
            },
            {
                data: '2024-01-13',
                disciplina: 'quimica',
                questoes: 12,
                acertos: 8,
                tempo: '41min'
            },
            {
                data: '2024-01-13',
                disciplina: 'matematica',
                questoes: 18,
                acertos: 14,
                tempo: '55min'
            },
            {
                data: '2024-01-12',
                disciplina: 'portugues',
                questoes: 16,
                acertos: 15,
                tempo: '35min'
            },
            {
                data: '2024-01-12',
                disciplina: 'fisica',
                questoes: 8,
                acertos: 5,
                tempo: '48min'
            }
        ];

        // Dados para o gráfico
        this.dadosGrafico = {
            acertos: [65, 70, 68, 75, 78, 82, 85],
            questoes: [25, 30, 28, 35, 40, 45, 47],
            tempo: [120, 135, 125, 150, 165, 180, 205]
        };

        this.labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    }

    changePeriodo(periodo) {
        this.currentPeriodo = periodo;
        
        // Update active button
        document.querySelectorAll('.periodo-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-periodo="${periodo}"]`).classList.add('active');
        
        // Update data
        this.updateResumo();
        this.showToast(`Período alterado para: ${this.getPeriodoLabel(periodo)}`);
    }

    changeGraficoTipo(tipo) {
        this.currentGraficoTipo = tipo;
        
        // Update active button
        document.querySelectorAll('.grafico-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tipo="${tipo}"]`).classList.add('active');
        
        // Update chart
        this.renderGrafico();
        this.showToast(`Gráfico alterado para: ${this.getGraficoLabel(tipo)}`);
    }

    renderGrafico() {
        const canvas = document.getElementById('grafico-evolucao');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 400;
        
        const data = this.dadosGrafico[this.currentGraficoTipo];
        const maxValue = Math.max(...data);
        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        
        // Draw grid
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i < this.labels.length; i++) {
            const x = padding + (chartWidth / (this.labels.length - 1)) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, canvas.height - padding);
            ctx.stroke();
        }
        
        // Draw line chart
        ctx.strokeStyle = '#9333ea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = padding + (chartWidth / (data.length - 1)) * i;
            const y = canvas.height - padding - (data[i] / maxValue) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#ec4899';
        for (let i = 0; i < data.length; i++) {
            const x = padding + (chartWidth / (data.length - 1)) * i;
            const y = canvas.height - padding - (data[i] / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw labels
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < this.labels.length; i++) {
            const x = padding + (chartWidth / (this.labels.length - 1)) * i;
            ctx.fillText(this.labels[i], x, canvas.height - 20);
        }
        
        // Draw y-axis labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            const value = Math.round(maxValue - (maxValue / 5) * i);
            ctx.fillText(value.toString(), padding - 10, y + 4);
        }
    }

    renderHistorico() {
        const tbody = document.getElementById('historico-body');
        tbody.innerHTML = '';
        
        this.dadosHistorico.forEach(item => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.dataset.disciplina = item.disciplina;
            
            const taxa = Math.round((item.acertos / item.questoes) * 100);
            const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
            
            row.innerHTML = `
                <div class="table-cell">${dataFormatada}</div>
                <div class="table-cell">${this.getDisciplinaName(item.disciplina)}</div>
                <div class="table-cell">${item.questoes}</div>
                <div class="table-cell">${item.acertos}</div>
                <div class="table-cell">${taxa}%</div>
                <div class="table-cell">${item.tempo}</div>
            `;
            
            tbody.appendChild(row);
        });
    }

    filterHistorico(disciplina) {
        const rows = document.querySelectorAll('.table-row');
        
        rows.forEach(row => {
            if (disciplina === 'todas' || row.dataset.disciplina === disciplina) {
                row.style.display = 'grid';
            } else {
                row.style.display = 'none';
            }
        });
        
        const count = document.querySelectorAll('.table-row[style="display: grid;"], .table-row:not([style])').length;
        this.showToast(`Mostrando ${count} registros`);
    }

    updateResumo() {
        // Simular dados baseados no período
        const dados = this.getResumoData(this.currentPeriodo);
        
        document.getElementById('taxa-acerto').textContent = dados.taxaAcerto;
        document.getElementById('questoes-resolvidas').textContent = dados.questoes;
        document.getElementById('tempo-estudado').textContent = dados.tempo;
        document.getElementById('sequencia-dias').textContent = dados.sequencia;
        
        // Animate numbers
        this.animateNumbers();
    }

    getResumoData(periodo) {
        const dados = {
            hoje: {
                taxaAcerto: '85%',
                questoes: '47',
                tempo: '3h 25m',
                sequencia: '15'
            },
            semana: {
                taxaAcerto: '82%',
                questoes: '285',
                tempo: '18h 45m',
                sequencia: '15'
            },
            mes: {
                taxaAcerto: '79%',
                questoes: '1.240',
                tempo: '78h 30m',
                sequencia: '15'
            }
        };
        
        return dados[periodo] || dados.hoje;
    }

    handleSugestaoClick(card) {
        const titulo = card.querySelector('h4').textContent;
        const prioridade = card.classList.contains('prioridade-alta') ? 'alta' : 
                          card.classList.contains('prioridade-media') ? 'média' : 'baixa';
        
        this.showToast(`Sugestão "${titulo}" (prioridade ${prioridade}) será implementada em breve!`);
        
        // Animate card
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    animateCards() {
        const cards = document.querySelectorAll('.resumo-card, .disciplina-card, .sugestao-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.resumo-number');
        
        numbers.forEach(number => {
            number.style.transform = 'scale(1.1)';
            number.style.color = 'var(--primary-color)';
            
            setTimeout(() => {
                number.style.transform = 'scale(1)';
                number.style.color = 'var(--text-primary)';
            }, 300);
        });
    }

    getDisciplinaName(disciplina) {
        const names = {
            'matematica': 'Matemática',
            'portugues': 'Português',
            'fisica': 'Física',
            'quimica': 'Química',
            'biologia': 'Biologia',
            'historia': 'História',
            'geografia': 'Geografia'
        };
        return names[disciplina] || disciplina;
    }

    getPeriodoLabel(periodo) {
        const labels = {
            'hoje': 'Hoje',
            'semana': 'Últimos 7 dias',
            'mes': 'Últimos 30 dias'
        };
        return labels[periodo] || periodo;
    }

    getGraficoLabel(tipo) {
        const labels = {
            'acertos': 'Taxa de Acerto',
            'questoes': 'Questões por Dia',
            'tempo': 'Tempo de Estudo'
        };
        return labels[tipo] || tipo;
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

    // Method to save performance data
    savePerformanceData(data) {
        const existing = JSON.parse(localStorage.getItem('desempenho_data') || '[]');
        existing.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 records
        if (existing.length > 100) {
            existing.splice(0, existing.length - 100);
        }
        
        localStorage.setItem('desempenho_data', JSON.stringify(existing));
    }

    // Method to load performance data
    loadPerformanceData() {
        return JSON.parse(localStorage.getItem('desempenho_data') || '[]');
    }

    // Method to calculate statistics
    calculateStats(data) {
        if (!data.length) return null;
        
        const totalQuestoes = data.reduce((sum, item) => sum + item.questoes, 0);
        const totalAcertos = data.reduce((sum, item) => sum + item.acertos, 0);
        const taxaAcerto = Math.round((totalAcertos / totalQuestoes) * 100);
        
        return {
            totalQuestoes,
            totalAcertos,
            taxaAcerto,
            diasAtivos: new Set(data.map(item => item.data.split('T')[0])).size
        };
    }

    // Method to export data
    exportData() {
        const data = {
            historico: this.dadosHistorico,
            resumo: this.getResumoData(this.currentPeriodo),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `desempenho_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('Dados exportados com sucesso!');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.desempenhoManager = new DesempenhoManager();
    
    // Handle window resize for chart
    window.addEventListener('resize', () => {
        setTimeout(() => {
            window.desempenhoManager.renderGrafico();
        }, 100);
    });
});

// Export for use in other modules
window.DesempenhoManager = DesempenhoManager;