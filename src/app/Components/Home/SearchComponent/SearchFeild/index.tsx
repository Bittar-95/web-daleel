
'use client';
import ReusableInput from '@/Components/UIElements/Input';
import { PagesConstant } from '@/Core/constant/PagesConstant';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

function SearchFeildComponent() {
    const router = useRouter();

    const formOptions=useForm();
    const HandelSelect=(Data)=>{
      router.push(`${PagesConstant.info}/${Data?.name}`);
    }
  
  return (
    <ReusableInput
            HandelSelectData={HandelSelect} 
            formOptions={formOptions} type='search-select'
            Datause={{
                label:"",name:"search",placeholder:"أبحث هنا",
                required:false,DropDown:"5rem"}}/>
  )
}

export default SearchFeildComponent
