import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
      <div className={styles.footer}>
        <h1>Feito com <span className={styles.heart}>&hearts;</span> para todos os otakus do Brasil</h1>
      </div>
  );
}
