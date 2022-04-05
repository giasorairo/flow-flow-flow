import Layout from '../../components/layout/layout';
import styles from './about.module.scss';

export default function About() {
  return (
    <Layout>
      <div className={styles['about']}>
        <h2>自己紹介</h2>
        <p>フロントエンドエンジニア</p>
        <p>Node.js でバックエンドをやったりもします</p>
        <h2>よく使う</h2>
        <ul>
          <li>typescript</li>
          <li>react</li>
          <li>electron</li>
          <li>express</li>
        </ul>
        <h2>仕事</h2>
        <p>普段は React で web やったり、Electron でアプリやったりしてます。</p>
        <p>個人開発で自動でお金を稼ぐアプリをつくって働かずに生きていくためにプログラマになりましたが、現実は残業しまくりのサラリーマンプログラマです😇</p>
      </div>
    </Layout>
  )
};
