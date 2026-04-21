import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import type { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/apiError";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName } = req.body;
      const newUser = this.userRepository.create({ firstName, lastName });

      await this.userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }
      return res
        .status(500)
        .json({ message: "Ocorreu um erro inesperado ao criar usuário" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();

      return res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao listar os usuários" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      if (isNaN(id)) {
        throw new BadRequestError("Requisição inválida");
      }

      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundError("Usuário não encontrado");
      }

      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res
        .status(500)
        .json({ message: "Ocorreu um erro inesperado ao deletar o usuário" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const updatedUser = req.body;

      if (isNaN(id)) {
        throw new BadRequestError("Requisição inválida");
      }

      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }

      const updUser = {
        firstName: updatedUser.firstName ?? user.firstName,
        lastName: updatedUser.lastName ?? user.lastName,
      };

      await this.userRepository.update(id, updUser);
      return res.status(200).json(updUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res
        .status(500)
        .json({ message: "Ocorreu um erro inesperado ao atualizar o usuário" });
    }
  }

  async toggleActive(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }

      user.isActive = !user.isActive;
      await this.userRepository.save(user);
      return res.status(200).json({
        message: `Usuário ${
          user.isActive ? "ativado" : "desativado"
        } com sucesso`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res
        .status(500)
        .json({ message: "Ocorreu um erro inesperado ao atualizar o usuário" });
    }
  }

  async listActive(req: Request, res: Response) {
    try {
      const users = await this.userRepository.findBy({ isActive: true });
      return res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res.status(500).json({
        message: "Ocorreu um erro inesperado ao listar os usuários",
      });
    }
  }
}
