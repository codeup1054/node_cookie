const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


const Apify = require('apify');

Apify.main(async () => {

    // ПОДГОТОВКА

    // Извлечь параметры из принятого JSON
    // const input = await Apify.getInput();

    const input = { "email": "sdsp256@gmail.com" , "password": "652@163Ava" }


    if (!input || !input.email || !input.password) throw new Error('Invalid input, must be a JSON object with the "email" and "password" field!');

    // Запустить среду управления браузером
    const browser = await Apify.launchPuppeteer();

    // СТРАНИЦА 1 - Получаем базовую часть cookie

    // Открыть новую вкладку
    const page1 = await browser.newPage();


    await page1.setViewport({width: 1280, height: 1024});

    // Перейти на страницу авторизации
    await page1.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});

    // Найти на html-странице поля логин/пароль и заполнить их
    await page1.waitForSelector('form');


    await page1.type('input#email', input.email);
    await page1.type('input#password', input.password);


    // Немного подождать, чтобы выглядеть,
    // как настоящий человек, которому требуется время на ввод данных
    await page1.waitFor(200);

    // Найти кнопку Войти и кликнуть на нее
    await page1.evaluate(()=>document
        .querySelector('button#login-button')
        .click()
    );


    // Дождаться результатов и загрузить базовый cookie файл
    await page1.waitForNavigation();
    const sessionFourCookie = await page1.cookies();


    // СТРАНИЦА 2 - получаем дополненный cookie с ключами для просмотра карты

    // Открыть новую вкладку
    const page2 = await browser.newPage();

    // Перейти на страницу с просомотром карты, как залогиненный пользователь.
    // То есть, указав при этом полученные в предыдущем шаге cookie
    await page2.setCookie(...sessionFourCookie);

    await page2.goto('https://heatmap-external-a.strava.com/auth');

    // Получить новый дополненный файл cookie
    const cloudfontCookie = await page2.cookies();

    let val = {};
    val[cloudfontCookie[0].name] = cloudfontCookie[0].value;
    val[cloudfontCookie[1].name] = cloudfontCookie[1].value;
    val[cloudfontCookie[2].name] = cloudfontCookie[2].value;


//    await Apify.setValue('OUTPUT', { foo: 'bar' });
//    const store = await Apify.openKeyValueStore();
//    await store.setValue('OUTPUT', { foo: 'bar' });
    await Apify.setValue('OUTPUT', val);

    // Open a named key-value store
    const store = await Apify.openKeyValueStore('some-name');

    // Write record. JavaScript object is automatically converted to JSON,
    // strings and binary buffers are stored as they are
    await store.setValue('some-key', { foo: 'bar' });

    // Read record. Note that JSON is automatically parsed to a JavaScript object,
    // text data returned as a string and other data is returned as binary buffer
    const value = await store.getValue('some-key');


    /*    {   cloudfontCookie[0].name:cloudfontCookie[0].value,
                        cloudfontCookie[1].name:cloudfontCookie[1].value,
                        cloudfontCookie[2].name:cloudfontCookie[2].value };
    */

    console.log(' val :' + val + '\n', cloudfontCookie);

    await Apify.pushData(val);

//    const val = await store.getValue('foo');
//    console.log(cloudfontCookie);
//    console.log(sessionFourCookie);
    // ЗАВЕРШЕНИЕ

    // Закрыть среду исполнения
    await browser.close();

    // Вернуть дополненный файл cookie в теле ответа
    return cloudfontCookie;
});