export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface UserBusinessModel {
  id: string,
  name: string,
  email: string,
  password: string,
  role: USER_ROLES,
  createdAt: string
}

export interface UserDB {
  id: string,
  name: string,
  email: string,
  password: string,
  role: USER_ROLES,
  created_at: string
}

export interface PostBusinessModel {
  id: string,
  creatorId: string,
  content: string,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string
}

export interface PostDB {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

export interface LikesDislikesDB {
  user_id: string,
  post_id: string,
  like: number
}