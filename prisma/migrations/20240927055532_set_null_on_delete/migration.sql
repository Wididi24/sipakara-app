-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jenisTransaksi" TEXT NOT NULL,
    "nominal" REAL NOT NULL,
    "tanggal" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anggotaId" INTEGER,
    CONSTRAINT "Transaksi_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "Anggota" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaksi" ("anggotaId", "id", "jenisTransaksi", "nominal", "tanggal") SELECT "anggotaId", "id", "jenisTransaksi", "nominal", "tanggal" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
