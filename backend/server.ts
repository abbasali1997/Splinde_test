import express from 'express';
import cors from 'cors';
import dataRouter from "./routes/data.routes";

const server= express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use('/api', dataRouter);

server.listen(PORT, () => {
    console.log("Server started on port 3000");
})
