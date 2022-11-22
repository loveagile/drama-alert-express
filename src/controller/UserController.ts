import { getRepository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/User'

export class UserController {
  private userRepository = getRepository(User)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne({ where: { id: request.params.id } })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne({
      where: { id: request.params.id },
    })
    await this.userRepository.remove(userToRemove)
  }
}
