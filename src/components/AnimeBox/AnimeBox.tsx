import styles from "./AnimeBox.module.css";
import Link from 'next/link'
import Image from "next/image";

interface Anime {
  id: string;
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

const AnimeBox: React.FC<Anime> = ({ id, title, canonicalTitle, year, userCount, coverImage, averageRating, description}) => {
  return (
      <Link className={styles.animebox} href={`/anime?id=${id}`}>
        <img className={styles.coverImg} src={coverImage} alt="cover img"></img>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{canonicalTitle}</h1>
          <h1 className={styles.subtitle}>{title}</h1>
          <h3 className={styles.description}>{truncateText(description, 150)}</h3>
        </div>
      </Link>
  );
}

export default AnimeBox;