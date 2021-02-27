import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from './notifications.repository'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async create(payload: CreateNoficationDTO): Promise<Notification> {
    return this.notificationsRepository.create(payload)
  }
}
