import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Adsense = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [asPath]);

  return (
    <div key={asPath}>
      {/* <!-- flow-flow-flow_responsive --> */}
      <ins className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-7112973654947785"
        data-ad-slot="3648592048"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
};