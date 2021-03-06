import { Injectable } from '@nestjs/common'

import { CreateNoficationDTO } from './domain/dtos/create-notification.dto'
import { NotificationDocument } from './domain/entities/notification'
import { NotificationsRepository } from './notifications.repository'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async create(payload: CreateNoficationDTO): Promise<NotificationDocument> {
    return this.notificationsRepository.create(payload)
  }
}
