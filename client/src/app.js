import routing from './routing'; // function onHashChange(app)

const app = document.querySelector('#app');
// Событие hashchange генерируется когда изменяется идентификатор фрагмента URL (т.е. часть URL следующая за символом #, включая сам символ #).
// Например: если изменить youtube.local/js/events/haschange/#dcode на youtube.local/js/events/haschange/#bottle и нажать enter
window.addEventListener('hashchange', () => routing(app));

routing(app);
