import styles from './flex.module.scss';
import Head from 'next/head';

const PageHead = () => {
  return (
    <Head>
      <title>flex 学習記録。</title>
      {/* タブ部分のファビコン設定 */}
      <link rel="icon" href="/images/icon/icon.png" />
      {/* スマホのホーム画面に表示されるショートカットアイコン設定 */}
      <link rel="apple-touch-icon" sizes="180x180" href="/images/icon/icon.png" />
      {/* OGPの設定 */}
      <meta name="description" key="description" content={'すこしずつつよくなるブログ'} />
      <meta property="og:site_name" key="ogSiteName" content="flow-flow-flow" />
      <meta property="og:title" key="ogTItle" content={'flex 学習記録。'} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/coding/css/flex`} />
      <meta
        property="og:description"
        key="ogDescription"
        content={'flex 学習記録をつらつらと。'}
      />
      <meta property="og:type" content="article" />
      <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/flex.png`} />
      {/* twitterOGP */}
      <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
      <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/flex.png`} />
    </Head>
  );
};

export const Flex = () => {
  return (
    <div className={styles['flex_page']}>
      <PageHead />
      <p>flex 学習記録。</p>
      <p>
        いまのレベル感としてはなんとなく雰囲気でつかってるかんじ。
        <code>flex-direction</code>, <code>justify-contents</code>, <code>align-items</code>, くらいは使えるけど、
        基本の <code>flex-grow</code>, <code>flex-shrink</code>, <code>flex-basis</code> とかが理解できてない。
        そういう基本を理解して、しっかり flex をつかえるようになりたい。
        あと flex 関連で知らないプロパティがたくさんあると思うので目を通しておきたい。
      </p>
      <h2>とりあえず mdn で flex のページを読む</h2>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex</a></p>
      <p>
        mdn によると「flex は CSS の一括プロパティで、フレックスアイテムをフレックスコンテナの領域に収めるために、どのように伸張・収縮させるかを指定します」
        ということらしい。
      </p>

      <h3>flex-grow</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex-grow</a></p>
      <q>
        flex-grow は CSS のプロパティで、フレックスアイテムの主軸方向の寸法のフレックス身長係数を設定します。
        <div className={styles['quotation_from']}>
          <a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex-grow</a>
        </div>
      </q>
      <p>
        <code>フレックス身長係数</code>というのは、フレックスコンテナ内の残りに空間のうち、どれだけがそのアイテムに割り当てられるかを表した値らしい。
      </p>
      <q>
        <code>主軸方向の寸法</code>は、アイテムの幅または高さのどちらかで、<code>flex-direction</code>の値に依存して決まります。
        <div className={styles['quotation_from']}>
          <a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex-grow</a>
        </div>
      </q>
      <code>flex-direction: row</code>のときは幅、<code>flex-direction: column</code>のときは高さってことかな。
      あと基本的には<code>flex-grow</code>を単体で使うことはなくて、<code>flex-shrink</code>, <code>flex-basis</code>といっしょに使用されるから、
      <code>flex</code>プロパティを使って定義するらしい。

      <div className={styles['sandbox-1']}>
        <div className={styles['flex_container']}>
          <div className={styles['item-1']}>item 1 - flex: 1</div>
          <div className={styles['item-2']}>item 2</div>
          <div className={styles['item-3']}>item 3</div>
        </div>
      </div>

      <p>じっさいに記述してみるとかなり腑に落ちるな。たしかに余ってる空間をどれだけ使うかを指定してる。</p>
      <p>
        で、item 1 にだけ <code>flex: 1</code>を付与すると、たしかに item 1 だけ伸長して他の item は伸長しないので、
        <code>flex-grow</code>のデフォルト値は 0 というのも体感した。
      </p>

      <h2>flex-shrink</h2>
      明日やる。
    </div>
  );
};