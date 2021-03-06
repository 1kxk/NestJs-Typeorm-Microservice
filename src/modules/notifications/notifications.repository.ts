import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from 'modules/notifications/domain/entities/node_modules/@nestjs/mongoose'
import { Connection, Model } from 'modules/notifications/domain/entities/node_modules/mongoose'

import { CreateNoficationDTO } from './domain/dtos/create-notification.dto'
import {
  NotificationDocument,
  Notification
} from './domain/entities/notification'

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
