import React from 'react'
import styles from "./style.module.scss";
import FlexComponent from '@/Components/UIElements/Layout/Flex';

function ApprovalCheckFormHook() {
  return (
    <FlexComponent gap='.25rem' className={styles.container}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8.00016 14.6666C4.31816 14.6666 1.3335 11.682 1.3335 7.99998C1.3335 4.31798 4.31816 1.33331 8.00016 1.33331C11.6822 1.33331 14.6668 4.31798 14.6668 7.99998C14.6668 11.682 11.6822 14.6666 8.00016 14.6666ZM8.00016 13.3333C9.41465 13.3333 10.7712 12.7714 11.7714 11.7712C12.7716 10.771 13.3335 9.41447 13.3335 7.99998C13.3335 6.58549 12.7716 5.22894 11.7714 4.22874C10.7712 3.22855 9.41465 2.66665 8.00016 2.66665C6.58567 2.66665 5.22912 3.22855 4.22893 4.22874C3.22873 5.22894 2.66683 6.58549 2.66683 7.99998C2.66683 9.41447 3.22873 10.771 4.22893 11.7712C5.22912 12.7714 6.58567 13.3333 8.00016 13.3333ZM7.3355 10.6666L4.50683 7.83798L5.4495 6.89531L7.3355 8.78131L11.1062 5.00998L12.0495 5.95265L7.3355 10.6666Z" fill="#0BB884"/>
        </svg>
        <p className={styles.text}>
          success
        </p>

    </FlexComponent>
  )
}

export default ApprovalCheckFormHook
