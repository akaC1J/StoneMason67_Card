import '../styles/styles.css';
import  '../styles/projects.css'
import $ from 'jquery';
import '../scripts/common.js';
import getHeadElement from '../commonHtml/commonHead';
import { fullPageSectionsArray_MOCK_PROJECTS } from '../mocks/mocks';
import { getCommonSection, getMenuDiv } from '../commonHtml/bodyBlocks';
import '../scripts/slider.js';
// @ts-ignore
import {createFullPageSlider} from "../scripts/slider" ;
import "../scripts/clientRoute.js"
import {getAllObjects} from "../service/restService";
import {FullPageSection} from "../model/FullPageSection";


$('head').append(getHeadElement());
$('body').append(getMenuDiv());
getAllObjects().then(data => {

    function mappingDataToModel(json : any) : FullPageSection {
        let id: number = json.id;
        let name: string = json.name;
        let descr: string = json.description;
        const pathUploadImages = '../static_images/'
        let object_photo_path = pathUploadImages + json.object_photo_path;
        return new FullPageSection(id, object_photo_path, name, descr);
    }
    data.forEach((rawElement: string) => {
        $('#fullpage').append(getCommonSection(mappingDataToModel(rawElement), true));
    })
    createFullPageSlider()
})

