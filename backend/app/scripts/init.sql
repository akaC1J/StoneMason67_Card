CREATE TABLE IF NOT EXISTS  content_info
(
    page_id    VARCHAR PRIMARY KEY,
    block_data TEXT
);

CREATE TABLE IF NOT EXISTS construction_objects
(   id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    index_photo_path TEXT,
    object_photo_path TEXT,
    index_priority INTEGER default -1,
    object_priority INTEGER default -1
);

CREATE TABLE IF NOT EXISTS photos
(
    id          SERIAL PRIMARY KEY,
    path        TEXT,
    object_id   INTEGER,
    priority INTEGER default -1,
    visible     BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (object_id) REFERENCES construction_objects (id) ON DELETE CASCADE
);

SELECT setval(pg_get_serial_sequence('public.construction_objects', 'id'),
              (SELECT MAX(id) FROM public.construction_objects));