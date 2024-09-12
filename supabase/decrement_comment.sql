create or replace function decrement_favorite_comment(comment_id integer, user_uuid uuid) 
returns void as $$
declare
  comment_json jsonb;
begin
  update comment
  set favorite = greatest(favorite - 1, 0),
      favorited_user_id = array_remove(favorited_user_id, user_uuid)
  where id = comment_id;

  select row_to_json(comment)::jsonb
  into comment_json
  from comment
  where id = comment_id;

  update user_info
  set favorite_comment = array_remove(favorite_comment, comment_json)
  where id = user_uuid;
end;
$$ language plpgsql;
