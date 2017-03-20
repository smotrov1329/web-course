//Функция добавления трека в очередь воспроизведения: 
function addtoPL(name, path) {
    localStorage[name] = path;
    window.parent.location.href = window.parent.location.href;
}
//Функция загрузки внешнего содержимого: 
function loadAlbum(path) {
    var iframe = document.getElementById('target');
    iframe.setAttribute('src', path);
    sessionStorage["album"] = path;
}
//Функция предварительного прослушивания: 
function testListen(path) {
    var audio = document.createElement('audio'); /*создаем новый audio element*/
    var div = document.getElementById('tracks'); /*получаем доступ к контейнеру с треками*/
    audio.src = path; /*задаем источник для воспроизведения*/
    audio.controls = false; /*отключаем элементы управления аудио, фактически элемент не будет отображаться*/
    div.appendChild(audio); /*добавляем созданный audio элемент контейнеру*/
    audio.addEventListener('timeupdate', function()
        /*обработчик событий, вызываемый в течении всего воспроизведения аудио, каждые 250 мс*/
        {
            if (audio.currentTime > 10) { audio.pause(); } /*прерываем воспроизведение после 10 секунд прослушивания*/
        }, false);
    audio.play(); /*начало воспроизведения аудио*/
}
//Функция воспроизведения трека из пользовательского списка: 
function playtrack(track) {
    var b = false;
    for (var i in localStorage) {
        /*в данном цикле мы находм текущий трек и "запоминаем" следующий*/
        if (b) {
            localStorage['next'] = localStorage[i];
            break;
        }
        if (i == track) { b = true; }
    }
    var audio = document.getElementById('audio1'); /*получаем доступ к элементу audio*/
    audio.src = localStorage[track]; /*задаем источник воспроизведения*/
    audio.controls = true;
    audio.play(); /*начинаем воспроизведение*/
}
//Функция загрузки списка воспроизведения: 
function load() {
    if (sessionStorage["album"] != undefined)
    /*если документ открывается впервые, либо после долгого перерыва, то sessionStorage не будет содержать информацию о последнем открытом альбоме*/
    {
        loadAlbum(sessionStorage["album"]);
        /*открываем последний альбом, к которому обратился пользователь, таким образом после принудительного обновления главной страницы в функции adtoPL пользователю не придется делать это самостоятельно*/
    }
    var audio = document.getElementById('audio1');
    /*получаем доступ к audio элементу*/
    audio.addEventListener('ended', function()
        /*добавляем обработчик события - окончания текущего воспроизвдения*/
        {
            playtrack('next'); /*инициируем воспроизведение следующего трека из пользовательского списка*/
        }, false); /*переходим к загрузке пользовательского списка воспроизведения*/
    var list = document.getElementById('playlist');
    /*получаем доступ к списку воспроизведения*/
    for (var i in localStorage)
    /*добавляем треки, сохраненные пользователем*/
    {
        var element = document.createElement('li');
        element.setAttribute('class', 'PL');
        element.setAttribute('onclick', "playtrack('" + i + "')");
        element.innerText = i;
        if (i != 'next') { list.appendChild(element); }
    }
}