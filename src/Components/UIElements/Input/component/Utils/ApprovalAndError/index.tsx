import React from 'react';
import styles from "./style.module.scss";
import ErrorCheckFromHook from '../Error-Check/Error-Check';
import ApprovalCheckFormHook from '../Approval-Check/Approval-Check';
import { FieldErrors, FormState, UseFormRegisterReturn } from 'react-hook-form';

interface ApprovalAndErrorProps {
  formOptions: {
    formState?: FormState<any>;  
    register?: UseFormRegisterReturn; 
  };
  name: string;
  check?: boolean; 
}

const ApprovalAndErrorReactHookForm: React.FC<ApprovalAndErrorProps> = ({ formOptions, name, check }) => {
  const errors = formOptions?.formState?.errors;  
  const touchedFields = formOptions?.formState?.touchedFields;  

  return (
    <div className={styles.approvalAndErrorContainer}> 
      {errors && touchedFields && errors[name] && touchedFields[name] && (
        <ErrorCheckFromHook text={errors[name]?.message || 'حدث خطأ'} />
      )}

      {touchedFields && !errors?.[name] && touchedFields[name] && check && (
        <ApprovalCheckFormHook />
      )}
    </div>
  );
};

export default ApprovalAndErrorReactHookForm;