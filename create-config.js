// Vercel 배포 시 환경변수로부터 config.js 생성
const fs = require('fs');

const configContent = `// Supabase 설정 (자동 생성됨)
const SUPABASE_CONFIG = {
    url: '${process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL'}',
    anonKey: '${process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'}'
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
`;

fs.writeFileSync('config.js', configContent);
console.log('✅ config.js 생성 완료!');

