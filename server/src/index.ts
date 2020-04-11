import express from 'express'
const app = express();
const PORT = 9000

app.get('/', (req, res) => {
    res.send('Hello Testing')
});

app.listen(PORT);

console.log(`[app]: http://localhost:${PORT}`);