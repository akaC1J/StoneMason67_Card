import '../styles/font.css';
import '../styles/about.css';
import '../styles/common.css';
import $ from 'jquery';
import getHeadElement from '../commonHtml/commonHead';
import { getMenuDiv } from '../commonHtml/bodyBlocks';
import {ABOUT_CONTENT} from '../mocks/mocks'
// @ts-ignore

const aboutText

$('head').append(getHeadElement());
$('body').append(getMenuDiv());
$('.middle').prepend(getAboutContent(ABOUT_CONTENT))

function getAboutContent(content: string): string {
    return content;
}


