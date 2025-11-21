import Mongo from "./src/utils/mongo";
import Server from "./src/server/server";


const DB_Connection = new Mongo();
const server = new Server();

server.cors();
server.connect();
server.endPoint();

//Connect to DB
DB_Connection.connect();