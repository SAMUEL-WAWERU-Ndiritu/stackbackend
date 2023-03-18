"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const questionRoutes_1 = __importDefault(require("./Routes/questionRoutes"));
const answerRutes_1 = __importDefault(require("./Routes/answerRutes"));
const commentsRoutes_1 = __importDefault(require("./Routes/commentsRoutes"));
const tagsRoutes_1 = __importDefault(require("./Routes/tagsRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const votesRoutes_1 = __importDefault(require("./Routes/votesRoutes"));
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', UserRoutes_1.default);
app.use('/posts', questionRoutes_1.default);
app.use('/answers', answerRutes_1.default);
app.use('/tags', tagsRoutes_1.default);
app.use('/comments', commentsRoutes_1.default);
app.use('/votes', votesRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Listening to Port : ${PORT} `);
});
// http.createServer((req,res)=>{
//     res.end('Hello from Server')
// }).listen(3000, ()=>{
//     console.log('Server Running...');
// })
