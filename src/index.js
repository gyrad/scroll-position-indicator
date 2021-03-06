function scrollPositionIndicator(custom = {}) {
  let body = document.body,
    html = document.documentElement;

  body.insertAdjacentHTML(
    `afterbegin`,
    `<div class="scroll-indicator"><div></div></div>`
  );

  let scrollIndicator = document.querySelector(`.scroll-indicator`);
  let scrollPosDOM = document.querySelector(`.scroll-indicator > div`);

  body.style = `
  margin: 0;
  padding: 0;
  overscroll-behavior-y: none;
  `;

  scrollIndicator.style = `
  min-height: ${custom.height || `3px`};
  background-color: ${custom.background || `#888888`};
  position: fixed;
  z-index: 99999999999;
  top: 0;
  left: 0;
  width: 100vw;
  `;

  scrollPosDOM.style = `
  width: 0%;
  min-height: ${custom.height || `3px`};
  background-color: ${custom.color || `turquoise`};
  `;

  let docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  let viewportHeight = html.clientHeight;

  let docFinalPos = docHeight - viewportHeight;
  let scrollPos;
  let scrollPercent;

  document.addEventListener('scroll', () => {
    scrollPos =
      window.scrollY ||
      window.scrollTop ||
      document.getElementsByTagName('html')[0].scrollTop;

    scrollPercent = (scrollPos / docFinalPos) * 100;
    document.querySelector(
      '.scroll-indicator div'
    ).style.width = `${scrollPercent}%`;
  });
}
