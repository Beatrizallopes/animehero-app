import styles from "./Tabs.module.css";

interface Tab {
  title: string;
  filter: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (arg0: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
      <div className={styles.row}>
         {tabs.map((tab, index) => (
          <h1
            key={index}
            className={index === activeTab ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </h1>
        ))}
      </div>
  );
}

export default Tabs;

