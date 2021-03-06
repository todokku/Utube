import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT;

const handleListen = () =>
  console.log(`✅ 서버 연결 완료 http://localhost:${PORT}`);

app.listen(PORT, handleListen);
