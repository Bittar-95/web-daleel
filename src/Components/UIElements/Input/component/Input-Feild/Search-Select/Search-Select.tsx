'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './style.module.scss';
import SkeletonComponent from '@/Components/UIElements/Feedback/Skeleton';
import { EmptyComponent } from '@/Components/UIElements/DataDisplay/Empty';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import useFocus from '../../../Hook/FocusedHook';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import { IoClose } from 'react-icons/io5';
import { MeaningService } from '@/Services/ApiService/URL/Meaning.Service';
import api from '@/Services/Api';

const SearchSelectFormHook = ({ formOptions, Datause, disable, HandelSelectData }) => {
  const { name, placeholder, icon, type, required, height, check } = Datause;
  const { register, setValue, watch } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur, setIsFocused } = useFocus();

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSuggestions = async (value) => {
    if (!value) {
      setOptions([]);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`${MeaningService.SearchResults}?Name=${encodeURIComponent(value)}`);
      const result = res.data?.value?.suggestionresults ?? [];
      setOptions(result);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب البيانات:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchStarted(true);
    setLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500);
  };

  const handleSelect = (data) => {
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setIsFocused(false);
    HandelSelectData(data);
  };

  const closeMobileSearch = () => {
    setIsFocused(false);
  };

  const renderDropdownContent = () => (
    <div className={styles.inner}>
      {loading && (
        <div className={styles.ContainerLoading}>
          <SkeletonComponent number={4} style={{ height: '3.6rem' }} />
        </div>
      )}

      {!loading && watch(name) === '' && options?.length === 0 && (
        <FlexComponent className={styles.SearchPlease}>ابدأ بالبحث</FlexComponent>
      )}

      {!loading && searchStarted && options.length === 0 && watch(name) !== '' && (
        <EmptyComponent size="medium" text="لا توجد نتائج" style={{ marginTop: '2.90rem' }} />
      )}

      {!loading&&options?.length>0 &&
      <>
        <div className={styles.titleInner}>نتائج البحث : </div>
          {
               options.map((data, i) => (
                    <div
                      key={i}
                      className={styles.options}
                      onMouseDown={() => handleSelect(data)} 
                    >
                      <div className={styles.mainText}>{data.name}</div>
                      <div className={styles.subText}>{data.details}</div>
                      <hr className={styles.divider} />
                    </div>
              ))
          }      
      </>
        }
    </div>
  );

  return (
    <div className={styles.containerAll} ref={ref} style={{ position: 'relative' }}>
      <div
        style={{ height }}
        className={[
          styles.containerField,
          isFocused ? styles.focusedExpand : '',
          disable ? styles.disable : '',
        ].join(' ')}
        onClick={isMobile ? handleFocus : undefined}
      >
        {icon && <div className={styles.icons}>{icon}</div>}

        <input
          disabled={disable}
          required={required}
          type={type}
          name={name}
          {...register(name)}
          placeholder={placeholder}
          className={styles.inputFeild}
          onFocus={() => {
            if (!isMobile) handleFocus();
          }}
          onKeyUp={handleChange}
        />
        <ApprovalAndErrorReactHookForm check={check} formOptions={formOptions} name={name} />
      </div>

      {isFocused && (
        isMobile ? (
          <div className={styles.fullScreenDropdown}>
            <div className={styles.mobileHeader}>
              <IoClose className={styles.closeIcon} onClick={closeMobileSearch} />
            </div>
            <div className={styles.mobileInputWrapper}>
              <input
                autoFocus
                placeholder={placeholder}
                type={type}
                className={styles.mobileInput}
                onKeyUp={handleChange}
                {...register(name)}
              />
            </div>
            {renderDropdownContent()}
          </div>
        ) : (
          <div className={styles.DropDown}>{renderDropdownContent()}</div>
        )
      )}
    </div>
  );
};

export default SearchSelectFormHook;
