import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
      <div className={styles.header}>
        <Image src={'./logo.svg'} alt='Logo AnimeHero' width={200} height={40}></Image>
        <h2>O seu portal épico para explorar o mundo dos animes</h2>
      </div>
  );
}
