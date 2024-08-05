const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

app.use(cors());

io.on("connection", (socket) => {
	console.log(`A user connected with ID: ${socket.id}`);

	socket.on("chat message", (msg) => {
		console.log(`Message received from ${socket.id}:`, msg);
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log(`User disconnected with ID: ${socket.id}`);
	});
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
