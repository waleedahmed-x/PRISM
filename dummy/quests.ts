export interface IQuest {
  title: string;
  description: string;
  reward: number;
  game: string;
}
export const quests = [
  {
    title: "Quest 1",
    description: "Description for Quest 1",
    reward: 100,
    game: "Draw Smash",
  },
  {
    title: "Quest 2",
    description: "Description for Quest 2",
    reward: 200,
    game: "Merge Master",
  },
];
