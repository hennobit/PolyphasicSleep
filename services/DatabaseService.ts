import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor(private dbName: string) {
        this.createInitialData();
    }

    private getDatabaseConnection() {
        return SQLite.openDatabase(this.dbName);
    }

    private async createTables(tx: SQLite.SQLTransaction) {
        try {
            await tx.executeSql(`
                CREATE TABLE IF NOT EXISTS sleep_models (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    parent_id INTEGER,
                    FOREIGN KEY (parent_id) REFERENCES sleep_models(id)
                );
            `);

            await tx.executeSql(`
                CREATE TABLE IF NOT EXISTS sleep_segments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    sleep_model_id INTEGER,
                    start_angle REAL,
                    end_angle REAL,
                    color TEXT,
                    FOREIGN KEY (sleep_model_id) REFERENCES sleep_models(id)
                );
            `);
        } catch (error) {
            console.log('Error creating tables: ', error);
            throw error;
        }
    }

    private async insertInitialData(tx: SQLite.SQLTransaction) {
        try {
            await tx.executeSql(`
                INSERT INTO sleep_models (name, parent_id) VALUES 
                ('Biphasic', NULL),
                ('Everyman', NULL),
                ('Dual Core', NULL),
                ('Tri Core', NULL),
                ('Non-Reducing', NULL),
                ('Flexible', NULL),
                ('Nap-Only', NULL),
                ('Core-Only', NULL),
                ('Custom', NULL);
            `);

            await tx.executeSql(`
                INSERT INTO sleep_segments (sleep_model_id, start_angle, end_angle, color) VALUES
                (1, 322.5, 12.5, NULL),
                (1, 77.5, 127.5, NULL),
                (2, 120, 125, NULL),
                (2, 345, 52.5, NULL),
                (2, 217.5, 222.5, NULL),
                (3, 322.5, 12.5, NULL),
                (3, 87.5, 112.5, NULL),
                (3, 210, 215, NULL),
                (4, 337.5, 0, NULL),
                (4, 97.5, 120, NULL),
                (4, 217.5, 240, NULL),
                (5, 337.5, 7.5, NULL),
                (5, 67.5, 97.5, NULL),
                (5, 155, 185, NULL),
                (5, 255, 285, NULL),
                (6, 1, 360, NULL),
                (7, 0, 5, NULL),
                (7, 60, 65, NULL),
                (7, 120, 125, NULL),
                (7, 180, 185, NULL),
                (7, 240, 245, NULL),
                (7, 300, 305, NULL),
                (8, 345, 60, NULL),
                (8, 195, 217.5, NULL);
            `);
        } catch (error) {
            console.log('Error inserting initial data: ', error);
            throw error;
        }
    }

    private async createInitialData() {
        try {
            const db = this.getDatabaseConnection();
            db.transaction(async (tx) => {
                console.log('Transaction started');
                await this.createTables(tx);
                await this.insertInitialData(tx);
                console.log('Transaction completed');
            });
        } catch (error) {
            console.log('Error executing transaction: ', error);
        }
    }
}

export default DatabaseService;
