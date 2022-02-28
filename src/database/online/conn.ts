import { Db, MongoClient } from "mongodb";
import "dotenv/config";

const connectionString = `mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/test`;
const client = new MongoClient(connectionString);

class Connection {
  private static instance: Connection;
  private dbConnection!: Db;

  private constructor() {
    client.connect((err, db) => {
      if (err || !db) {
        throw new Error(`Error connecting to database: ${err}`);
      }
      this.dbConnection = db.db("Things-To-Do");
      console.log("Successfully connected to MongoDB.");
    });
  }

  static getInstance() {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  getDb() {
    return this.dbConnection;
  }
}

export const connection = Connection.getInstance();
