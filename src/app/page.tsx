'use client'
import {useState, useEffect} from 'react';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Tabs from "@/components/Tabs/Tabs";
import AnimeBox from '@/components/AnimeBox/AnimeBox';
import {getAnimes} from '../services/repository/animes';

const tabsOptions = [
  {
    title: "Todos",
    filter: "all",
  },
  {
    title: "Ação",
    filter: "action",
  },
  {
    title: "Romance",
    filter: "romance",
  },
  {
    title: "Esporte",
    filter: "sports",
  },
  {
    title: "Fantasia",
    filter: "fantasy",
  },
  {
    title: "Terror",
    filter: "terror",
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animesToShow, setAnimesToShow] = useState([]);

  console.log(animesToShow);

  async function getInfo(){
    try{
      const response = await getAnimes();
      if(response && response.status === 200){
        setAnimesToShow(response?.data?.data);
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

  function renderAnimesList(){
    if(loading){
      return (
        <h1>Carregando...</h1>
      )

    } else {
      return (
        <div className={styles.animesList}>
        {animesToShow.map((anime, index)=>(
          <AnimeBox
            key={index}
            title={anime?.attributes?.titles?.ja_jp}
            canonicalTitle={anime?.attributes?.canonicalTitle}
            year={anime?.attributes?.startDate}
            userCount={anime?.attributes?.userCount}
            coverImage={anime?.attributes?.coverImage?.tiny} 
            averageRating={anime?.attributes?.averageRating} 
            description={anime?.attributes?.description}
          ></AnimeBox>
        ))}
      </div>
      )
    }
  }


  return (
    <main className={styles.main}>
      <Header></Header>
      <div className={styles.content}>
        <div className={styles.animes}>
          <div className={styles.row}>
            <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabsOptions}
            ></Tabs>
          </div>
            {renderAnimesList()}
        </div>
        <div className={styles.ranking}>

        </div>
      </div>
    </main>
  );
}
