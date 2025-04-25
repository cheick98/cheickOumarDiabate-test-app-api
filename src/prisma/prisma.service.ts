import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from 'generated/prisma'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configureService: ConfigService) {
    super({
      datasources: { db: { url: configureService.get('DATABASE_URL') as string } }
    })
  }
}
