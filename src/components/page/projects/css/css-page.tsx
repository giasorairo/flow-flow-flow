import styles from './css-page.module.scss';
import NextLink from 'next/link';


const createCssPageLink = (slug: string) => `${process.env.NEXT_PUBLIC_URL}/projects/css/${slug}`;
const PAGE_LIST: { label: string, url: string }[] = [
  { label: 'flex', url: createCssPageLink('flex') },
  { label: 'grid', url: createCssPageLink('grid') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
  { label: 'ダミーデータ', url: createCssPageLink('flex') },
];

export const CssPage = () => {
  return (
    <div className={styles['css_page']}>
      <div className={styles['title_container']}>css の練習をする page</div>
      <div className={styles['page_list_container']}>
        <ul>
          {PAGE_LIST.map((page) => (
            <li><NextLink href={page.url}>{page.label}</NextLink></li>
          ))}
        </ul>
      </div>
    </div>
  );
};