import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError{
  constructor(
    //default message
    message: string = "Requisição inválida"
  ){
    super(400, message)
  }
}