export interface IQuest {
  title: string;
  description: string;
  reward: number;
  progress: number;
}
export const quests = [
  {
    title: "Quest 1",
    description: "Description for Quest 1",
    reward: 100,
    progress: 30,
  },
  {
    title: "Quest 2",
    description: "Description for Quest 2",
    reward: 200,
    progress: 0,
  },
  // {
  //   title: "Quest 3",
  //   description: "Description for Quest 3",
  //   reward: 300,
  //   progress: 0,
  // },
  // {
  //   title: "Quest 4",
  //   description: "Description for Quest 4",
  //   reward: 400,
  //   progress: 0,
  // },
];
