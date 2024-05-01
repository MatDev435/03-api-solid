import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'

interface SearchGymsUseCaseProps {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany(query, page)

    return { gyms }
  }
}
