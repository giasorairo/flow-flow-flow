import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>二畳ラボ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>二畳ラボ</header>
      <q>
        ぼくのぼくによるぼくの国家は、ただ6畳一間の領土と家賃差し引いて残した国家予算。<br />
        地球の未来も気にせず、ぼくはここでひたすら考える。
      </q><br />
      ゴッホ / 毛皮のマリーズ
      <main>
        記事リスト
        {new Array(10)
          .fill(null)
          .map((_, i) => <Link href="/article"><div>{`記事${i}`}</div></Link>)}
      </main>
    </div>
  )
}
