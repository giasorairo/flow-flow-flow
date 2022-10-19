import { Flex } from './slug/flex/flex';
import { Grid } from './slug/grid/grid';
import styles from './css-detail.page.module.scss';
import { Memo } from './slug/memo/memo';

const getComponent = (slug: string) => {
  switch (slug) {
    case 'flex': {
      return (<Flex />)
    }
    case 'grid': {
      return <Grid />
    }
    case 'memo': {
      return <Memo />
    }
    default: {
      return <>not found !!</>
    }
  }
};

type Props = {
  slug: string,
}

export const CssDetailPage = (props: Props) => {
  const { slug } = props;
  return (
    <div className={styles['css_detail_page']}>
      <div className={styles['title_container']}>
        [css] {slug}
      </div>
      {getComponent(slug)}
    </div>
  )
};