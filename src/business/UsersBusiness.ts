import { UsersDatabase } from "../database/UsersDatabase"
import { CreateUserInputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { UsersDB, Role } from "../interfaces"
import { User } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"

export class UsersBusiness {
  constructor(
    private usersDatabase: UsersDatabase
  ){}
  public getUsers = async (q: string | undefined) => {
    // const usersDataBase = new UsersDatabase()
    const usersDB: UsersDB[] = await this.usersDatabase.getUsers(q)

    //tipar pela class?
    const users: User[] = usersDB.map((userDB) => new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    ))

    return (users)
  }

  public createUser = async (input: CreateUserInputDTO) => {
    const {name, email, password} = input
    
    //syntax checking
    if(name.length < 2) {
      throw new BadRequestError("ERROR: 'name' must be at least 2 characters.")
    }
    if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
      throw new BadRequestError("ERROR: 'email' must be like 'example@example.example'.")
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
      throw new BadRequestError("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character")
    }
    
    //replay ckeck
    // const userDatabase = new UsersDatabase()
    const [foundEmail] = await this.usersDatabase.getUserByEmail(email)

    if(foundEmail){
      throw new BadRequestError("ERROR: 'email' already exists.")
    }

    const idInstance = new IdGenerator()
    const id = idInstance.generate()

    //signup
    const userInstance = new User(
      id,
      name, 
      email, 
      password, 
      Role.NORMAL, //temporaria
      new Date().toISOString()
    )

    const userDB: UsersDB = {
      id: userInstance.getId(),
      name: userInstance.getName(),
      email: userInstance.getEmail(),
      password: userInstance.getPassword(),
      role: userInstance.getRole(),
      created_at: userInstance.getCreatedAt()
    }

    await this.usersDatabase.createUser(userDB)

    return userInstance
  }
}