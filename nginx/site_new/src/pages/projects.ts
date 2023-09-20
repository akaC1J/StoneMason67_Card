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

$('head').append(getHeadElement());
$('body').append(getMenuDiv());
fullPageSectionsArray_MOCK_PROJECTS.forEach((section) => {
    $('#fullpage').append(getCommonSection(section, true));
});
createFullPageSlider()

