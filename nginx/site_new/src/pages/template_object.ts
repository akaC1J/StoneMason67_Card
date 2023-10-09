import $, {data} from 'jquery'
import '../styles/styles.css';
import '../scripts/common.js'
import getHeadElement from "../commonHtml/commonHead";
import {objectMap_MOCK} from "../mocks/mocks";
import {getCommonSection, getMenuDiv} from "../commonHtml/bodyBlocks";
import {FullPageSection} from "../model/FullPageSection";
import {SimpleSection} from "../model/SimpleSection";
import '../scripts/slider.js'
// @ts-ignore
import {createFullPageSlider} from "../scripts/slider";
import "../scripts/clientRoute.js"
import {getObjectInfo} from "../service/restService";


$('head').append(getHeadElement());
document.addEventListener("DOMContentLoaded", function() {
    $('body').append(getMenuDiv());
    const urlParams = new URLSearchParams(window.location.search);
    const object_id: number = parseInt(urlParams.get('id') as string);
    // Вызывайте функцию для загрузки данных
    loadObjectData(object_id);
});

function loadObjectData(objectId: number) {
    // Здесь используйте AJAX для загрузки данных о объекте по имени (или другому параметру)
    // И заполните содержимое div с id "content"
    let response: any = getObjectInfo(objectId)
    response.then(data => {
        const pathUploadImages = '../static_images/';
        data.forEach((section) => {
            $('#fullpage').append(getCommonSection(new FullPageSection(null,pathUploadImages+ section.path,null,null), false));
        });
        createFullPageSlider();
    })
}





