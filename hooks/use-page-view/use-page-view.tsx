import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { existsGaId, pageview } from '../../utils/gtag';

export default function usePageView() {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);
};