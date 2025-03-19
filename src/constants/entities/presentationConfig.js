import {publicStatuses} from "../statuses/publicStatuses.js";
import {generateId} from "../../utils/generateId.js";

export const presentationConfig = [
    {
        inputType: 'textInput',
        name: 'title',
    },
    {
        inputType: 'textInput',
        name: 'description',
    },
];

export const presentationDefaultValues = {
    title: '',
    description: '',
    slides: [],
    status: publicStatuses.draft,
};

export const slidesDefaultValues = {
    id: generateId(),
    template: 'text-top',
    content: '',
    img: '',
    title: '',
};

export const slideConfig = [
    {
        inputType: 'textInput',
        name: 'title',
    },
    {
        inputType: 'textArea',
        name: 'content',
    },
    {
        inputType: 'imagePicker',
        name: 'img',
        size: 16 / 9
    },
    {
        inputType: 'dropdown',
        name: 'template',
    },
];
