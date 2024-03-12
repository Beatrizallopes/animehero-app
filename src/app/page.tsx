'use client'
import {useState, useEffect} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Pagination, ConfigProvider } from 'antd';
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
  const [pagination, setPagination] = useState({
    actualPage: 1,
    totalPages: 4,
    limit: 15,
  });

  async function getInfo(){
    try{
      setLoading(true);
      let response;
      const {actualPage, totalPages, limit} = pagination;
      if(tabsOptions[activeTab]?.filter === 'all'){
        response = await getAnimes(limit, actualPage);
        setPagination(prevPagination => ({
          ...prevPagination,
          totalPages: Math.ceil(response?.data?.meta?.count / limit)
        }));
      } else {
        response = await getAnimesFiltered(tabsOptions[activeTab]?.filter, limit, actualPage);
        setPagination(prevPagination => ({
          ...prevPagination,
          totalPages: Math.ceil(response?.data?.meta?.count / limit)
        }));
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
  }, [activeTab, pagination.actualPage])

  function handlePageChange(page) {
    setPagination(prevPagination => ({
      ...prevPagination,
      actualPage: page
    }));
  }

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
    <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#FFFFFF',
      colorText: '#FFFFFF',
      colorTextDisabled: '#818080'
    },
    components: {
      Pagination: {
        itemActiveBg: '#EE296B',
      },
    },
  }}
>
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
            <Pagination
              current={pagination.actualPage} 
              total={pagination.totalPages}
              onChange={handlePageChange} 
              defaultPageSize={pagination?.limit}
              showSizeChanger={false}
            />
        </div>
        <div className={styles.ranking}>

        </div>
      </div> 
      <Footer></Footer>
    </main>
    </ConfigProvider>
  );
}
