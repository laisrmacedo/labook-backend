export abstract class BaseError extends Error{
  constructor(
    public statusCode: number,
    public message: string
  ){
    super(message)
  }
}