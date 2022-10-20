import { relative } from 'path';
import { useCallback, useState } from 'react';
import styles from './memo.module.scss';

const useDialogToggle = () => {
  const [dialogState, setDialogState] = useState<'open' | 'close'>('close');
  const onOpen = useCallback(() => {
    setDialogState('open');
  }, []);
  const onClose = useCallback(() => {
    setDialogState('close');
  }, []);

  return {
    dialogState,
    onOpen,
    onClose,
  }
};

export const Memo = () => {
  const {
    dialogState: dialogStateSandBox1,
    onClose: onCloseSandBox1,
    onOpen: onOpenSandbox1,
  } = useDialogToggle();

  const {
    dialogState: dialogStateSandBox2,
    onClose: onCloseSandBox2,
    onOpen: onOpenSandbox2,
  } = useDialogToggle();

  return (
    <div className={styles['memo_page']}>
      <p>memo</p>

      <h3>スクロールバーを position: fixed した要素の上に出したい</h3>
      <p>A. <code>overflow</code> プロパティを設定している親要素に position: fixed を設定すればいい。</p>

      <div className={styles['center']} onClick={onOpenSandbox1}>
        <button type="button">ダイアログ表示 (改善前)</button>
      </div>

      <div className={`${styles['dialog']} ${styles[dialogStateSandBox1]}`}>
        <div className={styles['dialog_content']}>
          <button className={styles['close_button']} onClick={onCloseSandBox1}>close</button>
          <div className={styles['sandbox-1']}>
            <div className={styles['container']}>
              <div className={styles['box']}>
                <p>スクロールバーを表示するための、親要素の高さより大きい div</p>
                <p>height: calc(100% + 300px)</p>
              </div>
              <div className={styles['fixed']}>
                <p>position: fixed の div</p>
                <p>スクロールバーがこの要素の下に回り込んでしまっている。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4px' }} />

      <div className={styles['center']} onClick={onOpenSandbox2}>
        <button type="button">ダイアログ表示 (改善後)</button>
      </div>

      <div className={`${styles['dialog']} ${styles[dialogStateSandBox2]}`}>
        <div className={styles['dialog_content']}>
          <button className={styles['close_button']} onClick={onCloseSandBox2}>close</button>
          <div className={styles['sandbox-2']}>
            <div className={styles['container']}>
              <div className={styles['box']}>
                <p>スクロールバーを表示するための、親要素の高さより大きい div</p>
                <p>height: calc(100% + 300px)</p> 
                <p>
                  <code>overflow-y: auto</code> をもっている親要素の container に <code>position: fixed</code> を追加
                </p>
              </div>
              <div className={styles['fixed']}>
                <p>position: fixed の div</p>
                <p><code>overflow-y: auto</code> をもっている親の container に <code>position: fixed</code> を追加したので、スクロールバーがこの要素の下に回り込まなくなっている。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>実装してみて fixed の挙動で、position: fixed の要素は、親に position: relative があっても基準にできないというのを知った。</p>
      <p>ただ、position: fixed は、position: fixed の親要素があると、その親要素は基準にできるっぽい。</p>
      <p>mdn 読んだわけでもない、ただの肌感覚なので間違ってるかもしれないけど、挙動的にはそうなってる気がする。</p>
      <h3>position: fixed した要素の上でスクロールしたとき、親の要素、あるいは特定の要素をスクロールさせたい</h3>
    </div>
  );
};