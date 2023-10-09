import '../styles/font.css';
import '../styles/about.css';
import '../styles/common.css';
import $ from 'jquery';
import getHeadElement from '../commonHtml/commonHead';
import {getCommonSection, getMenuDiv} from '../commonHtml/bodyBlocks';
import {ABOUT_CONTENT} from '../mocks/mocks'
import {getContentInfo} from "../service/restService";
import "../scripts/clientRoute.js"
import {FullPageSection} from "../model/FullPageSection";
// @ts-ignore
ё
$('head').append(getHeadElement());
$('body').append(getMenuDiv());
getContentInfo('about').then((data: any) => {
    $('.middle').prepend(getAboutContent(data.block_data))
})
function getAboutContent(content: string): string {
    return content;
}


