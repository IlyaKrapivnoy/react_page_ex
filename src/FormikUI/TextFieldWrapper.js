import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: false,
        variant: 'outlined',
        error: Boolean(meta.touched && meta.error),
        helperText: meta.touched && meta.error ? meta.error : '',
    };

    return <TextField {...configTextfield} />;
};

export default TextFieldWrapper;
