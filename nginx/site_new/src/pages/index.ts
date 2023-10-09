import '../styles/styles.css';
import '../styles/index.css'
import $ from 'jquery';
import '../scripts/common.js';
import getHeadElement from '../commonHtml/commonHead';
import {getCommonSection, getMenuDiv} from '../commonHtml/bodyBlocks';
import {getAllObjects} from '../service/restService';
import {FullPageSection} from "../model/FullPageSection";

// @ts-ignore
import {createFullPageSlider} from "../scripts/slider";
$('head').append(getHeadElement());
$('body').append(getMenuDiv());

getAllObjects().then(data => {

    function mappingDataToModel(json : any) : FullPageSection {
        let id: number = json.id;
        let name: string = json.name;
        let descr: string = json.description;
        const pathUploadImages = '../static_images/'
        let index_photo_path = pathUploadImages + json.index_photo_path;
        return new FullPageSection(id, index_photo_path, name, descr);
    }
    data.forEach((rawElement: string) => {
        $('#fullpage').append(getCommonSection(mappingDataToModel(rawElement), true));
    })
    createFullPageSlider()
})
// fullPageSectionsArray_MOCK.forEach((section) => {
//     $('#fullpage').append(getCommonSection(section, true));
// });



