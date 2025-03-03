import { AppDataSource } from "../data-source";
import { Post } from "../models/post";

const postRepository = AppDataSource.getRepository(Post);

export default postRepository;
