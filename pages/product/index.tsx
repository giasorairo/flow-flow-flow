import Layout from '../../components/layout/layout';
import styles from './product.module.scss';

export default function Product() {
  return (
    <Layout>
      <div className={styles['product']}>
        <div className={styles['product_title']}>つくった</div>
        <h2>アンダーラインを教えて</h2>
        <div className={styles['img_container']}>
          <img src="./images/product/your-underline.svg" alt="your-underline" />
        </div>
        <h3>概要</h3>
        <p>好きな小説や漫画の一文を twitter で共有するサービスです。</p>
        <h3>link</h3>
        <p><a href="https://yourunderline.net">https://yourunderline.net</a></p>
        <h2>youtube thumbnails getter</h2>
        <div className={styles['img_container']}>
          <img src="./images/product/youtube-thmubnails-getter.svg" alt="" />
        </div>
        <h3>概要</h3>
        <p>
          Youtube で動画を観ながらその動画のサムネイルを確認できる拡張機能です。<br />
          Youtube で動画を観てるときに、「この動画のサムネイルってどうやって確認するんだ？」ってなってつくりました。
        </p>
        <h3>link</h3>
        <p><a href="https://chrome.google.com/webstore/detail/youtube-thumbnails-getter/ghhbhfmihfneeonmbchmkfpdcnmolfgo">youtube thumbnails getter</a></p>
        <h3>code</h3>
        <p><a href="https://github.com/giasorairo/youtube-thumbnails-getter">github</a></p>
      </div>
    </Layout>
  )
};
