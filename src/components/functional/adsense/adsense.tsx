import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  innerWidth?: number;
};

export const Adsense = (props: Props) => {
  const { innerWidth } = props;
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [asPath, innerWidth]);

  return (
    <div key={asPath}>
      {/* <!-- flow-flow-flow_responsive --> */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          height: "150px",
        }}
        data-ad-client="ca-pub-7112973654947785"
        data-ad-slot="3648592048"
        // data-ad-format="auto"
        // data-full-width-responsive="true"
      />
    </div>
  );
};
