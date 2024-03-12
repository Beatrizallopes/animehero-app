'use client'
import {useState, useEffect} from 'react';
import Link from 'next/link'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from "./AnimeRanking.module.css";
import Image from "next/image";
import {getTrendingAnimes} from '../../services/repository/animes';

interface Anime {
  canonicalTitle: string;
  coverImage: string;
  averageRating: string;
}

interface AnimeRankingProps {
  ranking: Anime[];
}

const AnimeRanking: React.FC = () => {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getInfo(){
    try{
      setLoading(true);
      const response = await getTrendingAnimes();
      if(response && response.status === 200){
        setRanking(response?.data?.data);
      }
    } catch(err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getInfo()
  }, [])

  function renderContent(){
    if(loading){
      return (
          <div className={styles.loadingBox}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 64, color: '#EE296B' }} spin />} />
          </div>
      )
    } else {
      return (
        <>
          <br></br>
          <Image src={'./podium.svg'} alt='Podium' width={150} height={50}></Image>
          <br></br>
          {ranking.map((anime, index) => {
            if(index < 3){
              return (
                <Link key={index} className={styles.animeTop} href={`/anime?id=${anime?.id}`}>
                  <img src={anime?.attributes?.coverImage?.tiny} alt={anime?.attributes?.canonicalTitle} className={styles.icon}/>
                  <h3>{index + 1}. {anime?.attributes?.canonicalTitle} ({anime?.attributes?.averageRating})</h3>
                </Link>
              )
            } else {
              return (
                <Link key={index} className={styles.anime} href={`/anime?id=${anime?.id}`}>
                  <img src={anime?.attributes?.coverImage?.tiny} alt={anime?.attributes?.canonicalTitle} className={styles.icon}/>
                  <h3>{index + 1}. {anime?.attributes?.canonicalTitle} ({anime?.attributes?.averageRating})</h3>
              </Link>
              )
            }

          }
          )}
      </>
      )
    }
  }

 return (
  <div className={styles.animeRanking}>
    {renderContent()}
  </div>

 )
}

export default AnimeRanking;