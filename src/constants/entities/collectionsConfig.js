export const defaultValues = {
  description: '',
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fplaceholder2.jpg?alt=media&token=e524e66b-1da1-4e89-bf19-b6ddcbc949a1',
  title: '',
  tags: '',
  lessonIds: [],
};

export const collectionConfig = [
  {
    inputType: 'textInput',
    name: 'title',
    label: 'Collection Title',
    placeholder: `Enter title of the Collection`,
  },
  {
    inputType: 'textInput',
    name: 'description',
    label: 'Collection description',
    placeholder: `Enter description of Collection`,
  },
  {
    inputType: 'textInput',
    name: 'imageUrl',
    label: 'Image URL',
    placeholder: `Enter image url of Collection`,
  },
  {
    inputType: 'tags',
    name: 'tags',
    label: 'Tags',
    placeholder: `Use coma to provide few tags`,
  },
];
