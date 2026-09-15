import express from 'express';
import routes from './routes.js'
const app = express();

app.use(express.json());

app.use('/api/app', routes);
app.listen(3000 , ()=>{
    console.log("Server started on port 3000");
});