'use strict';

const request = new XMLHttpRequest();
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
request.addEventListener('load', onLoad);

request.addEventListener('loadstart', () => {
  preloader.classList.remove('hidden');
});

request.addEventListener('loadend', () => {
  preloader.classList.add('hidden');
});

request.open('GET', 'components/email-tab.html', true);
request.send();

const tabs = document.querySelectorAll('nav a');

for(const tab of tabs) {
  tab.addEventListener('click', onClick);
}

function onClick(event) {
  event.preventDefault();

  if (!event.currentTarget.classList.contains('active')) {

    for(const tab of tabs) {
      tab.classList.remove('active');
    }

    event.currentTarget.classList.add('active');
    request.open('GET', event.currentTarget.getAttribute('href'), true);
    request.send();
  }

}

function onLoad(event) {

  if (event.target.status === 200) {
    content.innerHTML = event.target.responseText;
  }

}