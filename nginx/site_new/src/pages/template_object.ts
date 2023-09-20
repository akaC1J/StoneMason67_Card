import $ from 'jquery'
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

$('head').append(getHeadElement());
document.addEventListener("DOMContentLoaded", function() {
    $('body').append(getMenuDiv());
    const urlParams = new URLSearchParams(window.location.search);
    const objectName: string = urlParams.get('name') as string;
    // Вызывайте функцию для загрузки данных
    loadObjectData(objectName);
    createFullPageSlider();
});

function loadObjectData(linkPage: string) {
    // Здесь используйте AJAX для загрузки данных о объекте по имени (или другому параметру)
    // И заполните содержимое div с id "content"
    let simpleSection: SimpleSection = objectMap_MOCK[linkPage];
    const pathUploadImages = '../static_images/objects/';
    simpleSection.arrImg.forEach((img) => {
        let fullPathImage =  `${pathUploadImages}/${img}`
        $('#fullpage').append(getCommonSection(new FullPageSection(simpleSection.object_id,fullPathImage), false));
    });
}





