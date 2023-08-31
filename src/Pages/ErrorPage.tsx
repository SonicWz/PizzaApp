import Header from '../components/header/Header';
import commonStyles from '../styles/commonStyles.module.css';

const ErrorPage = () => {
  return (
    <div className={commonStyles.wrapper}>
      <div className={commonStyles.container}>
        <Header />
        <main>
          <article className={commonStyles.category}>
            <div className={commonStyles.errorTitleWrap}>
              <p className={commonStyles.errorTitle}>Страница не найдена</p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;