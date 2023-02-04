enum Role {
  ADMIN = "Admin",
  NORMAL = "Normal"
}

export interface Users {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  created_at: string
}