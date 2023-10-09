import '../styles/font.css';
import '../styles/about.css';
import '../styles/common.css';
import $ from 'jquery';
import getHeadElement from '../commonHtml/commonHead';
import {getMenuDiv} from '../commonHtml/bodyBlocks';
import {getContentInfo} from "../service/restService";
import "../scripts/clientRoute.js"
// @ts-ignore
$('head').append(getHeadElement());
$('body').append(getMenuDiv());
getContentInfo('about').then((data: any) => {
    $('.middle').prepend(getAboutContent(data.block_data))
})
function getAboutContent(content: string): string {
    return content;
}


