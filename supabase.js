// Supabase 클라이언트 초기화
let supabase = null;

// Supabase 초기화
function initSupabase() {
    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey || 
        SUPABASE_CONFIG.url === 'YOUR_SUPABASE_URL' || 
        SUPABASE_CONFIG.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.warn('⚠️ Supabase 설정이 필요합니다. config.js 파일을 확인해주세요.');
        return false;
    }
    
    try {
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        console.log('✅ Supabase 연결 성공!');
        return true;
    } catch (error) {
        console.error('❌ Supabase 초기화 실패:', error);
        return false;
    }
}

// 게임 점수 저장 (사용자의 테이블 구조에 맞춤)
async function saveGameScore(playerName, score, moves, timeTaken, difficulty) {
    if (!supabase) {
        if (!initSupabase()) {
            throw new Error('Supabase 설정이 필요합니다.');
        }
    }
    
    try {
        // 매칭 수 계산 (난이도에 따라)
        const matches = GAME_CONFIG[difficulty].pairs;
        
        // 게임 점수 저장 (사용자의 테이블 구조에 맞춤)
        const { data, error } = await supabase
            .from('game_scores')
            .insert([
                {
                    player_name: playerName,
                    moves: moves,
                    time_seconds: timeTaken,
                    matches: matches
                }
            ])
            .select();
        
        if (error) {
            throw error;
        }
        
        console.log('✅ 점수 저장 성공!', data);
        return data;
    } catch (error) {
        console.error('❌ 점수 저장 실패:', error);
        throw error;
    }
}

// 리더보드 가져오기 (난이도별로 필터링)
async function getLeaderboard(difficulty, limit = 10) {
    if (!supabase) {
        if (!initSupabase()) {
            throw new Error('Supabase 설정이 필요합니다.');
        }
    }
    
    try {
        // 해당 난이도의 매칭 수
        const matches = GAME_CONFIG[difficulty].pairs;
        
        // 매칭 수로 난이도 필터링, 시간 순으로 정렬 (빠른 시간이 더 좋음)
        const { data, error } = await supabase
            .from('game_scores')
            .select('*')
            .eq('matches', matches)
            .order('time_seconds', { ascending: true })
            .order('moves', { ascending: true })
            .limit(limit);
        
        if (error) {
            throw error;
        }
        
        return data || [];
    } catch (error) {
        console.error('❌ 리더보드 로딩 실패:', error);
        throw error;
    }
}

// 플레이어의 최고 점수 가져오기
async function getPlayerBestScore(playerName, difficulty) {
    if (!supabase) {
        if (!initSupabase()) {
            throw new Error('Supabase 설정이 필요합니다.');
        }
    }
    
    try {
        const matches = GAME_CONFIG[difficulty].pairs;
        
        const { data, error } = await supabase
            .from('game_scores')
            .select('*')
            .eq('player_name', playerName)
            .eq('matches', matches)
            .order('time_seconds', { ascending: true })
            .limit(1)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            throw error;
        }
        
        return data || null;
    } catch (error) {
        console.error('❌ 최고 점수 조회 실패:', error);
        return null;
    }
}

// 페이지 로드 시 Supabase 초기화
window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
});
