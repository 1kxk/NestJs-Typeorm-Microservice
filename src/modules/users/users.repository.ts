import { EntityRepository, Repository } from 'typeorm'

import { User } from './domain/entities/users.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
