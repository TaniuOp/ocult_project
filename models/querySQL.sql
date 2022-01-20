

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    isAdmin boolean DEFAULT FALSE,
    id_company INTEGER,
    name VARCHAR (40),
    email TEXT UNIQUE,
    password VARCHAR(70),
    image VARCHAR(500) DEFAULT 'https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png',
    last_score INTEGER,
    correct_answer VARCHAR[],
    incorrect_answer VARCHAR[],
    created timestamp NOT NULL DEFAULT now (),
    FOREIGN KEY (id_company) REFERENCES company (id_company)
);

CREATE TABLE company (
    id_company SERIAL PRIMARY KEY,
    name VARCHAR (50)
);

INSERT INTO company (name)
VALUES ('The Bridge');

INSERT INTO users (id_company, name, email,password,image,last_score, correct_answer,incorrect_answer)
VALUES (1, 'Marcos', 'mmarcos@gmail.com','1234','https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png',5,array['Ámbito financiero', 'Ámbito empresarial'],array['Ámbito doméstico', 'Phishing']);)