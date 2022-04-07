import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { navigationBarStateAtom } from '../../recoil/atom';

/** router を監視して、画面遷移があるとナビゲーションバーを非表示する */
export const useNavigationBar = () => {
  const router = useRouter();
  const setNavigationBarState = useSetRecoilState(navigationBarStateAtom);
  useEffect(() => {
    setNavigationBarState({ display: false });
  }, [router.pathname, router.query])
};