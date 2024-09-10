## sentence가 가지고 있어야할 정보

id,
content : 내용
emotion_level : 감정 농도
created_at : 생성 시간
updated_at : 수정 시간
favorite : 찜 갯수
comments[] : 댓글 (comment_id 로 관계)
comment_id : 댓글 관계 포린키?
viewed: 조회수

## garden(잔디밭)이 가지고 있어야할 정보

id,
created_at : 생성 시간
updated_at : 수정 시간
year_month : 해당 년도와 월 (예: '2024.04')
sentences[] : 해당 월에 작성된 문장의 정보 (예: { sentence_id, created_at, content, emotion_level })

## word_dictionary가 가지고 있어야할 정보

id,
created_at : 생성 시간
updated_at : 수정 시간

## 월단위 렌더링 위한 좌표값 구하기

1. 각 달의 1일이 잔디밭 내에서 몇번째 행에 있는지 알아냄
2. 하나의 행이 차지하는 크기를 계산함
3. 몇번째 행인지에 따라 필요한 마이너스 좌표값을 찾아 그만큼 위로 올림
4. 끗
