import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "Título é obrigatório" })
  @IsString({ message: "O título deve ser uma string" })
  @MinLength(5, { message: "O título precisa ter pelo menos 5 caracteres" })
  title!: string;

  @Column("text")
  @IsNotEmpty({ message: "Conteúdo é obrigatório" })
  @IsString({ message: "Conteúdo deve ser uma string" })
  content!: string;

  //um user pode ter mts posts
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user!: User;
}
