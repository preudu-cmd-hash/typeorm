import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Posts";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "Primeiro nome é obrigatório" })
  @IsString({ message: "Primeiro nome precisa ser um texto" })
  firstName!: string;

  @Column("varchar")
  @IsNotEmpty({ message: "Sobrenome nome é obrigatório" })
  @IsString({ message: "Sobrenome nome precisa ser um texto" })
  lastName!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  // Um usuário pode ter vários posts
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
