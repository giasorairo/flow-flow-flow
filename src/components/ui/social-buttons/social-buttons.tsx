import {
  TwitterShareButton,
  TwitterIcon,
  HatenaShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
  PinterestShareButton,
  PinterestIcon
} from 'react-share';

type SocialButtonsPropsType = {
  /** 共有する url */
  url: string,
  title: string,
  /** pinterest 共有用の画像 path */
  media?: string,
  /** icon size (px, rem, ...etc) */
  iconSize: string,
};

export const SocialButtons = (props: SocialButtonsPropsType) => {
  const { url, title, media, iconSize } = props;
  return (
    <>
      <TwitterShareButton
        url={url}
        title={title}        
      >            
        <TwitterIcon round={true} size={iconSize} />
      </TwitterShareButton>
      <HatenaShareButton
        url={url}
        title={title}        
      >
        <HatenaIcon round={true} size={iconSize} />
      </HatenaShareButton>
      <LineShareButton
        url={url}
        title={title}        
      >
        <LineIcon round={true} size={iconSize} />
      </LineShareButton>
      <PocketShareButton
        url={url}
        title={title}        
      >
        <PocketIcon round={true} size={iconSize} />
      </PocketShareButton>
      {media ? (
        <PinterestShareButton
          url={url}
          media={media}
          description={title}
        >
          <PinterestIcon round={true} size={iconSize} />
        </PinterestShareButton>
      ) : (
        <></>
      )}
    </>
  );
};