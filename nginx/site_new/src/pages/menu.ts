import page from "page";

import '../styles/font.css';
import '../styles/menu.css'
import $ from 'jquery'
import "../scripts/clientRoute.js"
import getHeadElement from '../commonHtml/commonHead'

function start(){
    $('head').append(getHeadElement());
}

page('/menu123',start)



