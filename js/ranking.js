import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

let supabase;
let allStudents = [];
let currentUser = null;

try {
    supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
    console.warn('Supabase not configured, using mock data');
}

const mockStudents = [
    {
        id: 1,
        name: 'Ana Silva',
        points: 12450,
        questions_solved: 487,
        accuracy: 92,
        badges: ['🔥 Em chamas', '👑 Top 1%', '⚡ Velocista']
    },
    {
        id: 2,
        name: 'Carlos Mendes',
        points: 11890,
        questions_solved: 456,
        accuracy: 89,
        badges: ['🔥 Em chamas', '⭐ Destaque']
    },
    {
        id: 3,
        name: 'Beatriz Costa',
        points: 11250,
        questions_solved: 445,
        accuracy: 88,
        badges: ['⭐ Destaque', '📚 Dedicado']
    },
    {
        id: 4,
        name: 'Diego Ferreira',
        points: 10780,
        questions_solved: 423,
        accuracy: 87,
        badges: ['📚 Dedicado']
    },
    {
        id: 5,
        name: 'Eduarda Lima',
        points: 10340,
        questions_solved: 412,
        accuracy: 85,
        badges: ['⚡ Velocista']
    },
    {
        id: 6,
        name: 'Felipe Santos',
        points: 9890,
        questions_solved: 398,
        accuracy: 84,
        badges: ['📚 Dedicado']
    },
    {
        id: 7,
        name: 'Gabriela Oliveira',
        points: 9560,
        questions_solved: 387,
        accuracy: 83,
        badges: ['⭐ Destaque']
    },
    {
        id: 8,
        name: 'Henrique Alves',
        points: 9120,
        questions_solved: 374,
        accuracy: 82,
        badges: []
    },
    {
        id: 9,
        name: 'Isabela Rocha',
        points: 8890,
        questions_solved: 365,
        accuracy: 81,
        badges: []
    },
    {
        id: 10,
        name: 'João Pedro',
        points: 8450,
        questions_solved: 352,
        accuracy: 80,
        badges: []
    },
    {
        id: 11,
        name: 'Kamila Souza',
        points: 8120,
        questions_solved: 341,
        accuracy: 79,
        badges: []
    },
    {
        id: 12,
        name: 'Leonardo Martins',
        points: 7890,
        questions_solved: 332,
        accuracy: 78,
        badges: []
    },
    {
        id: 13,
        name: 'Marina Gomes',
        points: 7560,
        questions_solved: 324,
        accuracy: 77,
        badges: []
    },
    {
        id: 14,
        name: 'Nicolas Ribeiro',
        points: 7230,
        questions_solved: 315,
        accuracy: 76,
        badges: []
    },
    {
        id: 15,
        name: 'Olivia Barbosa',
        points: 6890,
        questions_solved: 305,
        accuracy: 75,
        badges: []
    }
];

async function fetchRankingData() {
    try {
        if (!supabase) {
            return mockStudents;
        }

        const { data, error } = await supabase
            .from('student_rankings')
            .select('*')
            .order('points', { ascending: false });

        if (error) {
            console.warn('Error fetching ranking data:', error);
            return mockStudents;
        }

        return data && data.length > 0 ? data : mockStudents;
    } catch (error) {
        console.warn('Error in fetchRankingData:', error);
        return mockStudents;
    }
}

function getRankIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
}

function displayTopThree(students) {
    if (students.length < 3) return;

    const positions = [
        { rank: 1, id: 'rank1', medalClass: 'first-place' },
        { rank: 2, id: 'rank2', medalClass: 'second-place' },
        { rank: 3, id: 'rank3', medalClass: 'third-place' }
    ];

    positions.forEach(({ rank, id }) => {
        const student = students[rank - 1];
        const card = document.getElementById(id);

        if (card && student) {
            const nameEl = card.querySelector('.student-name');
            const pointsEl = card.querySelector('.points-value');

            if (nameEl) nameEl.textContent = student.name;
            if (pointsEl) pointsEl.textContent = student.points.toLocaleString('pt-BR');

            const badgesContainer = card.querySelector('.student-badges');
            if (badgesContainer && student.badges && student.badges.length > 0) {
                badgesContainer.innerHTML = student.badges
                    .map(badge => `<span class="badge ${rank === 1 ? 'gold' : ''}">${badge}</span>`)
                    .join('');
            }
        }
    });
}

function displayRankingTable(students) {
    const tableBody = document.getElementById('rankingTableBody');

    if (!tableBody) return;

    if (students.length === 0) {
        tableBody.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏆</div>
                <p>Nenhum estudante encontrado</p>
            </div>
        `;
        return;
    }

    tableBody.innerHTML = students.map((student, index) => {
        const rank = index + 1;
        const isCurrentUser = currentUser && student.id === currentUser.id;

        return `
            <div class="table-row ${isCurrentUser ? 'highlight' : ''}">
                <div class="rank-cell" data-label="Posição">
                    <span class="rank-icon">${getRankIcon(rank)}</span>
                    ${rank > 3 ? `<span>${rank}</span>` : ''}
                </div>
                <div class="student-cell" data-label="Estudante">
                    <div class="student-cell-avatar">👤</div>
                    <span class="student-cell-name">${student.name}</span>
                </div>
                <div class="points-cell" data-label="Pontos">
                    ${student.points.toLocaleString('pt-BR')}
                </div>
                <div class="questions-cell" data-label="Questões">
                    ${student.questions_solved}
                </div>
                <div class="accuracy-cell" data-label="Taxa de Acerto">
                    ${student.accuracy}%
                </div>
                <div class="badges-cell" data-label="Badges">
                    ${student.badges && student.badges.length > 0
                        ? student.badges.map(badge => `<span class="badge">${badge}</span>`).join('')
                        : '<span class="badge">-</span>'
                    }
                </div>
            </div>
        `;
    }).join('');
}

function displayUserPosition(students) {
    const userPositionEl = document.getElementById('userPosition');

    if (!userPositionEl) return;

    if (!currentUser) {
        currentUser = students[Math.floor(Math.random() * Math.min(10, students.length))];
    }

    const userRank = students.findIndex(s => s.id === currentUser.id) + 1;

    userPositionEl.innerHTML = `
        <div class="position-rank">
            <span class="rank-number">#${userRank}</span>
            <span class="rank-label">Posição</span>
        </div>
        <div class="position-stats">
            <div class="stat-item">
                <span class="stat-value">${currentUser.points.toLocaleString('pt-BR')}</span>
                <span class="stat-label">Pontos Totais</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${currentUser.questions_solved}</span>
                <span class="stat-label">Questões Resolvidas</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${currentUser.accuracy}%</span>
                <span class="stat-label">Taxa de Acerto</span>
            </div>
        </div>
    `;

    const userNameEl = document.getElementById('currentUserName');
    if (userNameEl) {
        userNameEl.textContent = currentUser.name;
    }
}

function sortStudents(students, sortBy) {
    const sorted = [...students];

    switch (sortBy) {
        case 'points':
            return sorted.sort((a, b) => b.points - a.points);
        case 'accuracy':
            return sorted.sort((a, b) => b.accuracy - a.accuracy);
        case 'questions':
            return sorted.sort((a, b) => b.questions_solved - a.questions_solved);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        default:
            return sorted;
    }
}

function filterStudents(students, searchTerm) {
    if (!searchTerm) return students;

    const term = searchTerm.toLowerCase().trim();
    return students.filter(student =>
        student.name.toLowerCase().includes(term)
    );
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            const sortBy = sortSelect ? sortSelect.value : 'points';

            let filtered = filterStudents(allStudents, searchTerm);
            filtered = sortStudents(filtered, sortBy);

            displayRankingTable(filtered);
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            const searchTerm = searchInput ? searchInput.value : '';

            let filtered = filterStudents(allStudents, searchTerm);
            filtered = sortStudents(filtered, sortBy);

            displayRankingTable(filtered);

            if (sortBy === 'points') {
                displayTopThree(filtered);
            }
        });
    }
}

async function initRanking() {
    allStudents = await fetchRankingData();

    displayTopThree(allStudents);
    displayRankingTable(allStudents);
    displayUserPosition(allStudents);

    setupEventListeners();
}

document.addEventListener('DOMContentLoaded', initRanking);