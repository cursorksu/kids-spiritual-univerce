import { useNavigate } from 'react-router';
import { ShadowCardStyled } from './MainContentStyled';
import { gameList } from '../Games/constants/gameList';
import { VeremLayout } from './VeremLayout.jsx';

export const Games = () => {
  const navigate = useNavigate();

  return (
    <VeremLayout>
      <div className="hero">
        <div className="title-wrapper">
          <h1 className="title">Інтерактивні розваги</h1>
        </div>
      </div>

      <section className="ksu-content">
        <aside className="aside-wrapper">
          <div>
            <h2 className="title">Як працювати з іграми</h2>
            <p>
              Виберіть гру для повторення матеріалу. Натистніть на кнопку
              "Доєднати до уроку" та виберіть у випадаючому списку один з ваших
              уроків
            </p>
            <p>
              Налаштування вибраної гри будуть збережені у відповідному уроці
            </p>
            <p>
              Переходьте до персоналізації вибраної гри натиснувши на іконку
              "⚙︎ Налаштування"
            </p>
            <p>
              Читайте правила гри. Сміливо змінюйте контент для того щоб
              адаптувати гру під ваше бачення і вчення вашої церкви
            </p>
            <p>
              Зберіжіть налаштування і відкрийте ігровий простір з вкладки ігри
              у поточному уроці
            </p>
            <p>
              Засвоюйте з дітьми нове, повторюйте матеріал, грайте,
              розважайтеся, дивуйте своїх учнів
            </p>
          </div>
          <br />
          <iframe
            title="gameDescription"
            width="100%"
            height="315"
            src={'https://youtu.be/hiHy3vW2SxI?t=5'}
            allowFullScreen={true}
          />
        </aside>
        <section className="content-wrapper">
          <h2 className="title">Додайте інтерактивність</h2>
          <ul className="benefits">
            {gameList.map((el) => (
              <ShadowCardStyled key={el.id} onClick={() => navigate(el.link)}>
                {el.icon}
                <h2 className="subtitle">{el.title}</h2>
              </ShadowCardStyled>
            ))}
          </ul>
        </section>
      </section>
    </VeremLayout>
  );
};
