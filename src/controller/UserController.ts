import { getRepository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/User'

export class UserController {
  private userRepository = getRepository(User)

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find()
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne({ where: { id: req.params.id } })
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.save(req.body)
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne({
      where: { id: req.params.id },
    })
    await this.userRepository.remove(userToRemove)
  }
}
