import {FullPageSection} from "../model/FullPageSection";

export function getCommonSection(section: FullPageSection, isLinked: boolean = false) {
    const link = `<div class="paragraph-wrapper">
                <a href=template_object.html?id=${section.id}>
                    <p class="mainParagraph">${section.name}</p>
                    <p>Посмотреть подробнее</p>
                </a>
            </div>`;
    return `<div class="bg-image section" style="background-image: url(${section.bgimage})">
            <div class="arrow right-arrow"></div>
            <div class="arrow left-arrow"></div>
            ${isLinked ? link : ''}
        </div>`
}

export function getMenuDiv() {
    return `
    <div id="hamburger">
        <a id="titleMenu" href="menu.html">МЕНЮ</a>
    <a href="menu.html">
            <div></div>
            <div></div>
            <div></div>
        </a>
    </div>`;
}