import createHtmlElement from "../handlers/createHtmlElement"

const displayGameTile = () => {
  const element = createHtmlElement(
    'div',
    null,
    ['bg-white', 'w-7', 'h-7', 'border', 'border-slate-500'],
    null
  )

  return element;
}

const displayGameBoard = () => {
  const element = createHtmlElement(
    'div',
    null,
    ['grid', 'grid-cols-10', 'grid-rows-10', 'min-w-content'],
    null
  )
  for (let i = 0; i < 100; i += 1) {
    element.appendChild(displayGameTile());
  }

  return element;
}


const displayGame = () => {
  const element = createHtmlElement(
    'div',
    'game',
    ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center'],
    '&nbsp;'
  );

  element.appendChild(displayGameBoard());

  return element;
  }

  export default displayGame