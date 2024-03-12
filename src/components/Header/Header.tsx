import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
      <div className={styles.header}>
        <Image src={'./logo.svg'} alt='Logo AnimeHero' width={150} height={30}></Image>
        <h2>Your epic gateway to explore the anime world<span className={styles.dot}> .</span></h2>
      </div>
  );
}
