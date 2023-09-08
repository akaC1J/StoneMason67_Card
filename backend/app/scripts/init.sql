CREATE TABLE IF NOT EXISTS  content_info
(
    page_id    VARCHAR PRIMARY KEY,
    block_data TEXT
);

CREATE TABLE IF NOT EXISTS  construction_objects
(   id SERIAL PRIMARY KEY,
    name              VARCHAR(255),
    description       TEXT,
    index_photo_path   TEXT,
    object_photo_path TEXT
);

CREATE TABLE IF NOT EXISTS photos
(
    id          SERIAL PRIMARY KEY,
    path        TEXT,
    object_id   INTEGER,
    visible     BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (object_id) REFERENCES construction_objects (id) ON DELETE CASCADE
);
