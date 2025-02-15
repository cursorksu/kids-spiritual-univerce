export function useSplitAndRemoveWords(inputString) {
  const wordsArray = inputString.split(/\s+/);

  // Количество слов для удаления (20% от общего числа слов)
  const wordsToRemoveCount = Math.ceil(wordsArray.length * 0.2);

  // Массив для удаленных слов
  const removedWordsArray = [];

  // Массив для исходных индексов слов
  const originalIndexes = Array.from(
    { length: wordsArray.length },
    (_, index) => index
  );

  // Случайный выбор индексов слов для удаления
  const randomIndexesToRemove = [];
  while (randomIndexesToRemove.length < wordsToRemoveCount) {
    const randomIndex = Math.floor(Math.random() * originalIndexes.length);
    randomIndexesToRemove.push(originalIndexes.splice(randomIndex, 1)[0]);
  }

  // Удаление слов из исходного массива и добавление их в массив удаленных слов
  randomIndexesToRemove.forEach((index) => {
    removedWordsArray.push({ word: wordsArray[index], index });
    wordsArray[index] = ''; // Замена удаленного слова на пустую строку
  });

  return {
    wordsArray,
    removedWordsArray,
  };
}
