export const getOption = (el, selectedItemIdsList) =>
        el
                ? {
                    key: el.id,
                    value: el.id,
                    disabled: selectedItemIdsList?.some((item) => item?.id === el.id),
                    label: el.fullName ? el.fullName : el.title,
                }
                : {
                    key: 1,
                    value: null,
                    disabled: true,
                    label: '',
                };
