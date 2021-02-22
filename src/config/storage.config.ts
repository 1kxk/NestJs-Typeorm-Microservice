import path from 'path'

import { registerAs } from '@nestjs/config'

export const storageConfig = registerAs('storage', () => ({
  tmpFolder: path.resolve(__dirname, '..', '..', 'tmp'),
  uploadsFolder: path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
}))
