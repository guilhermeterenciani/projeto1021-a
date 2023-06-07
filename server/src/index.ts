import express, {Request,Response} from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = "SELECT * from pessoas";
    const result = await banco.query(consulta);
    res.send(result[0]);
});
app.post('/', async (req:Request, res:Response) => {
    //Conexao com o banco.
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "INSERT INTO pessoas VALUES (?,?,?)";
    const result = await banco.query(consulta,[req.body.id,req.body.nome,req.body.idade]);
    banco.end();
    res.send(result[0]);
});
app.delete('/:id',async (req:Request, res:Response)=>{
    const banco = await mysql2.createConnection({
        host:"localhost",
        user:"test",
        password:"test",
        database:"test"
    });
    const consulta = 
        "DELETE FROM pessoas WHERE  id = ?";
    const result = await banco.query(consulta,[req.params.id]);
    banco.end();
    res.send(result[0]);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});