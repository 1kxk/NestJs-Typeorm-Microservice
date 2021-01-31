import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserRoles } from '../../enums/user-roles.enum'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column({ default: false })
  confirmed: boolean

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  cleanEmail() {
    this.email = this.email.toLowerCase()
    this.email = this.email.trim()
  }
}
