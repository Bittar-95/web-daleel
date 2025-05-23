
import FlexComponent from "@/Components/UIElements/Layout/Flex";
import styles from "./style.module.scss";
import Image from "next/image";
import LogoOne from "@/Assets/Images/LogoFooterMain.png";
import LogoTwo from "@/Assets/Images/LogoFooterSecond.png";
import RegisterComponent from "./Register";
import FooterContentSection from "./FooterContentSection";

export default function Footer({footer}) {

    return (
      <footer >
        <RegisterComponent/>
          <div className={styles.footer}>
            <FlexComponent justifyContent="space-between" className={styles.mainContainer}>
              <FlexComponent gap="1.5rem">
                <div>سياسة الخصوصية</div>
                <div>شروط الاستخدام</div>
              </FlexComponent>
              <FlexComponent gap="1rem">
                <Image className={styles.LogoOne} src={LogoOne} alt="المعجم"  />
                <Image className={styles.LogoTwo} src={LogoTwo} alt="المعجم"   />
              </FlexComponent>
            </FlexComponent>
          </div>
          <FooterContentSection footer={footer}/>
      </footer>
    );
  }
  