# 🎴 카드 뒤집기 게임

가장 간단한 웹 기술(HTML, CSS, JavaScript)로 만든 카드 매칭 게임입니다.

## ✨ 주요 기능

- 🎮 **3가지 난이도**: 쉬움(6쌍), 보통(8쌍), 어려움(12쌍)
- ⏱️ **타이머 & 이동 추적**: 실시간으로 게임 진행 상황 확인
- 🎯 **점수 시스템**: 시간과 이동 횟수를 기반으로 점수 계산
- 🏆 **리더보드**: 난이도별 최고 점수 기록
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- ✨ **3D 카드 애니메이션**: 부드러운 카드 플립 효과

## 🚀 시작하기

### 1. 프로젝트 다운로드

이 프로젝트를 로컬에 다운로드하거나 클론하세요.

### 2. Supabase 프로젝트 설정

✅ **이미 설정 완료되었습니다!**

프로젝트가 `sunghyun-park-web's Project`에 연동되어 있습니다.
게임을 플레이하고 점수를 저장하면 자동으로 Supabase에 기록됩니다!

#### 참고: 데이터베이스 테이블 구조

이미 생성된 `game_scores` 테이블:

```sql
-- players 테이블 생성
CREATE TABLE players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- game_scores 테이블 생성
CREATE TABLE game_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    moves INTEGER NOT NULL,
    time_taken INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_game_scores_difficulty ON game_scores(difficulty);
CREATE INDEX idx_game_scores_score ON game_scores(score DESC);
CREATE INDEX idx_game_scores_player_id ON game_scores(player_id);

-- Row Level Security (RLS) 정책 설정
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read players" ON players
    FOR SELECT USING (true);

CREATE POLICY "Anyone can read game_scores" ON game_scores
    FOR SELECT USING (true);

-- 모든 사용자가 삽입 가능
CREATE POLICY "Anyone can insert players" ON players
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert game_scores" ON game_scores
    FOR INSERT WITH CHECK (true);
```

#### 2-3. API 키 가져오기

1. Supabase 대시보드에서 **Settings** → **API** 이동
2. **Project URL**과 **anon public** 키 복사
3. `config.js` 파일을 열고 복사한 정보로 업데이트:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co', // 여기에 Project URL 입력
    anonKey: 'your-anon-key-here' // 여기에 anon public 키 입력
};
```

### 3. 게임 실행

1. 웹 서버로 프로젝트 실행:
   - **VS Code**: Live Server 확장 사용
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx http-server`

2. 브라우저에서 `index.html` 열기

## 📁 파일 구조

```
card_game_2/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── game.js             # 게임 로직
├── supabase.js         # Supabase 연동
├── config.js           # 설정 파일
├── README.md           # 사용 설명서
└── setup_database.sql  # 데이터베이스 설정 SQL
```

## 🎮 게임 방법

1. **난이도 선택**: 메인 화면에서 원하는 난이도를 선택하세요
2. **카드 뒤집기**: 카드를 클릭하여 뒤집으세요
3. **매칭 찾기**: 같은 이모지를 가진 카드 2장을 찾으세요
4. **게임 완료**: 모든 카드를 매칭하면 게임이 종료됩니다
5. **점수 저장**: 이름을 입력하고 점수를 저장하세요
6. **리더보드**: 다른 플레이어들과 점수를 비교하세요

## 📊 점수 계산

```
최종 점수 = 기본 점수 - 시간 패널티 - 이동 패널티

- 기본 점수:
  * 쉬움: 1000점
  * 보통: 2000점
  * 어려움: 3000점

- 시간 패널티: 초당 -1점
- 이동 패널티: 이동당 -10점
```

## 🛠️ 기술 스택

- **프론트엔드**: HTML5, CSS3, Vanilla JavaScript
- **백엔드**: Supabase (PostgreSQL)
- **스타일**: CSS Grid, Flexbox, CSS Animations
- **데이터베이스**: PostgreSQL (Supabase)

## 🔧 커스터마이징

### 카드 이모지 변경

`config.js` 파일에서 카드 이모지를 원하는 대로 변경할 수 있습니다:

```javascript
const GAME_CONFIG = {
    easy: {
        pairs: 6,
        cards: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'] // 동물 테마
    },
    // ...
};
```

### 색상 테마 변경

`styles.css` 파일에서 색상을 변경할 수 있습니다:

```css
body {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여

버그 리포트나 기능 제안은 언제든 환영합니다!

## 💡 문제 해결

### Supabase 연결 오류
- `config.js`에 올바른 URL과 API 키가 입력되었는지 확인하세요
- Supabase 프로젝트가 활성화되어 있는지 확인하세요
- 브라우저 콘솔에서 오류 메시지를 확인하세요

### 점수가 저장되지 않음
- 데이터베이스 테이블이 올바르게 생성되었는지 확인하세요
- RLS(Row Level Security) 정책이 올바르게 설정되었는지 확인하세요

### 게임이 로드되지 않음
- 웹 서버를 통해 실행하고 있는지 확인하세요 (파일 직접 열기 ❌)
- 브라우저 콘솔에서 JavaScript 오류를 확인하세요

## 📞 지원

문제가 발생하면 이슈를 생성하거나 문의해주세요!

---

즐거운 게임 되세요! 🎮✨

