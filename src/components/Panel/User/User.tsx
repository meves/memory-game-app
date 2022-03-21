import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../../formControls/FormControls';
import styles from './User.module.scss';

type FormDataType = {
    userName: string
}

const UserForm: FC<InjectedFormProps<FormDataType>>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="userName" component={Input} type="text" placeholder="enter your name"/>
            <button>Save</button>
        </form>
    )
}   

const ReduxUserForm = reduxForm<FormDataType>({form: 'userForm'})(UserForm);

type PropsType = {
    userName: string
    saveUserName: (userName: string) => void
}

const User: FC<PropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.saveUserName(formData.userName);
    }
    const resetName = () => {
        props.saveUserName("");
    }
    return (
        <div className={styles.user}>
            {props.userName === "" 
                ? <ReduxUserForm onSubmit={onSubmit}/>
                : <div className={styles.currentUser}>
                    <div className={styles.userName}>{props.userName}</div>
                    <button onClick={resetName}>Enter new name</button>    
                </div>
            }            
        </div>
    )
}

export default User;
