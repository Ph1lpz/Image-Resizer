import express,{ Request , Response} from 'express'
import imageRouter from './routes/images'
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get("/" , (req:Request , res:Response) => {
  res.send('root route')
})

app.use('/images' , imageRouter)
app.listen(3000, () => {
  console.log('Server is listening on port 3000...')
})