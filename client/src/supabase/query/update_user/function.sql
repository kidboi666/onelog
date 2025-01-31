CREATE FUNCTION update_user_profile()
    RETURNS trigger
    LANGUAGE plpgsql
    SECURITY INVOKER
AS $$
BEGIN
    IF NEW.raw_user_meta_data IS NULL THEN
        RETURN NEW;
    END IF;

    UPDATE public.user_info
    SET user_name  = (NEW.raw_user_meta_data::json) ->> 'user_name',
        avatar_url = (NEW.raw_user_meta_data::json) ->> 'avatar_url',
        about_me   = (NEW.raw_user_meta_data::json) ->> 'about_me'
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;