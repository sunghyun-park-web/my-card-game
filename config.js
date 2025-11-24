// Supabase 설정
const SUPABASE_CONFIG = {
    url: 'https://pjofrykikqcvnlknqxta.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2ZyeWtpa3Fjdm5sa25xeHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDU3MTcsImV4cCI6MjA3OTUyMTcxN30.FXfSySlSr6Yhx0KJYTD5Io778Rcn-8egFCB_qKWgHCg'
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

