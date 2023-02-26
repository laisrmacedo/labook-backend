import { PostBusinessModel, PostDB } from "../interfaces"

export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string
  ) { }

  public getId(): string {
    return this.id
  }
  public getCreatorId(): string {
    return this.creatorId
  }

  public getContent(): string {
    return this.content
  }
  public setContent(value: string): void {
    this.content = value
  }

  public getLikes(): number {
    return this.likes
  }
  public addLike() {
    this.likes += 1
  }
  public removeLike() {
    this.likes -= 1
  }

  public getDislikes(): number {
    return this.dislikes
  }
  public addDislike() {
    this.dislikes += 1
  }
  public removeDislike() {
    this.dislikes -= 1
  }

  public getCreatedAt(): string {
    return this.createdAt
  }

  public getUpdatedAt(): string {
    return this.updatedAt
  }
  public setUpdatedAt(value: string): void {
    this.updatedAt = value
  }

  public toDBModel(): PostDB {
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

  public toBusinessModel():PostBusinessModel {
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