import express, { Request, Response} from 'express'
import cors from 'cors'
import { UserRoute } from './app/modules/user/user.route';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/v1',UserRoute)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to PH tour Management Backend'
    })
})

export default app;