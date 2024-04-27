import { UsersRepository } from '@/repositories/prisma/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
