CREATE TABLE content_info
(
    page_id    VARCHAR PRIMARY KEY,
    block_data TEXT
);

CREATE TABLE construction_objects
(
    name              VARCHAR(255) PRIMARY KEY,
    description       TEXT,
    index_photo_path   TEXT,
    object_photo_path TEXT
);

CREATE TABLE photos
(
    id          SERIAL PRIMARY KEY,
    path        TEXT,
    object_name VARCHAR(255),
    visible     BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (object_name) REFERENCES construction_objects (name) ON DELETE CASCADE
);
