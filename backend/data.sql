INSERT INTO public.content_info (page_id, block_data)
VALUES ('about', '<p class="main-text">
    "Вольные каменщики 67" — это строительная компания из Смоленска, которая с гордостью относится к своему 27-летнему опыту работы в строительстве. Наша специализация — строительство жилых домов с высококачественной облицовкой, где внимание к деталям является ключевым.
    </p>
    <p class="main-text">
    Мы ценим как изысканный дизайн, так и высокое качество исполнения. Любим работать с облицовочным кирпичом и сотрудничать с клиентами для создания уникальных, персонализированных проектов. Облицовочный кирпич предоставляет нам свободу в самовыражении, стиле и скорости строительства, и именно поэтому мы выбираем эту строительную технику.
    </p>
    <p class="main-text">
    Наши услуги включают:
    </p>
    <ul>
        <li>Точные инженерные расчёты (в нашем штате есть архитекторы и проектировщики)</li>
        <li>Помощь с закупкой и доставкой материалов</li>
        <li>Персональные скидки на строительные и отделочные материалы у наших партнеров, что значительно сокращает затраты</li>
        <li>Помощь в организации всего необходимого на строительную площадку, включая спецтехнику</li>
        <li>Бесплатное составление сметного расчёта по видам работ</li>
    </ul>
    <p class="main-text">
    Если вы хотите узнать больше о "Вольные каменщики 67" или ознакомиться с некоторыми из наших недавних проектов,
    пожалуйста, свяжитесь с нашими основателями, Михаилом Фридманом и Ващило Андреем. Мы строим вашу мечту и разрушаем
        границы!"`
    </p>');

INSERT INTO public.content_info (page_id, block_data)
VALUES ('contacts', 'Если вы хотите рассмотреть возможность сотрудничества со строительной компанией "Вольные каменщики 67", свяжитесь с нами.<br><br>

            <b>+7(952)536-18-97</b> - Андрей<br>
            <b>+7(920)663-76-90</b> - Михаил<br>
            <b>stonemason67@bk.ru</b>');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (1, 'Домашний оазис', null, 'oazis_main.jpg', 'oazis_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (2, 'Мокко Мансарда', null, 'priut_main.jpg', 'priut_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (3, 'Тепло Домашнего Очага', null, 'pechi_main.jpg', 'pechi_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (4, 'Эстетическая крепость', null, 'krepost_main.jpg', 'krepost_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (5, 'Урбанистический замок', null, 'zamok_main.jpg', 'zamok_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (6, 'Столбы Вдохновения', null, 'stolbi_main.jpg', 'stolbi_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (7, 'Лед и уголь', null, 'ledAndUgol_main.jpg', 'ledAndUgol_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (8, 'Солнечный очаг', null, 'sun_ochag.jpg', 'sun_ochag.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (9, 'Вечерний закат', null, 'vecherniyZakat_main.jpg', 'vecherniyZakat_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (10, 'Загородный мир', null, 'zagoridnyiMir_main.jpg', 'zagoridnyiMir_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (11, 'Прочие работы', null, 'prochee_main.jpg', 'prochee_main.jpg');

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'krepost/main.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'krepost/sub1.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'krepost/sub2.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/main.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub1.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub2.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub3.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub4.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub5.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub6.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'oazis/sub7.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/main.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/sub1.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/sub2.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/sub3.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/sub4.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'pechi/sub5.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/main.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub1.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub2.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub3.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub4.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub5.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub6.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub7.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'priut/sub8.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/main.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub1.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub2.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub3.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub4.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub5.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub6.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub7.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub8.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub9.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'prochee/sub10.jpg', 11, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zamok/main.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zamok/sub1.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zamok/sub2.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'stolbi/main.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'stolbi/sub1.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'stolbi/sub2.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'stolbi/sub3.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zagordniyMir/main.jpg', 10, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zagordniyMir/sub1.jpg', 10, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zagordniyMir/sub2.jpg', 10, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'zagordniyMir/sub3.jpg', 10, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'vecherniyZakat/main.jpg', 9, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'vecherniyZakat/sub1.jpg', 9, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'vecherniyZakat/sub2.jpg', 9, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/main.jpg', 8, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/sub1.jpg', 8, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/sub2.jpg', 8, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/sub3.jpg', 8, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/sub4.jpg', 8, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'sunOchag/sub5.jpg', 8, true);

