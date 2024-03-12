'use client'
import {useState, useEffect} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Pagination, ConfigProvider, Input} from 'antd';
const { Search } = Input;
import type { SearchProps } from 'antd/es/input/Search';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import Tabs from "@/components/Tabs/Tabs";
import AnimeBox from '@/components/AnimeBox/AnimeBox';
import {getAnimes, getAnimesFiltered} from '../services/repository/animes';
import AnimeRanking from '@/components/AnimeRanking/AnimeRanking';

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
  const [search, setSearch] = useState('');

  async function getInfo(){
    try{
      setLoading(true);
      let response;
      const {actualPage, totalPages, limit} = pagination;
      if(tabsOptions[activeTab]?.filter === 'all'){
        response = await getAnimes(limit, actualPage, search);
        setPagination(prevPagination => ({
          ...prevPagination,
          totalPages: Math.ceil(response?.data?.meta?.count / limit)
        }));
      } else {
        response = await getAnimesFiltered(tabsOptions[activeTab]?.filter, limit, actualPage, search);
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
  }, [activeTab, pagination.actualPage, search])

  function handlePageChange(page: number) {
    setPagination(prevPagination => ({
      ...prevPagination,
      actualPage: page
    }));
  }

  const onSearch: SearchProps['onSearch'] = (value, _e) => setSearch(value);

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
            id={anime?.id}
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
          colorTextDisabled: '#818080',
          colorBgContainer: '#161F25',
          colorBorder:'#FFFFFF',
          colorErrorBg:'#161F25',
          colorTextDescription: '#FFFFFF',
          colorTextPlaceholder:'#FFFFFF',
          fontFamily:'Nunito',
          colorIcon: '#EE296B',
          colorFillSecondary: '#EE296B'
        },
        components: {
          Pagination: {
            itemActiveBg: '#EE296B',
          },
          Input: {
            activeBg: '#161F25',
            activeBorderColor: '#EE296B',
            // addonBg: '#FFFFFF',
            hoverBg: '#161F25',
            hoverBorderColor:'#EE296B',
            addonBg: '#EE296B',
          }
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
            <Search placeholder="Search anime..." onSearch={onSearch} style={{ width: 200 }} />
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
          <h1>Top 10 animes <span className={styles.today}>today</span></h1>
          <AnimeRanking></AnimeRanking>
        </div>
      </div> 
      <Footer></Footer>
    </main>
    </ConfigProvider>
  );
}
