-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT,
    "passwordHash" TEXT
);
INSERT INTO "new_Users" ("firstName", "id", "lastName", "passwordHash", "username") SELECT "firstName", "id", "lastName", "passwordHash", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
