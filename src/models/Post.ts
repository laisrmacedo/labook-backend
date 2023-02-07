export class Post {
  constructor(
    private id: string, 
    private creatorId: string,
    private contente: string, 
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string
  ){}

  public getId():string{
    return this.id
  }
  public getCreatorId():string{
    return this.creatorId
  }
  public getContente():string{
    return this.contente
  }
  public getLikes():number{
    return this.likes
  }
  public getDislikes():number{
    return this.dislikes
  }
  public getCreatedAt():string{
    return this.createdAt
  }
  public getUpdatedAt():string{
    return this.updatedAt
  }

}