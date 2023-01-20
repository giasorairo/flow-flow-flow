export const sleep = (sleepTimeMS: number) =>
  new Promise((resolve) => setTimeout(resolve, sleepTimeMS));
