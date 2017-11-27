export default (text = 'hello world') => {
  const el = document.createElement('div');

  el.innerText = text;

  return el;
};
