// 게임 상태
let gameState = {
    difficulty: '',
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: 0,
    timerInterval: null,
    isProcessing: false
};

// 화면 전환 함수
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 게임 시작
function startGame(difficulty) {
    gameState.difficulty = difficulty;
    gameState.moves = 0;
    gameState.matchedPairs = 0;
    gameState.timer = 0;
    gameState.flippedCards = [];
    gameState.isProcessing = false;

    // 카드 생성
    createCards(difficulty);
    
    // UI 업데이트
    updateStats();
    
    // 타이머 시작
    startTimer();
    
    // 게임 화면으로 전환
    showScreen('game-screen');
}

// 카드 생성
function createCards(difficulty) {
    const config = GAME_CONFIG[difficulty];
    const cardEmojis = config.cards;
    
    // 카드 쌍 생성 (각 카드를 2개씩)
    const cardPairs = [...cardEmojis, ...cardEmojis];
    
    // 카드 셔플
    gameState.cards = shuffleArray(cardPairs);
    
    // 게임 보드에 카드 렌더링
    renderCards();
}

// 카드 렌더링
function renderCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.className = `game-board ${gameState.difficulty}`;
    
    gameState.cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = `
            <div class="card-face card-back">🎴</div>
            <div class="card-face card-front">${emoji}</div>
        `;
        
        card.addEventListener('click', () => handleCardClick(index));
        gameBoard.appendChild(card);
    });
}

// 카드 클릭 처리
function handleCardClick(index) {
    // 처리 중이거나 이미 뒤집힌 카드면 무시
    if (gameState.isProcessing) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    // 카드 뒤집기
    card.classList.add('flipped');
    gameState.flippedCards.push({ index, emoji: card.dataset.emoji, element: card });
    
    // 두 장의 카드가 뒤집혔을 때
    if (gameState.flippedCards.length === 2) {
        gameState.isProcessing = true;
        gameState.moves++;
        updateStats();
        
        checkMatch();
    }
}

// 매칭 확인
function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    if (card1.emoji === card2.emoji) {
        // 매칭 성공
        setTimeout(() => {
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            gameState.matchedPairs++;
            gameState.flippedCards = [];
            gameState.isProcessing = false;
            
            // 모든 카드를 찾았는지 확인
            if (gameState.matchedPairs === GAME_CONFIG[gameState.difficulty].pairs) {
                gameComplete();
            }
        }, 600);
    } else {
        // 매칭 실패 - 흔들림 애니메이션 추가
        card1.element.classList.add('wrong');
        card2.element.classList.add('wrong');
        
        setTimeout(() => {
            card1.element.classList.remove('wrong');
            card2.element.classList.remove('wrong');
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            gameState.flippedCards = [];
            gameState.isProcessing = false;
        }, 1000);
    }
}

// 게임 완료
function gameComplete() {
    // 타이머 정지
    stopTimer();
    
    // 결과 화면 업데이트
    document.getElementById('final-time').textContent = formatTime(gameState.timer);
    document.getElementById('final-moves').textContent = gameState.moves;
    
    // 결과 화면으로 전환
    setTimeout(() => {
        showScreen('result-screen');
    }, 500);
}

// 점수 계산
function calculateScore() {
    // 기본 점수 (난이도별)
    const baseScore = {
        easy: 1000,
        medium: 2000,
        hard: 3000
    };
    
    // 시간 패널티 (초당 -1점)
    const timePenalty = gameState.timer;
    
    // 이동 패널티 (이동당 -10점)
    const movesPenalty = gameState.moves * 10;
    
    // 최종 점수 (최소 0점)
    const finalScore = Math.max(0, baseScore[gameState.difficulty] - timePenalty - movesPenalty);
    
    return finalScore;
}

// 타이머 시작
function startTimer() {
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        updateStats();
    }, 1000);
}

// 타이머 정지
function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// 통계 업데이트
function updateStats() {
    document.getElementById('timer').textContent = formatTime(gameState.timer);
    document.getElementById('moves').textContent = gameState.moves;
}

// 시간 포맷팅
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 배열 셔플 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 게임 종료
function quitGame() {
    if (confirm('게임을 종료하시겠습니까?')) {
        stopTimer();
        goToMainScreen();
    }
}

// 메인 화면으로
function goToMainScreen() {
    stopTimer();
    showScreen('main-screen');
}

// 점수 저장
async function saveScore() {
    const playerName = document.getElementById('player-name').value.trim();
    
    if (!playerName) {
        alert('이름을 입력해주세요!');
        return;
    }
    
    try {
        await saveGameScore(playerName, 0, gameState.moves, gameState.timer, gameState.difficulty);
        alert('점수가 저장되었습니다! 🎉');
        showLeaderboard();
    } catch (error) {
        console.error('점수 저장 오류:', error);
        alert('점수 저장에 실패했습니다. Supabase 설정을 확인해주세요.');
    }
}

// 리더보드 표시
async function showLeaderboard() {
    showScreen('leaderboard-screen');
    
    // 기본 난이도로 리더보드 로드
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[0].classList.add('active');
    
    await filterLeaderboard('easy');
}

// 리더보드 필터링
async function filterLeaderboard(difficulty) {
    // 탭 활성화
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // 로딩 표시
    const content = document.getElementById('leaderboard-content');
    content.innerHTML = '<div class="loading">로딩 중...</div>';
    
    try {
        const scores = await getLeaderboard(difficulty);
        renderLeaderboard(scores);
    } catch (error) {
        console.error('리더보드 로딩 오류:', error);
        content.innerHTML = '<div class="empty-message">리더보드를 불러오는데 실패했습니다.<br>Supabase 설정을 확인해주세요.</div>';
    }
}

// 리더보드 렌더링
function renderLeaderboard(scores) {
    const content = document.getElementById('leaderboard-content');
    
    if (scores.length === 0) {
        content.innerHTML = '<div class="empty-message">아직 기록이 없습니다.<br>첫 번째 기록을 남겨보세요! 🎮</div>';
        return;
    }
    
    const list = document.createElement('ul');
    list.className = 'leaderboard-list';
    
    scores.forEach((score, index) => {
        const item = document.createElement('li');
        item.className = 'leaderboard-item';
        
        item.innerHTML = `
            <div class="leaderboard-rank">#${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${score.player_name}</div>
                <div class="leaderboard-details">
                    🔄 ${score.moves}회 이동
                </div>
            </div>
            <div class="leaderboard-score">⏱️ ${formatTime(score.time_seconds)}</div>
        `;
        
        list.appendChild(item);
    });
    
    content.innerHTML = '';
    content.appendChild(list);
}

// 페이지 로드 시 메인 화면 표시
window.addEventListener('DOMContentLoaded', () => {
    showScreen('main-screen');
});

