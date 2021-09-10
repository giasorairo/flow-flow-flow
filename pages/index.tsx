import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout/layout';

export default function Home() {
  return (
    <Layout>
      <div>
        <main>
          <ul>
            {new Array(10)
              .fill(null)
              .map((_, i) => (
                <li key={i}>
                  <p>2021/08/19</p>
                  <h2><Link href="/article">{`記事${i}`}</Link></h2>
                </li>
              ))}
          </ul>
        </main>
      </div>
    </Layout>
  )
}
