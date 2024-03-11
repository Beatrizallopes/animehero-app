'use client'
import {useState} from 'react';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Tabs from "@/components/Tabs/Tabs";

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
        </div>
        <div className={styles.ranking}>

        </div>
      </div>
    </main>
  );
}
