import { AppDataSource } from "../data-source";
import { Post } from "../entities/Posts";
import { User } from "../entities/User";
import type { Request, Response } from "express";

export class PostController {
  private postRepository = AppDataSource.getRepository(Post);
  private userRespository = AppDataSource.getRepository(User);

  async create(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;
      if (isNaN(userId)) {
        res.json({ message: "Id do usuário inválido" });
      }
      const user = await this.userRespository.findOneBy({ id: userId });
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      const post = this.postRepository.create({ title, content, user });
      await this.postRepository.save(post);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
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
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({
        message: "Ocorreu um erro inesperado ao listar os posts",
      });
    }
  }
}
