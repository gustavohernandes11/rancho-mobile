PRAGMA foreign_keys=ON
-- File for reference when using expo-sqlite
-- Create Animal Table
CREATE TABLE IF NOT EXISTS Animals (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			gender TEXT CHECK(gender IN ('F', 'M')) NOT NULL,
			birthdate TEXT,
			batchId INTEGER REFERENCES Batches(id),
			code TEXT,
			paternityId INTEGER REFERENCES Animals(id),
			maternityId INTEGER REFERENCES Animals(id),
			observation TEXT
		  );

-- Insert Animal
INSERT INTO Animals 
VALUES (name = ?, 
        gender = ?,
        birthdate = ?, 
        batchId = ?, 
        code = ?, 
        paternityId = ?, 
        maternityId = ?, 
        observation = ?);

-- Remove Animal 
DELETE FROM Animals WHERE id = ? 

-- Update Animal
UPDATE Animals SET (name = ?, 
        gender = ?,
        birthdate = ?, 
        batchId = ?, 
        code = ?, 
        paternityId = ?, 
        maternityId = ?, 
        observation = ?) WHERE id = ?

-- Get Animal Info
SELECT (name, 
        gender,
        birthdate, 
        batchId, 
        code, 
        paternityId, 
        maternityId, 
        observation) FROM Animals WHERE id = ?

-- List Animals Info
SELECT (name, 
        gender,
        birthdate, 
        batchId, 
        code, 
        paternityId, 
        maternityId, 
        observation) FROM Animals WHERE

-- Create Batch Table
CREATE TABLE IF NOT EXISTS Batches (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
        );

-- Insert Batch
INSERT INTO Batches VALUES (?, ?)

-- Remove Batch 
DELETE FROM Batches WHERE id = ? 

-- Update Batch
UPDATE Batches SET (name = ?, description = ?) WHERE id = ?

-- Get Batch Info
SELECT * FROM Batches WHERE id = ?

-- List Batches Info
SELECT * FROM Batches

-- List Animals from Batch
SELECT * FROM Animals WHERE BatchId = ?
