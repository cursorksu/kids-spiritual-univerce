export const churchConfig = [
  {
    inputType: 'imagePicker',
    name: 'avatar',
    isIgnored: true,
  },
  {
    inputType: 'imagePicker',
    name: 'pastorAvatar',
    isIgnored: true,
  },
  {
    inputType: 'logoPicker',
    name: 'logo',
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'title',
	  required: true,
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'pastor',
    isIgnored: true,
  },
  {
    inputType: 'textInput',
    name: 'subtitle',
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'city',
	  required: true,
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'address',
    isIgnored: false,
  },
  {
    inputType: 'datePicker',
    name: 'createdDate',
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'about',
    isIgnored: true,
  },
  {
    inputType: 'textInput',
    name: 'phone',
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'email',
    isIgnored: false,
  },
  {
    inputType: 'textInput',
    name: 'web',
    isIgnored: false,
  },
  {
    inputType: 'multiselectDropdown',
    entity: 'users',
    name: 'teachers',
    isIgnored: true,
  },
];
