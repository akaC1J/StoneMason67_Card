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
VALUES (1, 'Домашний оазис', null, 'main_object/oazis_main.jpg', 'all_objects/oazis_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (2, 'Мокко Мансарда', null, 'main_object/priut_main.jpg', 'all_objects/priut_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (3, 'Тепло Домашнего Очага', null, 'main_object/pechi_main.jpg', 'all_objects/pechi_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (4, 'Эстетическая крепость', null, 'main_object/krepost_main.jpg',
        '/all_objects/krepost_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (5, 'Урбанистический замок', null, 'main_object/zamok_main.jpg', 'all_objects/zamok_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (6, 'Столбы Вдохновения', null, 'main_object/stolbi_main.jpg', 'all_objects/stolbi_main.jpg');

INSERT INTO public.construction_objects (id, name, description, index_photo_path, object_photo_path)
VALUES (7, 'Прочие работы', null, 'main_object/prochee_main.jpg', 'all_objects/prochee_main.jpg');

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/krepost/main.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/krepost/sub1.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/krepost/sub2.jpg', 4, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/main.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub1.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub2.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub3.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub4.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub5.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub6.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/oazis/sub7.jpg', 1, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/main.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/sub1.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/sub2.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/sub3.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/sub4.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/pechi/sub5.jpg', 3, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/main.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub1.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub2.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub3.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub4.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub5.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub6.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub7.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/priut/sub8.jpg', 2, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/main.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub1.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub2.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub3.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub4.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub5.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub6.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/prochee/sub7.jpg', 7, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/zamok/main.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/zamok/sub1.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/zamok/sub2.jpg', 5, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/stolbi/main.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/stolbi/sub1.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/stolbi/sub2.jpg', 6, true);

INSERT INTO public.photos (id, path, object_id, visible)
VALUES (DEFAULT, 'objects/stolbi/sub3.jpg', 6, true);

