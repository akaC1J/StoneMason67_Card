import $ from 'jquery';

 export default function addHeadElement() {
     const headElement =
         `<meta name="description" content="Вольные каменщики 67 - предоставляем услуги высокого качества в области
         строительства и дизайна. Посмотрите наши последние проекты на нашем сайте.">
    
        <!-- Open Graph Meta-Tags -->
        <meta property="og:title" content="Вольные каменщики 67 - Профессиональное Строительство и Дизайн" />
        <meta property="og:description" content="Вольные каменщики 67 - предоставляем услуги высокого качества в области строительства и дизайна. Посмотрите наши последние проекты на нашем сайте." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stonemason67.ru/" />
        <meta property="og:image" content="https://stonemason67.ru/img/new_logo/scalar/short_logo.png" />
    
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
            ym(94422084, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/94422084" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->
        <link rel="canonical" href="https://stonemason67.ru/" />`;
     $('head').append(headElement);
}
