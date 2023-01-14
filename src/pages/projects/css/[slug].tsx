import * as fs from 'fs';
import path from 'path';
import { CssDetailPage } from '../../../components/page/projects/css/css-detail.page';

type Props = {
  slug: string,
}

const CssDetail = (props: Props) => {
  const { slug } = props;
  return <CssDetailPage slug={slug} />
}

export async function getStaticPaths() {
  const directories = fs.readdirSync(path.join('src', 'components', 'page', 'projects', 'css', 'slug'));
  const paths = directories
    .map((directoryName) => ({
    params: {
      slug: directoryName,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      slug,
    },
  };
}

export default CssDetail;

