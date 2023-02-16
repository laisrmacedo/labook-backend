export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface UserDB {
  id: string,
  name: string,
  email: string,
  password: string,
  role: USER_ROLES,
  created_at: string
}

// export interface User {
//   id: string,
//   name: string,
//   email: string,
//   password: string,
//   role: string,
//   createdAt: string
// }

export interface PostDB {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string
}

// export interface Post {
//   id: string,
//   creatorId: string,
//   content: string,
//   likes: number,
//   dislikes: number,
//   createdAt: string,
//   updatedAt: string
// }