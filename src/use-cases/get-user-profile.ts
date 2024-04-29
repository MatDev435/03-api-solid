import { UsersRepository } from '@/repositories/prisma/users-repository'
import { User } from '@prisma/client'
import { SourceNotFoundError } from './errors/source-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new SourceNotFoundError()
    }

    return { user }
  }
}
