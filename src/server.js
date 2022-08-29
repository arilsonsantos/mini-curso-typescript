import { express, response } from "express";

const app = express();

app.get('/', (req, res) => {
    return response.json({
        message: "Olá dev!"
    })
});

app.listen(333, () => {
    console.log('Server has been started!');
})