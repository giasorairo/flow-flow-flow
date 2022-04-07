import { navigationBarStateAtom } from '../../recoil/atom';
import { useSetRecoilState } from 'recoil';
import styles from './hamburger-menu.module.scss';
import { useCallback } from 'react';

export const HamburgerMenu = () => {
  const setNavigationBarState = useSetRecoilState(navigationBarStateAtom);
  const handlerClickMenuButton = useCallback(() => {
    setNavigationBarState((prev) => ({ display: !prev.display }));
  }, []);
  return (<>
    <button
      type="button"
      onClick={handlerClickMenuButton}
      className={styles['hamburger_menu']}
    >
      <img
        src="/images/icon/hamburger-menu-icon.svg"
        alt="menu-icon"
      />
    </button>
  </>)
};