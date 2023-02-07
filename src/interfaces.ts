export enum Role {
  ADMIN = "Admin",
  NORMAL = "Normal"
}

export interface UsersDB {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  created_at: string
}

export interface Users {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  createdAt: string
}

export interface PostsDB {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface Posts {
  id: string,
  creatorId: string,
  content: string,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string
}