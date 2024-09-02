## sentence가 가지고 있어야할 정보

id,
content : 내용
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
sentences[] : 해당 월에 작성된 문장의 정보 (예: { sentence_id, date, content })

## word_dictionary가 가지고 있어야할 정보

id,
created_at : 생성 시간
updated_at : 수정 시간
