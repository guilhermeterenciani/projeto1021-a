import express, {Request,Response} from 'express';
import mysql2 from 'mysql2/promise';
const app = express();
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
app.listen(3000, () => {
    console.log('Server started on port 3000');
});