import styles from "./AnimeBox.module.css";
import Image from "next/image";

interface Anime {
  title: string;
  canonicalTitle: string;
  year: string;
  userCount: number;
  coverImage: string;
  averageRating: string;
  description: string;
}

function truncateText(text: string, characterCount: number): string {
  if (text.length <= characterCount) {
      return text;
  } else {
      return text.substring(0, characterCount) + '...';
  }
}

const AnimeBox: React.FC<Anime> = ({ title, canonicalTitle, year, userCount, coverImage, averageRating, description}) => {
  return (
      <div className={styles.animebox}>
        <Image className={styles.coverImg} src={coverImage} width={200} height={165} alt="cover img"></Image>
        <h1 className={styles.title}>{canonicalTitle}</h1>
        <h1 className={styles.subtitle}>{title}</h1>
        <div className={styles.rowInfo}>   
        </div>
        <h3 className={styles.description}>{truncateText(description, 150)}</h3>
      </div>
  );
}

export default AnimeBox;