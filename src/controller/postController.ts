import { AppDataSource } from "../data-source";
import { Post } from "../entities/Posts";
import { User } from "../entities/User";
import type { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/apiError";
import { validate } from "class-validator";

export class PostController {
  private postRepository = AppDataSource.getRepository(Post);
  private userRespository = AppDataSource.getRepository(User);

  async create(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;
      if (isNaN(userId)) {
        throw new BadRequestError("Requisição inválida");
      }
      const user = await this.userRespository.findOneBy({ id: userId });
      if (!user) throw new NotFoundError("Usuário não encontrado");

      const post = this.postRepository.create({ title, content, user });
      const errors = await validate(post);
      if (errors.length > 0) {
        throw new BadRequestError("Falha de validação");
      }

      await this.postRepository.save(post);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res.status(500).json({
        message: "Ocorreu um erro inesperado ao listar os posts",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const posts = await this.postRepository.find({ relations: ["user"] });
      return res.status(200).json(posts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestError("Requisição inválida");
      }

      return res.status(500).json({
        message: "Ocorreu um erro inesperado ao listar os posts",
      });
    }
  }
}
