import { User } from '../../src/modules/users/domain/entities/users.entity'
import { UserRoles } from '../../src/modules/users/domain/enums/user-roles.enum'

const id = '22d0431e-50e2-4c86-a0a3-b414a43def4f'

export const usersMock = {
  id,
  name: 'name',
  username: 'username',
  email: 'email@example.com',
  password: 'password',
  role: UserRoles.USER,
  confirmed: false,
  avatar: '',
  created_at: new Date(),
  updated_at: new Date()
} as User
