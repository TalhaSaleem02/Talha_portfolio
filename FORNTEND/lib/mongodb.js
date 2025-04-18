
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);


  try {
    await client.connect();
    return client.db();
    
  } catch (error) {
    console.log("error connecting to Mongodb", error);
    throw error;
    
  }

}