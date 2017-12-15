export default (text = 'hello world') => {
  const el = document.createElement('div');

  el.id = 'app';
  el.innerText = text;
  el.className = 'fa fa-hand-spock-o fa-1g';

  for (var i = 0; i < 5; i++) {
    let componet = document.createElement('div');
    componet.classList.add('img_container_' + (i+1));
    el.appendChild(componet);
  }

  return el;
};
