-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT,
    "passwordHash" TEXT
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "age" INTEGER,
    "dateJoined" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "Users" (firstName, lastName, username, passwordHash) 
VALUES
  ('John', 'Doe', 'johndoe1', '$2b$10$orHlPQOONCEP3zoCv1RCeeB/Wn7WYfBra79EYZV7A17nG4/qkp.pi'), 
  ('Jane', 'Doe', 'janedoe1', '$2b$10$P3R3Avk3Q0oUoR6mYkZt4e0fn2rhXeF5zBgWVITHXhTqb/qbnd3Ke'), 
  ('Michael', 'Johnson', 'mjohnson1', '$2b$10$H9XaK.uUHoyEp9N4gC2RIOAjSaADtE6B5VHrLS/tvjQKstRcFd7XO'),
  ('Emily', 'Davis', 'emdavis1', '$2b$10$ROW0ZxUxcabrQVY3QlpGeeht0mc7tCDT.er9PG.BR7BegoIltIBue'), 
  ('David', 'Wilson', 'dwilson1', '$2b$10$XwWMp3S593chJQQxbHdNYeaTXcPaisi..hEs3FMckT584Tq6Oqgyi'); 

INSERT INTO "Profile" (description, age, userId) 
VALUES
  ('Enjoys hiking and reading', 30, 1), 
  ('Loves to travel and cook', 28, 2), 
  ('Passionate about sports', 35, 3),
  ('Interested in music and art', 25, 4), 
  ('Enjoys playing guitar', 40, 5);
-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
 

 