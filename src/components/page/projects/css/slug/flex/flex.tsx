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

      <h3>flex</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex</a></p>
      <p>
        mdn によると「flex は CSS の一括プロパティで、フレックスアイテムをフレックスコンテナの領域に収めるために、どのように伸張・収縮させるかを指定します」
        ということらしい。
      </p>

      <h3>flex-grow</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex-grow</a></p>
      <q>
        <p>
          flex-grow は CSS のプロパティで、フレックスアイテムの主軸方向の寸法のフレックス<code>伸長係数</code>を設定します。
        </p>
        <div className={styles['quotation_from']}>
          <a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex">mdn - flex-grow</a>
        </div>
      </q>
      <p>
        <code>フレックス身長係数</code>というのは、フレックスコンテナ内の残りに空間のうち、どれだけがそのアイテムに割り当てられるかを表した値らしい。
      </p>
      <q>
        <p>
          <code>主軸方向の寸法</code>は、アイテムの幅または高さのどちらかで、<code>flex-direction</code>の値に依存して決まります。
        </p>
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

      <h3>flex-shrink</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-shrink">mdn - flex-shrink</a></p>
      <q>
        <p>
          <code>flex-shrink</code> は CSS のプロパティで、フレックスアイテムの <code>縮小係数</code>を設定します。
          すべてのフレックスアイテムの寸法がフレックスコンテナよりも大きい場合、アイテムは<code>flex-shrink</code>の数値にしたがって縮小して収まります。
          <br />
          使用時は<code>flex-shrink</code>は<code>flex-grow</code>や<code>flex-basis</code>などの他のフレックスプロパティとともに使用され、
          ふつうは<code>flex</code>の一括指定を使用して定義されます。
        </p>
        <p className={styles['quotation_from']}>
          <a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-shrink">mdn - flex-shrink</a>
        </p>
      </q>
      <p>
        <code>flex-grow</code> が<code>伸長係数</code>を設定するのに対して、<code>flex-shrink</code> は<code>縮小係数</code>を設定する。なるほど。
      </p>

      <div className={styles['sandbox-2']}>
        <div className={styles['flex_container']}>
          <div className={styles['item-1']}>flex-shrink: 2</div>
          <div className={styles['item-2']}>flex-shrink: 2</div>
          <div className={styles['item-3']}>flex-shrink: 1</div>
          <div className={styles['item-4']}>flex-shrink: 1</div>
          <div className={styles['item-5']}>flex-shrink: 1</div>
        </div>
      </div>

      <p>
        背景がオレンジっぽいところが width: 500px の flex コンテナで、
        そのなかの item を flex-basis: 120px にして、item がコンテナに収まらないようにしている。(flex-basis は flex-shrink の次に勉強する)
      </p>
      <p>
        おー。<code>flex-shrink: 2</code>にしている item が、<code>flex-shrink: 1</code>にしている item より縮小している。
        ちなみに<code>flex-shrink: 1</code>の記述を消してもレイアウトは変わらなかったので<code>flex-shrink</code> の default value が 1 だというのも体感した。
      </p>

      <h3>flex-basis</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-basis">mdn - flex-basis</a></p>
      <q>
        <p>
          <code>flex-basis</code>は CSS のプロパティで、フレックスアイテムの主要部分の初期の寸法を設定します。
          <code>box-sizing</code>で設定していない限り、このプロパティはコンテンツボックスの寸法を定義します。
        </p>
        <p className={styles['quotation_from']}>
          <a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-basis">mdn - flex-basis</a>
        </p>
      </q>
      <p>
        フレックスアイテムの寸法を設定するってのはわかったけど、「box-sizingで設定しない限り、このプロパティはコンテンツボックスの寸法を定義します」がよくわかなんないな。
        コンテンツボックスっていう単語を知らないからか。
      </p>
      <p>これ読めばわかるっぽいけど、ちょっといまはいいや。</p>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/box-sizing#:~:text=content%2Dbox%20%E3%81%AF%20CSS%20%E3%81%AE,%E3%82%88%E3%82%8A%E3%82%82%E5%BA%83%E3%81%8F%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82">mdn - box-sizing</a></p>
      <p>とりあえず flex-basis で flex item のサイズを指定できるらしい。で、mdn によると width よりも flex-basis のほうが優先られるらしい。</p>

      <div className={styles['sandbox-3']}>
        <div className={styles['flex_container']}>
          <div className={styles['flex_item-1']}>flex-basis: 50px</div>
          <div className={styles['flex_item-2']}>flex-basis: 100px</div>
          <div className={styles['flex_item-3']}>flex-basis: 200px</div>
        </div>
      </div>

      <p>まあなんとなくわかった。</p>
      <p>あと flex-wrap ってのも大事そうなので見ておきたい。</p>

      <h3>flex-wrap</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap">mdn - flex-wrap</a></p>
      <q>
        <p>
          flex-wrap は css のプロパティで、フレックスアイテムを単一行に押し込むか、あるいは複数行に折り返してもよいかを指定します。
          折返しを許可する場合は、行を積み重ねる方向の制御も可能です。
        </p>
        <p className={styles['quotation_from']}><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap">mdn - flex-wrap</a></p>
      </q>
      <p><code>flex-wrap: wrap</code>で、折り返して、<code>flex-wrap: nowrap</code>で折り返さないってくらいか。これは知ってたな。</p>

      <p>
        w3 school の flexbox のページをみてて思ったけど、flexbox 関連のプロパティって、
        flex container の設定をするプロパティと flex item の設定をするプロパティにわけられるのか。
      </p>
      <p><a href="https://www.w3schools.com/css/css3_flexbox.asp">w3school - flexbox</a></p>

      <h3>flex container の設定をするプロパティ</h3>
      <ul>
        <li>flex-direction</li>
        <li>flex-wrap</li>
        <li>flex-flow</li>
        <li>justify-content</li>
        <li>align-items</li>
        <li>align-content</li>
      </ul>

      <h3>flex item の設定をするプロパティ</h3>
      <ul>
        <li>order</li>
        <li>flex-grow</li>
        <li>flex-shrink</li>
        <li>flex-basis</li>
        <li>flex</li>
        <li>align-self</li>
      </ul>

      <p>こうやって実際に分けて並べてみるとちょっと整理できた気持ちになるな。</p>

      <p>flex-flow ってなんだろ。使ったことないな。</p>
      <h3>flex-flow</h3>
      <p><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-flow">mdn - flex-flow</a></p>
      <p>あー。<code>flex-direction</code>と<code>flex-wrap</code>を一括で設定できるのか。</p>
      <p>あと align-self についてもちょっと調べておきたいんだよな。なんか使ってはみるけど、いつもうまく動いてくれないから、正しい使い方を知っておきたい。</p>

      <q>
        <p>
          align-self は CSS のプロパティで、グリッドやフレックスのアイテムの align-items の値を上書きします。
          グリッドでは、アイテムはグリッド領域内で配置されます。フレックスボックスでは、アイテムは交差軸上で配置されます。
        </p>
        <p className={styles['quotation_from']}><a href="https://developer.mozilla.org/ja/docs/Web/CSS/flex-flow">mdn - flex-flow</a></p>
      </q>

      <p>交差軸って言葉がわからん。調べる。</p>
      <p><a href="https://developer.mozilla.org/ja/docs/Glossary/Cross_Axis">mdn - cross axis</a></p>
      <q>
        <p>
          フレックスボックスにおける交差軸(cross axis / クロス軸)は、主軸(main axis / メイン軸)で、
          <code>flex-direction</code> が row または <code>row-reverse</code> であるとき(つまり主軸が行方向であるとき)、列方向の軸のことです。
        </p>
        <p>
          主軸が column または column-reverse の場合は、交差軸は行方向となります。
        </p>
        <p className={styles['quotation_from']}><a href="https://developer.mozilla.org/ja/docs/Glossary/Cross_Axis">mdn - cross axis</a></p>
      </q>
      <p>主軸に対する交差軸ってことか。</p>

      <p className={styles['text_center']}>flex-direction: row (主軸: 横, 交差軸: 縦)</p>
      <div className={styles['sandbox-4']}>
        <div className={styles['flex_container_row']}>
          <div className={styles['flex_item-1']}>center</div>
          <div className={styles['flex_item-2']}>start</div>
          <div className={styles['flex_item-3']}>end</div>
        </div>
      </div>

      <p className={styles['text_center']}>flex-direction: column (主軸: 縦, 交差軸: 横)</p>
      <div className={styles['sandbox-5']}>
        <div className={styles['flex_container_column']}>
          <div className={styles['flex_item-1']}>center</div>
          <div className={styles['flex_item-2']}>start</div>
          <div className={styles['flex_item-3']}>end</div>
        </div>
      </div>

      <p>いったん <code>center</code>, <code>start</code>, <code>end</code>くらい使えれば大丈夫かな。</p>

      <p>とりあえず flexbox はこれくらいでいいや。</p>
      <p>学習過程をだらだらと書きながら進めていくスタイルでやってみたけど、なんか無駄が多いなあった気もした。</p>
      <p>でもこうやって書きながら、こまめに deploy して公開してたからこそ、ひととおり最後までできたのでよかった、のかな？</p>
      <p>
        あとレイアウト系は <code>gird</code>学習しないとな。
        それにしても、やっぱりなにかを作りながらの勉強と比べて、純粋に勉強だけするのは大変つまらないなというのは感じたな。
        やっぱり何か作りながらがいいのかな。学習方法もいろいろ考えないとな。
      </p>
      <p>おしまい！</p>
    </div>
  );
};