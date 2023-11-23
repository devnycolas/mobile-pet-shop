import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db_pet_service.db")

export default db