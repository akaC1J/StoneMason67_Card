import '../styles/styles.css';
import '../styles/index.css'
import $ from 'jquery';
import '../scripts/common.js';
import getHeadElement from '../commonHtml/commonHead';
import {fullPageSectionsArray_MOCK} from '../mocks/mocks';
import {getCommonSection, getMenuDiv} from '../commonHtml/bodyBlocks';
import '../service/restService';
// @ts-ignore
import {createFullPageSlider} from "../scripts/slider";
import {FullPageSection} from "../model/FullPageSection";

$('head').append(getHeadElement());
$('body').append(getMenuDiv());

getAllObjects().then(data => {

    function mappingDataToModel(json : any) : FullPageSection {
        let id: number = json.id;
        let name: string = json.name;
        let descr: string = json.description;
        let index_photo_path = json.index_photo_path;
        return new FullPageSection(id, index_photo_path, name, descr);
    }
    data.forEach((rawElement: string) => {
        $('#fullpage').append(getCommonSection(mappingDataToModel(rawElement), true));
    })
})
fullPageSectionsArray_MOCK.forEach((section) => {
    $('#fullpage').append(getCommonSection(section, true));
});
createFullPageSlider()


