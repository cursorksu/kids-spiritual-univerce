export const lessonConfig = [
  {
    inputType: 'textInput',
    name: 'title',
    label: 'Lesson Title',
    placeholder: `Enter title of the Lesson`,
  },
  {
    inputType: 'textInput',
    name: 'description',
    label: 'Lesson description',
    placeholder: `Enter description of Lesson}`,
  },
  {
    inputType: 'textInput',
    name: 'imageUrl',
    label: 'Image URL',
    placeholder: `Enter image url of Lesson`,
  },
  {
    inputType: 'textInput',
    name: 'goal',
    label: 'Goal',
    placeholder: `Enter goal of Lesson`,
  },
  {
    inputType: 'textInput',
    name: 'bibleText',
    label: 'Place from Bible',
    placeholder: 'Chose place from Bible',
  },
  {
    inputType: 'textInput',
    name: 'bibleQuote',
    label: 'Quote from Bible',
    placeholder: 'Add quote',
  },
  {
    inputType: 'tags',
    name: 'tags',
    label: 'Tags',
    placeholder: `Use coma to provide few tags`,
  },
];

export const lessonDefaultValues = {
  bible: '',
  description: '',
  goal: '',
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fplaceholder2.jpg?alt=media&token=e524e66b-1da1-4e89-bf19-b6ddcbc949a1',
  bibleText: '',
  bibleQuote: '',
  creative: [],
  material: [],
  title: '',
  tags: [],
  status: 4,
};
