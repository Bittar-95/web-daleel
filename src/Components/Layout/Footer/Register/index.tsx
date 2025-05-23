'use client';

import ButtonComponent from '@/Components/UIElements/General/Button'
import ReusableInput from '@/Components/UIElements/Input'
import FlexComponent from '@/Components/UIElements/Layout/Flex'
import React from 'react'
import styles from "./style.module.scss";
import { useForm } from 'react-hook-form';

function RegisterComponent() {
  const formOptions=useForm();

  return (
    <FlexComponent className={styles.register} gap='1.5rem'>
      <h1>اشترك معنا لاكتشاف كلمات جديدة كل يوم</h1>
      <FlexComponent gap='.3rem'>
        <ReusableInput className={styles.containerInput} 
          formOptions={formOptions} type="text" 
          Datause={{label:"",name:"eamil",placeholder:"بريد ألكتروني", required:false}}/>
        <ButtonComponent text="يسجل" size="small"/>
      </FlexComponent>
    </FlexComponent>
  )
}

export default RegisterComponent
