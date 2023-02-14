import { UsersDatabase } from "../database/UsersDatabase"
import { CreateUserInputDTO, LoginInputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { UsersDB, USER_ROLES } from "../interfaces"
import { User } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager, TokenPayload } from "../services/TokenManager"

export class UsersBusiness {
  constructor(
    private usersDatabase: UsersDatabase,
    private tokenManager: TokenManager
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
      USER_ROLES.NORMAL, //temporaria
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

    const tokenPayload: TokenPayload = {
      id: userInstance.getId(),
      name: userInstance.getName(),
      role: userInstance.getRole()
    }

    const token = this.tokenManager.createToken(tokenPayload)
    const output = {
      message: "Signup success",
      token: token
    }

    return output
  }

  public login = async (input: LoginInputDTO) => {
    const { email, password } = input

    const [userDB] = await this.usersDatabase.getUserByEmail(email)

    if(!userDB){
      throw new BadRequestError("ERROR: 'email' not found.")
    }

    if(userDB.password !== password){
      throw new BadRequestError("ERROR: 'email' or 'password' are wrong.")
    }    

    const tokenPayload: TokenPayload = {
      id: userDB.id,
      name: userDB.name,
      role: userDB.role
    }

    const token = this.tokenManager.createToken(tokenPayload)
    const output = {
      message: "Login success",
      token: token
    }

    return output
  }
}