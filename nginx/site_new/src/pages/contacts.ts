import '../styles/common.css';
import '../styles/font.css';
import '../styles/contacts.css';
import vkIcon from '../assets/img/icons/vk.png';

import $ from 'jquery';
import getHeadElement from '../commonHtml/commonHead';
import { getMenuDiv } from '../commonHtml/bodyBlocks';
import {CONTACT_CONTENT} from '../mocks/mocks'
import "../scripts/clientRoute.js"
import '../scripts/contact.js';
import {getContentInfo} from "../service/restService";
// @ts-ignore

$('head').append(getHeadElement());
$('body').append(getMenuDiv());
getContentInfo('contacts').then((data: any) => {
    $(".contacts .main-text").prepend(getContactContent(data.block_data))
})
function getContactContent(content: string): string {
    return content;
}


