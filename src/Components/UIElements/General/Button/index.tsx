"use client";

import React from 'react';
import stylesModule from "./style.module.scss";
import { ScaleLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  className?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  formOptions?: { isValid: boolean; isSubmitting: boolean };
  PassingData?: any;
  DataButton?: any;
  icon?: any;
  loading?: boolean;
  DesignButton?: number;
  passId?: string;
  errorText?: string;
  HoverDisable?: boolean;
  Navigation?:any
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text = 'button',
  type = 'button',
  size = 'medium',
  style = {},
  formOptions = { isSubmitting: false, isValid: true },
  PassingData,
  DataButton,
  icon,
  loading,
  DesignButton = 1,
  passId,
  errorText = "common.errorButton",
  className = '',
  HoverDisable = false,
  Navigation
}) => {
  const sizeStyles = {
    small: {
      padding: '1rem 1rem 1rem 1.5rem',
      fontSize: "1rem",
      lineHeight: "1.5rem",
      height: "2.5rem"
    },
    medium: {
      fontSize: '1rem',
      padding: '1rem 2rem',
      lineHeight: '1.5rem',
    },
    large: {
      fontSize: '1.1rem',
      padding: '2vh 2.5vw',
      lineHeight: '3vh',
    },
  };

  const styles: any = {
    margin: 0,
    ...sizeStyles[size],
    ...style,
  };
  const router = useRouter();
  const { isValid, isSubmitting } = formOptions;

  const getClassNames = (base: string) => {
    return `${base} ${HoverDisable ? stylesModule.noHover : ''} ${className}`.trim();
  };

  if (loading) {
    return (
      <button
        suppressHydrationWarning
        id={passId ?? ""}
        type="button"
        className={`${stylesModule.loading} ${className}`}
        style={{ ...styles, cursor: "default" }}
      >
        <ScaleLoader color="#A58B48" height={11} />
      </button>
    );
  }

  if (isSubmitting || !isValid) {
    return (
      <button
        suppressHydrationWarning
        id={passId ?? ''}
        disabled
        className={getClassNames(DesignButton === 1 ? stylesModule.typeOne : stylesModule.typeTwo) + ` ${stylesModule.disable}`}
        type="button"
        style={styles}
      >
        <span>{text}</span>
        {icon && <span>{icon}</span>}
      </button>
    );
  }

  return (
    <button
      suppressHydrationWarning
      id={passId ?? ''}
      className={getClassNames(DesignButton === 1 ? stylesModule.typeOne : stylesModule.typeTwo)}
      type={type}
      style={styles}
      onClick={() => {
        if (PassingData) {
          PassingData(DataButton);
        } else if (Navigation) {
          router.push(Navigation);
        }
      }}
          >
      <span>{text}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default ButtonComponent;
