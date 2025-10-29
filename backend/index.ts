import Mongo from "./src/utils/mongo";
import Server from "./src/server/server";


const DB_Connection = new Mongo();
const server = new Server();

server.connect();
server.endPoint();
server.cors();

//Connect to DB
DB_Connection.connect();