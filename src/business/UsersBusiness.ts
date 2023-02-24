import { UsersDatabase } from "../database/UsersDatabase"
import { CreateUserOutputDTO, DeleteUserOutput, GetUsersOutputDTO, LoginOutputDTO } from "../dtos/UserDTO"
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

  public getUsers = async (input: GetUsersOutputDTO) => {
    const {token, q} = input

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }
    if(payload.role !== USER_ROLES.ADMIN){
      throw new BadRequestError("ERROR: Access denied.")
    }
    
    const usersDB: UserDB[] = await this.usersDatabase.getUsers(q)
    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )
      return user.toBusinessModel()
    })

    return users
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

    //signup
    const userInstance = new User(
      this.idGenerator.generate(),
      name, 
      email, 
      await this.hashManager.hash(password), 
      USER_ROLES.NORMAL, 
      new Date().toISOString()
    )

    await this.usersDatabase.createUser(userInstance.toDBModel())

    const tokenPayload: TokenPayload = {
      id: userInstance.getId(),
      name: userInstance.getName(),
      role: userInstance.getRole()
    }

    const output = {
      message: "Signup success",
      token: this.tokenManager.createToken(tokenPayload)
    }

    return output
  }

  public login = async (input: LoginOutputDTO) => {
    const { email, password } = input

    const userDB: UserDB | undefined = await this.usersDatabase.getUserByEmail(email)

    if(!userDB){
      throw new BadRequestError("ERROR: 'email' not found.")
    }

    const passwordHash = await this.hashManager.compare(password, userDB.password)
    if(!passwordHash){
      throw new BadRequestError("ERROR: 'email' or 'password' are wrong.")
    }

    const tokenPayload: TokenPayload = {
      id: userDB.id,
      name: userDB.name,
      role: userDB.role
    }

    const output = {
      message: "Login success",
      token: this.tokenManager.createToken(tokenPayload)
    }

    return output
  }

  public deleteUser = async (input: DeleteUserOutput) => {
    const {idToDelete, token} = input
    const userDB = await this.usersDatabase.getUserById(idToDelete)

    if(!userDB){
      throw new BadRequestError("ERROR: 'id' not found.")
    }

    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    if(payload.role !== USER_ROLES.ADMIN && userDB.id !== payload.id){
      throw new BadRequestError("ERROR: No permission to finish.")
    }

    await this.usersDatabase.deleteUser(idToDelete)
    const output = {
      message: "User deleted."
    }

    return output
  }
}