import express, { Request, Response } from 'express'
import cors from 'cors'
import console from 'console'
import { UsersDatabase } from './database/UsersDatabase'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/users", async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const usersDataBase = new UsersDatabase()
      const videosDB = await usersDataBase.findUsers(q)

      res.status(200).send(videosDB)
  
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }
)

