import { SearchWords } from "./SearchWords";
import { QueryArrayResult } from "../QueryArrayResult";

export const saveSearchTxt = async (txt: string): Promise<string> => {
  const phrase = await SearchWords.findOne({ where: { phrase: txt } });

  if (phrase) {
    return "Already added";
  } else {
    await SearchWords.create({
      phrase: txt,
    }).save();
    return "Added";
  }
};

export const getAllWords = async (): Promise<QueryArrayResult<SearchWords>> => {
  const words = await SearchWords.find();
  return {
    entities: words,
  };
};
