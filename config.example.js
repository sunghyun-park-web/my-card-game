// Supabase 설정 (예시 파일)
// 이 파일을 복사하여 config.js로 만들고 실제 값을 입력하세요

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL', // 예: https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // Supabase 프로젝트의 anon public 키
};

// 게임 설정
const GAME_CONFIG = {
    easy: {
        pairs: 6,
        cards: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒']
    },
    medium: {
        pairs: 8,
        cards: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🍑', '🍉']
    },
    hard: {
        pairs: 12,
        cards: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🍑', '🍉', '🥝', '🍍', '🥭', '🍋']
    }
};

