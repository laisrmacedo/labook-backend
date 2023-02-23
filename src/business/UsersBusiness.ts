import { UsersDatabase } from "../database/UsersDatabase"
import { CreateUserOutputDTO, LoginOutputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { UserDB, USER_ROLES } from "../interfaces"
import { User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager, TokenPayload } from "../services/TokenManager"

export class UsersBusiness {
  constructor(
    private usersDatabase: UsersDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
    private hashManager: HashManager
  ){}

  public getUsers = async (q: string | undefined) => {
    const usersDB: UserDB[] = await this.usersDatabase.getUsers(q)

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

  public signup = async (input: CreateUserOutputDTO) => {
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
    const foundEmail = await this.usersDatabase.getUserByEmail(email)
    if(foundEmail){
      throw new BadRequestError("ERROR: 'email' already exists.")
    }

    const hashedPassword = await this.hashManager.hash(password)

    //signup
    const userInstance = new User(
      this.idGenerator.generate(),
      name, 
      email, 
      hashedPassword, 
      USER_ROLES.NORMAL, 
      new Date().toISOString()
    )

    const userDB = userInstance.toDBModel()
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

  public login = async (input: LoginOutputDTO) => {
    const { email, password } = input

    const userDB: UserDB | undefined = await this.usersDatabase.getUserByEmail(email)

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

  public deleteUser = async (idToDelete: string) => {
    const userDB = await this.usersDatabase.getUserById(idToDelete)

    if(userDB.length === 0){
      throw new BadRequestError("ERROR: 'id' not found.")
    }

    await this.usersDatabase.deleteUser(idToDelete)
    const output = {
      message: "User deleted."
    }

    return output
  }
}