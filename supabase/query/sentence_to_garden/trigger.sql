CREATE TRIGGER after_insert_on_sentence
AFTER INSERT ON sentence
FOR each ROW
EXECUTE FUNCTION insert_into_garden();
