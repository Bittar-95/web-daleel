'use client';

import React, { useState } from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import HideSvg from '@/Assets/Icons/hideSvg';
import ShowSvg from '@/Assets/Icons/show';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import IconReactHookForm from '../../Utils/Icon';

const InputFieldTextFormHook = ({ formOptions, Datause, disable,type }) => {
  const { name, placeholder, icon, required, check,label,height } = Datause;
  const { register } = formOptions;
  const [showPassword, setShowPassword] = useState(type !== 'password');
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();

  return (
    <div className={styles.containerAll} ref={ref}>
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`} style={height?{height:height}:{height:"2.5rem"}}>
        <IconReactHookForm icon={icon} isFocused={isFocused}/>
        <div className={styles.containerInputField}>
          {type === 'password' && (
            <p className={styles.PasswordIcon} style={{right:"0"}} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HideSvg/>
              ) : (
                <ShowSvg/>
              )}
            </p>
          )}
          <input
            disabled={disable}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={showPassword ? 'text' : type}
            name={name}
            {...register(name)}
            placeholder={(placeholder)}
          />
        </div>
      </div>
      <ApprovalAndErrorReactHookForm
        check={check}
        formOptions={formOptions}
        name={name}/>
    </div>
  );
}

export default InputFieldTextFormHook;
