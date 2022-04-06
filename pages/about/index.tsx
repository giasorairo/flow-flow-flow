import Layout from '../../components/layout/layout';
import styles from './about.module.scss';

const haveBeenEngineer = (() => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = (current.getMonth() + 1);
  const start = new Date(2020, 9);
  const startYear = start.getFullYear();
  const startMonth = (start.getMonth());
  console.log('current', currentMonth);
  console.log('startMonth', startMonth);

  return `${currentYear - startYear}年${Math.abs((currentMonth < startMonth ? 12 + currentMonth : currentMonth) - startMonth)}ヶ月`;
})();

export default function About() {
  return (
    <Layout>
      <div className={styles['about']}>
        <h2>自己紹介</h2>
        <p>1991年生まれ</p>
        <p>愛媛大学理学部化学科中退</p>
        <p>フロントエンドエンジニア ({haveBeenEngineer})</p>
        <p>
          仕事では electron x react でデスクトップアプリつくってるのがいちばん長い気がします。<br />
          他にも react で web をやったり、create.js で ゲームつくったり。<br />
          Node.js (express)でバックエンドをやったりしたこともあります。
        </p>
        <p>TDD を勉強中</p>
        <p>個人開発で自動でお金を稼ぐアプリをつくって働かずに生きていくためにプログラマになりましたが、現実は残業しまくりのサラリーマンプログラマです😇</p>
        <p>小説とプログラミングが好きです☕</p>
        <h2>よく使う</h2>
        <ul>
          <li>typescript</li>
          <li>react / next.js</li>
          <li>electron</li>
          <li>Node.js</li>
          <li>express</li>
        </ul>
        <h2>メディア</h2>
        <ul>
          <li><a href="https://mobile.twitter.com/gia_sorairo">twitter</a></li>
          <li><a href="https://zenn.dev/gia">zenn</a></li>
        </ul>
      </div>
    </Layout>
  )
};
