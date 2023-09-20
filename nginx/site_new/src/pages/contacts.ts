import '../styles/common.css';
import '../styles/font.css';
import '../styles/contacts.css';
import vkIcon from '../assets/img/icons/vk.png';

import $ from 'jquery';
import getHeadElement from '../commonHtml/commonHead';
import { getMenuDiv } from '../commonHtml/bodyBlocks';
import {CONTACT_CONTENT} from '../mocks/mocks'
import '../scripts/contact.js';
// @ts-ignore

const aboutText

$('head').append(getHeadElement());
$('body').append(getMenuDiv());
$(".contacts .main-text").prepend(getContactContent(CONTACT_CONTENT))

function getContactContent(content: string): string {
    return content;
}


