import React, { FC } from 'react';
import styles from './FormControls.module.scss';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

type PropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    type: string
    placeholder: string
}

export const Input: FC<PropsType> = ({input, type, placeholder, meta: {touched, error, warning}}) => {
    const hasError = touched && (error || warning);
    return (
        <div className={`${styles.field} ${hasError ? styles.error : ''}`}>
            <input {...input} type={type} placeholder={placeholder} />
            {touched &&  ( (error && <div>{error}</div>) || (warning && <div>{warning}</div>) )}
        </div>
    )
}
