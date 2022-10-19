import { relative } from 'path';
import styles from './memo.module.scss';

export const Memo = () => {
  return (
    <div className={styles['memo_page']}>
      <p>memo</p>

      <h3>スクロールバーを position: fixed した要素の上に出したい</h3>

      <div className={styles['sandbox-1']}>
        <div className={styles['container']}>
          <div className={styles['bar']}>
            スクロールバーを表示するための高さ 300 px の div
          </div>
          <div className={styles['fixed']}>
            position: fixed の div
          </div>
        </div>
      </div>

      <h3>position: fixed した要素の上でスクロールしたとき、親の要素、あるいは特定の要素をスクロールさせたい</h3>
    </div>
  );
};