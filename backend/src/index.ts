import express from 'express';

const PORT: string = "3000" || process.env.PORT;

const server: express.Application = express();


// 404 handler
server.use((req, res, next) => {
    res.status(404).send("404: Page not found");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});