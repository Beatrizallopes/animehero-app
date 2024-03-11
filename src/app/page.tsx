'use client'
import {useState, useEffect} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import Tabs from "@/components/Tabs/Tabs";
import AnimeBox from '@/components/AnimeBox/AnimeBox';
import {getAnimes, getAnimesFiltered} from '../services/repository/animes';

const tabsOptions = [
  {
    title: "Todos",
    filter: "all",
  },
  {
    title: "Action",
    filter: "action",
  },
  {
    title: "Romance",
    filter: "romance",
  },
  {
    title: "Adventure",
    filter: "adventure",
  },
  {
    title: "Fantasy",
    filter: "fantasy",
  },
  {
    title: "Comedy",
    filter: "comedy",
  },
  {
    title: "Horror",
    filter: "horror",
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animesToShow, setAnimesToShow] = useState([]);

  async function getInfo(){
    try{
      setLoading(true);
      let response;
      console.log(activeTab)
      if(tabsOptions[activeTab]?.filter === 'all'){
        response = await getAnimes();
      } else {
        response = await getAnimesFiltered(tabsOptions[activeTab]?.filter);
      }
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
  }, [activeTab])

  function renderAnimesList(){
    if(loading){
      return (
        <div className={styles.loadingBox}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 64, color: '#EE296B' }} spin />} />
        </div>
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
      <Footer></Footer>
    </main>
  );
}
