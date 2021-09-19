import {
  TwitterShareButton,
  FacebookShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  HatenaIcon,
  PinterestShareButton,
  PinterestIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';
import { FrontMatterType } from '../../models';

type ShareButtonsPropsType = {
  slug: string,
  frontmatter: FrontMatterType,
};

export const ShareButtons = (props: ShareButtonsPropsType) => {
  const { slug, frontmatter } = props;
  return (
    <>
      <div>
        <TwitterShareButton url={`${process.env.NEXT_PUBLIC_URL}/post/${slug}`} title={`${frontmatter.title}`}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div>
        <PinterestShareButton
          // 記事のURL
          url={`${process.env.NEXT_PUBLIC_URL}/post/${slug}`}
          // 画像のURL
          media={`${process.env.NEXT_PUBLIC_URL}/${frontmatter.cover_image}`}
          description={`${frontmatter.title}`}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>
      <div>
        <HatenaShareButton url={`${process.env.NEXT_PUBLIC_URL}/post/${slug}`} title={`${frontmatter.title}`}>
          <HatenaIcon size={32} round />
        </HatenaShareButton>
      </div>
      <div>
        <LineShareButton url={`${process.env.NEXT_PUBLIC_URL}/post/${slug}`} title={`${frontmatter.title}`}>
          <LineIcon size={32} round />
        </LineShareButton>
      </div>
      <div>
        <FacebookShareButton url={`${process.env.NEXT_PUBLIC_URL}/post/${slug}`} title={`${frontmatter.title}`}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </>
  );
};