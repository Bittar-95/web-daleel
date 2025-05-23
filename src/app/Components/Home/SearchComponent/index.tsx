import React from 'react';
import styles from './style.module.scss';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import SpaceComponent from '@/Components/UIElements/Layout/Space';
import SearchFeildComponent from './SearchFeild';

const SearchWordHeader = () => {
  return (
    <FlexComponent
      className={styles.content}
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <h1 className={styles.mainTitle}>دليلي المعاني</h1>
      <h2 className={styles.subTitle}>نحو بناء معجم عصري شائع</h2>
      <SearchFeildComponent />
      <SpaceComponent bottom='1rem' />
      <p className={styles.description}>بوابتك إلى مفردات أكثر حدة.</p>
    </FlexComponent>
  );
};

export default React.memo(SearchWordHeader);
