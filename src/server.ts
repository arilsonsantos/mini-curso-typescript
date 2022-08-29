import express from "express";

const app = express();

app.get('/', (req, res) => {
    return res.json({
        message: "Olá dev!"
    })
});

app.listen(3333, () => {
    console.log('Server has been started!');
})