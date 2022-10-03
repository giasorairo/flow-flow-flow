import AboutPage from '../../components/page/about/about.page';

const haveBeenEngineer = (() => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = (current.getMonth() + 1);
  const start = new Date(2020, 9);
  const startYear = start.getFullYear();
  const startMonth = (start.getMonth());
  console.log('current', currentMonth);
  console.log('startMonth', startMonth);

  return `${currentYear - startYear}年${Math.abs((currentMonth < startMonth ? 12 + currentMonth : currentMonth) - startMonth)}ヶ月`;
})();

export default function About() {
  return (
    <AboutPage />
  )
};
