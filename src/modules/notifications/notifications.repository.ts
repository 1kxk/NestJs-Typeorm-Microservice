import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'

import { CreateNoficationDTO } from './models/dtos/create-notification.dto'
import {
  NotificationDocument,
  Notification
} from './models/entities/notification'

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notifications: Model<NotificationDocument>,

    @InjectConnection()
    private readonly connection: Connection
  ) {}

  async create(payload: CreateNoficationDTO): Promise<NotificationDocument> {
    return this.notifications.create(payload)
  }
}
