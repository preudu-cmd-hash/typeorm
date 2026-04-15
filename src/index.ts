import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("banco conectado");

    const userRepository = AppDataSource.getRepository(User);

    const newUser = userRepository.create({
      firstName: "Pedro",
      lastName: "Paula",
    });

    await userRepository.save(newUser);

    const allUsers = await userRepository.find();

    console.log(`Usuários cadastrados: `, allUsers);
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

main();
