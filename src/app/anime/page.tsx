'use client'
import {useState, useEffect} from 'react';
import { useRouter, useSearchParams  } from 'next/navigation'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import { Spin, ConfigProvider, FloatButton  } from 'antd';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import { getAnimeById } from '@/services/repository/animes';


export default function Anime() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [animeInfo, setAnimeInfo] = useState({});

  async function getInfo(){
    try{
      console.log('id: ' + id);
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

  console.log('animeInfo',animeInfo)


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
    <main className={styles.main}>
      <Header></Header>
      <div className={styles.content}>
      </div> 
      <FloatButton 
        onClick={() =>  router.push('/')}
        tooltip={<div>Voltar para animes</div>} 
        icon={<RollbackOutlined />} />
      <Footer></Footer>
    </main>
    </ConfigProvider>
  );
}
