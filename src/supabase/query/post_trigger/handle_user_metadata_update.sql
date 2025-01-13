-- 트리거 함수 생성
CREATE OR REPLACE FUNCTION public.handle_user_metadata_update()
RETURNS TRIGGER AS $$
BEGIN
    -- raw_user_meta_data가 변경되었을 때만 실행
    IF NEW.raw_user_meta_data IS DISTINCT FROM OLD.raw_user_meta_data THEN
        -- JSONB 데이터에서 값을 추출하여 user_info 테이블 업데이트
        UPDATE public.user_info
        SET
            about_me = COALESCE((NEW.raw_user_meta_data->>'about_me')::text, about_me),
            avatar_url = COALESCE((NEW.raw_user_meta_data->>'avatar_url')::text, avatar_url),
            user_name = COALESCE((NEW.raw_user_meta_data->>'user_name')::text, user_name),
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = NEW.id;

        -- user_info 레코드가 없는 경우 새로 생성
        IF NOT FOUND THEN
            INSERT INTO public.user_info (
                user_id,
                about_me,
                avatar_url,
                user_name,
                created_at,
                updated_at
            )
            VALUES (
                NEW.id,
                (NEW.raw_user_meta_data->>'about_me')::text,
                (NEW.raw_user_meta_data->>'avatar_url')::text,
                (NEW.raw_user_meta_data->>'user_name')::text,
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
DROP TRIGGER IF EXISTS on_auth_user_metadata_update ON auth.users;
CREATE TRIGGER on_auth_user_metadata_update
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_metadata_update();