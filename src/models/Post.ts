import { Posts, PostsDB } from "../interfaces"

export class Post {
  constructor(
    private id: string, 
    private creatorId: string,
    private content: string, 
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
    return this.content
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

  public toDBModel(): PostsDB {
    return {
      id: this.id, 
      creator_id: this.creatorId,
      content: this.content, 
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
}

public toBusinessModel(): Posts {
    return {
      id: this.id,
      creatorId: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
}

}