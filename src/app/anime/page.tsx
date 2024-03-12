'use client'
import {useState, useEffect, Suspense} from 'react';
import { useRouter, useSearchParams  } from 'next/navigation'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import { Spin, ConfigProvider, FloatButton, Image, Tag, Flex } from 'antd';
import ReactPlayer from 'react-player/youtube';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import { getAnimeById } from '@/services/repository/animes';


export default function Anime() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.has('id') ? searchParams.get('id') : 0;
  const [animeInfo, setAnimeInfo] = useState<any>({});

  async function getInfo(){
    try{
      const response = await getAnimeById(id);
      if(response && response.status === 200){
        setAnimeInfo(response?.data?.data);
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


  function renderFinishedTag(){
    if(animeInfo?.attributes?.status === 'finished'){
      return (
        <Tag color="#5FD37E">finished</Tag>
      )
    } else {
      return (
        <Tag color="#f50">om going</Tag>
      )
    }
  }

  function renderMediaTag(){
      return (
        <Tag color="#108ee9">{animeInfo?.attributes?.showType}</Tag>
      )
    } 

    function renderAgeTag(){
      return (
        <Tag color="#EE296B">{animeInfo?.attributes?.ageRating}</Tag>
      )
    } 

    const YouTubePlayer = () => {
      return (
        <div>
          <br></br>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${animeInfo?.attributes?.youtubeVideoId}`}
            controls
            width="100%"
            height="240px"
          />
        </div>
      );
    };

  function renderContent(){
    if(loading){
      return (
        <div className={styles.loadingBox}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 64, color: '#EE296B' }} spin />} />
        </div>
      )

    } else {
      return (
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <Image src={animeInfo?.attributes?.coverImage?.large} className={styles.poster} width={"100%"} height={200} alt="poster"></Image>
            <div className={styles.row}>
              <div className={styles.column}>
                <h1 className={styles.title}>{animeInfo?.attributes?.canonicalTitle}</h1>
                <h1 className={styles.subtitle}>{animeInfo?.attributes?.titles?.ja_jp}</h1>
                <h1 className={styles.info}>Episodes: {animeInfo?.attributes?.episodeCount} | Duration: {animeInfo?.attributes?.episodeLength} min. </h1>
                <Flex gap="4px 4px" wrap="wrap">
                  {renderFinishedTag()}
                  {renderMediaTag()}
                  {renderAgeTag()}
                </Flex>
                <h3 className={styles.description}>{animeInfo?.attributes?.description}</h3>
              </div>
              <YouTubePlayer></YouTubePlayer>
            </div>

          </div>
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
          colorFillSecondary: '#EE296B',
          colorBgElevated: '#EE296B'
        },
        components: {
        },
      }}
    >
        <Suspense fallback={<div>Loading...</div>}>
    <main className={styles.main}>
      <Header></Header>
      {renderContent()}
   
      <FloatButton 
        onClick={() =>  router.push('/')}
        tooltip={<div>Voltar para animes</div>} 
        icon={<RollbackOutlined />} />
      <Footer></Footer>
    </main>
    </Suspense>
    </ConfigProvider>
  );
}
