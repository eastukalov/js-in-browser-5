'use strict';

const request = new XMLHttpRequest();
const content = document.getElementById('content');

for(const el of content.getElementsByTagName('li')) {
  el.remove();
}

request.addEventListener('load', onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/');
request.send();

function onLoad(event) {
  if (event.currentTarget.status === 200) {
    const arr = JSON.parse(event.currentTarget.responseText);

    arr.forEach(el => {
      const li = document.createElement('li');
      li.dataset.title = el.title;
      li.dataset.author = el.author.name;
      li.dataset.info = el.info;
      li.dataset.price = el.price;
      li.innerHTML = '<img src="' + el.cover.small + '">';
      content.appendChild(li);
    })

  }
}
