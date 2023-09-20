// Создание массива объектов
import {FullPageSection} from "../model/FullPageSection";
import {SimpleSection} from "../model/SimpleSection";

const pathUploadImages = '../static_images/'

export const fullPageSectionsArray_MOCK: FullPageSection[] = [
    new FullPageSection(1, pathUploadImages + 'main_object/prochee_main.jpg',
        'Прочие работы', ''),
    new FullPageSection(2, pathUploadImages + 'main_object/oazis_main.jpg',
        'Домашний оазис', ''),
    new FullPageSection(3, pathUploadImages + 'main_object/priut_main.jpg',
        'Мокко Мансарда', ''),
    new FullPageSection(4, pathUploadImages + 'main_object/stolbi_main.jpg',
        'Столбы Вдохновения', ''),
    new FullPageSection(5, pathUploadImages + 'main_object/zamok_main.jpg',
        'Урбанистический замок', ''),
    new FullPageSection(6, pathUploadImages + 'main_object/krepost_main.jpg',
        'Эстетическая крепость', ''),
    new FullPageSection(7, pathUploadImages + 'main_object/pechi_main.jpg',
        'Тепло Домашнего Очага', ''),

];

export const fullPageSectionsArray_MOCK_PROJECTS: FullPageSection[] = [
    new FullPageSection(1, pathUploadImages + 'all_objects/prochee_main.jpg',
        'Прочие работы', ''),
    new FullPageSection(2, pathUploadImages + 'all_objects/oazis_main.jpg',
        'Домашний оазис', ''),
    new FullPageSection(3, pathUploadImages + 'all_objects/priut_main.jpg',
        'Мокко Мансарда', ''),
    new FullPageSection(4, pathUploadImages + 'all_objects/stolbi_main.jpg',
        'Столбы Вдохновения', ''),
    new FullPageSection(5, pathUploadImages + 'all_objects/zamok_main.jpg',
        'Урбанистический замок', ''),
    new FullPageSection(6, pathUploadImages + 'all_objects/krepost_main.jpg',
        'Эстетическая крепость', ''),
    new FullPageSection(7, pathUploadImages + 'all_objects/pechi_main.jpg',
        'Тепло Домашнего Очага', ''),

];

export const objectMap_MOCK: { [key: string]: SimpleSection } = {
    'prochee': new SimpleSection(1, ['main.jpg', 'sub1.jpg', 'sub2.jpg', 'sub3.jpg', 'sub4.jpg', 'sub5.jpg', 'sub6.jpg', 'sub7.jpg']),
    'oazis': new SimpleSection(2, ['main.jpg', 'sub1.jpg', 'sub2.jpg', 'sub3.jpg', 'sub4.jpg', 'sub5.jpg', 'sub6.jpg', 'sub7.jpg']),
    'priut': new SimpleSection(3, ['main.jpg', 'sub1.jpg', 'sub2.jpg', 'sub3.jpg', 'sub4.jpg', 'sub5.jpg', 'sub6.jpg', 'sub7.jpg', 'sub8.jpg']),
    'stolbi': new SimpleSection(4, ['main.jpg', 'sub1.jpg', 'sub2.jpg', 'sub3.jpg']),
    'zamok': new SimpleSection(5, ['main.jpg', 'sub1.jpg', 'sub2.jpg']),
    'krepost': new SimpleSection(6, ['main.jpg', 'sub1.jpg', 'sub2.jpg']),
    'pechi': new SimpleSection(7, ['main.jpg', 'sub1.jpg', 'sub2.jpg', 'sub3.jpg', 'sub4.jpg', 'sub5.jpg'])
}

export const ABOUT_CONTENT = `<p>
        "Вольные каменщики 67" — это строительная компания из Смоленска, которая с гордостью относится к своему 27-летнему опыту работы в строительстве. Наша специализация — строительство жилых домов с высококачественной облицовкой, где внимание к деталям является ключевым.
    </p>
    <p>
        Мы ценим как изысканный дизайн, так и высокое качество исполнения. Любим работать с облицовочным кирпичом и сотрудничать с клиентами для создания уникальных, персонализированных проектов. Облицовочный кирпич предоставляет нам свободу в самовыражении, стиле и скорости строительства, и именно поэтому мы выбираем эту строительную технику.
    </p>
    <p>
        Наши услуги включают:
    </p>
    <ul>
        <li>Точные инженерные расчёты (в нашем штате есть архитекторы и проектировщики)</li>
        <li>Помощь с закупкой и доставкой материалов</li>
        <li>Персональные скидки на строительные и отделочные материалы у наших партнеров, что значительно сокращает затраты</li>
        <li>Помощь в организации всего необходимого на строительную площадку, включая спецтехнику</li>
        <li>Бесплатное составление сметного расчёта по видам работ</li>
    </ul>
    <p>
        Если вы хотите узнать больше о "Вольные каменщики 67" или ознакомиться с некоторыми из наших недавних проектов,
        пожалуйста, свяжитесь с нашими основателями, Михаилом Фридманом и Ващило Андреем. Мы строим вашу мечту и разрушаем
        границы!"
    </p>`;

export const CONTACT_CONTENT = `'Если вы хотите рассмотреть возможность сотрудничества со строительной компанией "Вольные каменщики 67", свяжитесь с нами.<br><br>
            <b>+7(952)536-18-97</b> - Андрей<br>
            <b>+7(920)663-76-90</b> - Михаил<br>
            <b>stonemason67@bk.ru</b>'`;