-- 카드 뒤집기 게임 데이터베이스 설정
-- ✅ 이 프로젝트는 이미 설정이 완료되었습니다!

-- 현재 테이블 구조 (이미 생성됨):
-- game_scores:
--   - id (uuid, primary key)
--   - player_name (varchar) - 플레이어 이름
--   - moves (integer) - 카드를 뒤집은 총 시도 횟수
--   - time_seconds (integer) - 게임 완료까지 걸린 시간(초)
--   - matches (integer) - 매칭 성공한 카드 쌍 개수
--   - completed_at (timestamptz)
--   - created_at (timestamptz)

-- 이미 RLS(Row Level Security)가 활성화되어 있습니다.

-- 기존 데이터 조회
SELECT * FROM game_scores ORDER BY time_seconds ASC LIMIT 10;
