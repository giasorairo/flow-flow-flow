import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout/layout';

export default function Article() {
  return (
    <Layout>
      <div>
        <h1>article page</h1>
        <Link href="/">TOPに戻る</Link>
      </div>
    </Layout>
  );
};