'use client';

import React from 'react';
import InputFieldTextFormHook from './component/Input-Feild/Text-Feild';
import SearchSelectFormHook from './component/Input-Feild/Search-Select/Search-Select';

interface BaseProps {
  Datause: {
    name: string;
    placeholder: string;
    icon?: JSX.Element;
    required: boolean;
    label: string;
    height?: string;
    check?: boolean;
  };
  disable?: boolean;
  formOptions: any;
  className?: string;
  style?: React.CSSProperties;
}

interface TextProps extends BaseProps {
  type: 'text' | 'password';
}

interface SearchSelectProps extends BaseProps {
  type: 'search-select';
  HandelSelectData?: any;
  moreOptions?: {
    passingOptions?: object[];
  };
}

type ComponentProps = TextProps | SearchSelectProps;

const ReusableInput = React.memo(({
  type,
  Datause,
  formOptions,
  disable,
  className,
  style,
  HandelSelectData,
  moreOptions,
}: ComponentProps) => {
  return (
    <div className={className} style={style}>
      {type === 'text' || type === 'password' ? (
        <InputFieldTextFormHook
          type={type}
          Datause={Datause}
          formOptions={formOptions}
          disable={disable}
        />
      ) : null}

      {type === 'search-select' ? (
        <SearchSelectFormHook
          Datause={Datause}
          formOptions={formOptions}
          disable={disable}
          HandelSelectData={HandelSelectData}
          moreOptions={moreOptions}
        />
      ) : null}
    </div>
  );
});

ReusableInput.displayName = 'ReusableInput';

export default ReusableInput;
