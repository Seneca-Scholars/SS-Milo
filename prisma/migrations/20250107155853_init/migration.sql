-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

INSERT INTO "Users" (firstName, lastName, username, passwordHash) 
VALUES
  ('John', 'Doe', 'johndoe1', '$2b$10$orHlPQOONCEP3zoCv1RCeeB/Wn7WYfBra79EYZV7A17nG4/qkp.pi'), 
  ('Jane', 'Doe', 'janedoe1', '$2b$10$P3R3Avk3Q0oUoR6mYkZt4e0fn2rhXeF5zBgWVITHXhTqb/qbnd3Ke'), 
  ('Michael', 'Johnson', 'mjohnson1', '$2b$10$H9XaK.uUHoyEp9N4gC2RIOAjSaADtE6B5VHrLS/tvjQKstRcFd7XO'),
  ('Emily', 'Davis', 'emdavis1', '$2b$10$ROW0ZxUxcabrQVY3QlpGeeht0mc7tCDT.er9PG.BR7BegoIltIBue'), 
  ('David', 'Wilson', 'dwilson1', '$2b$10$XwWMp3S593chJQQxbHdNYeaTXcPaisi..hEs3FMckT584Tq6Oqgyi'); 
-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
