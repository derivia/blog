import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";

const postRepository = AppDataSource.getRepository(Post);

export default postRepository;
