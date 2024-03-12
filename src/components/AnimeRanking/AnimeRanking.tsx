'use client'
import {useState, useEffect} from 'react';
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

const AnimeRanking: React.FC<void> = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getInfo(){
    try{
      setLoading(true);
      const response = await getTrendingAnimes();
      console.log('response: ', response)
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
                <div key={index} className={styles.animeTop}>
                  <img src={anime?.attributes?.coverImage?.tiny} alt={anime?.attributes?.canonicalTitle} className={styles.icon}/>
                  <h3>{index + 1}. {anime?.attributes?.canonicalTitle} ({anime?.attributes?.averageRating})</h3>
                </div>
              )
            } else {
              return (
                <div key={index} className={styles.anime}>
                  <img src={anime?.attributes?.coverImage?.tiny} alt={anime?.attributes?.canonicalTitle} className={styles.icon}/>
                  <h3>{index + 1}. {anime?.attributes?.canonicalTitle} ({anime?.attributes?.averageRating})</h3>
              </div>
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