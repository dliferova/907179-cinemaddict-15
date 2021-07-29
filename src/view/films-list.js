export const createFilmCardContainer = () => (
  `<section class="films">
    </section>`
);

export const createFilmsList = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export const createExtraFilmsList = (title) => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
);
