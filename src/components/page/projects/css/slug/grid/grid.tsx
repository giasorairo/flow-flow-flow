import styles from './grid.module.scss';
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
      <meta property="og:title" key="ogTItle" content={'grid layout 学習記録。'} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/coding/css/grid`} />
      <meta
        property="og:description"
        key="ogDescription"
        content={'gird layout の学習記録をつらつらと。'}
      />
      <meta property="og:type" content="article" />
      <meta property="og:image" key="ogImage" content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/grid.png`} />
      {/* twitterOGP */}
      <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
      <meta name="twitter:image" key="twitterImage" content={`${process.env.NEXT_PUBLIC_URL}/images/ogp/grid.png`} />
    </Head>
  );
};

export const Grid = () => {
  return (
    <div className={styles['grid_page']}>
      <PageHead />
      <p>gird layout 学習記録。</p>
      <p>
        flexbox やったので grid layout をやっていく。
        いまのレベル感は、<code>display: grid</code> して <code>grid-template-rows</code> か <code>grid-template-column</code> 設定して、gap でいい感じにスペース入れるくらい。
        あと grid-template-column とかのときに使う <code>repeat</code> も雰囲気で使ってる。
      </p>
      <h3>grid layout</h3>
      <p>mdn にいい感じのチュートリアルあるからこれやるかあ。</p>
      <p><a href="https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Grids">mdn - grid</a></p>
      <q>
        グリッドとは、水平方向と数位直方向のラインを集めたもので、デザイン要素を並べて表示することができます。
        ページ間を移動するときに要素が飛び回ったり幅が変わったりしないようなゼザ員を作成するのに役立ちます。
        <p className={styles['quotation_from']}><a href="https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Grids">mdn - grid</a></p>
      </q>
      <p>チュートリアルの途中に動画あるので観る。</p>
      <div className={styles['video_container']}>
        <iframe
          src="https://www.youtube.com/embed/KOvGeFUHAC0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p>
        この動画めちゃめちゃよかった。いや gird layout たいへん便利じゃないか。とくにモバイルのレイアウトなんて超楽勝じゃん。
        これ知っておかないとけないやつだな。(フロントエンジニア 4 年目)。この動画わかりやすすぎる。
      </p>
      <p>youtube の動画の埋め込みをしてるけど、アスペクト比を保ったままの動画の埋め込みはググって最初にでてきたこのサイトのコードをそのままパクった。</p>
      <p><a href="https://web-dev.tech/front-end/css/embed-youtube-iframe-with-proportion/#index_id1">【CSS】YouTube動画の比率（アスペクト比）</a></p>
      <p>
        padding-top で container の要素の高さを指定して、position: absolute で動画を top: 0, left: 0, width; 100%, height: 100% にするといいらしい。
        padding-top を % で指定しているのなんなんだよ、何に対しての比率なんだよと思って調べたら、margin, padding の % は、要素の幅に対しての % らしい。
      </p>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/padding-top">mdn: padding-top</a></p>
      <p>なるほどー。だからアスペクト比が指定できるわけか。9 / 16 * 1000 で 56.25 だもんな。grid 関係ないけど勉強になった。</p>
      <p>動画で出てきたやつやるか</p>

      <div className={styles['sandbox-1']}>
        <div className={styles['grid_container']}>
          <div className={styles['header']}>header</div>
          <div className={styles['nav']}>
            <ul>
              <li>nav</li>
              <li>nav</li>
              <li>nav</li>
              <li>nav</li>
            </ul>
          </div>
          <div className={styles['main']}>main</div>
          <div className={styles['footer']}>footer</div>
        </div>
      </div>

      <p>
        grid-template-columns, grid-template-rows, gap で全体のレイアウトを整えて、 grid-column, grid-row で個々の要素を整えてる。
        使いやすい。
      </p>

      <div className={styles['sandbox-2']}>
        <div className={styles['grid_container']}>
          <div className={styles['header']}>header</div>
          <div className={styles['nav']}>
            <ul>
              <li>nav</li>
              <li>nav</li>
              <li>nav</li>
              <li>nav</li>
            </ul>
          </div>
          <div className={styles['main']}>main</div>
          <div className={styles['footer']}>footer</div>
        </div>
      </div>

      <p>grid-template-areas, grid-area でレウアウトを整えた。</p>
      <p>grid layout 完全に理解したといいたくなるくらい、便利な武器を手に入れた気分。</p>

      <h3>grid-column</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/grid-column">mdn - grid-column</a></p>
      <p>grid-column-end, grid-column-start を一括指定できるプロパティらしい。</p>
      <p>初期値は auto</p>
      <p><code>span && integer</code></p>
      <q>
        <p>グリッドアイテムのグリッド領域の先頭の端が末尾から n 行になるように、グリッドアイテムの配置にグリッドスパンを設定します</p>
        <p className={styles['quotation_from']}><a href="https://developer.mozilla.org/ja/docs/Web/CSS/grid-column">mdn - grid-column</a></p>
      </q>
      <p>...日本語へたくそか？</p>
      <p>
        先頭の端ってなんだ？　ふつうに先頭ってことでいいのか？　先頭から末尾までが n 行になる、だったら自分の感覚とあった文章になる。
        n 個分のセルを使うっていう理解なんだけどあってるのかな。まあいいや。
      </p>
      <p>grid-column-end: -1 は末尾ってことか。</p>
      <p>grid-row も同じかんじでいいぽいな。</p>

      <h3>grid-auto-columns</h3>
      <h3>grid-auto-flow</h3>
      <h3>grid-auto-row</h3>
      <h3>grid-template</h3>

    </div>
  );
};
