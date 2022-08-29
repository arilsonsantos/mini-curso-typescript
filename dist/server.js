"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = (0, express_1.express)();
app.get('/', (req, res) => {
    return express_1.response.json({
        message: "Olá dev!"
    });
});
app.listen(333, () => {
    console.log('Server has been started!');
});
