import express from 'express'
import UserRouter from './Routes/UserRoutes'
import postRoutes from './Routes/questionRoutes'
import  AnswersRouter from './Routes/answerRutes'
import  CommentsRouter from './Routes/commentsRoutes'
import  tagsrouter from './Routes/tagsRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import votesrouter from './Routes/votesRoutes'
dotenv.config()
const PORT = 3000
const app= express()

app.use(express.json())
app.use(cors())

app.use('/users',UserRouter)
app.use('/posts', postRoutes);
app.use('/answers',AnswersRouter);
app.use('/tags',tagsrouter)
app.use('/comments',CommentsRouter)
app.use('/votes',votesrouter)
app.listen(PORT, ()=>{
    console.log(`Listening to Port : ${PORT} `);
    
})



// http.createServer((req,res)=>{
//     res.end('Hello from Server')
// }).listen(3000, ()=>{
//     console.log('Server Running...');
    
// })


