export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const renderer = (content) => {
        let html = "";

        content.forEach((element) => {
            //if content is text
            if (element.type === "paragraph") {
                html += `<p class="mb-3 text-sm last:mb-0 tablet:text-base">${renderText(element)}</p>`;
            }
            if (element.type === "heading") {
                html += `<h${element.level} `;
                if (element.level === 1) {
                    html += `class="text-2xl font-bold mb-2 tablet:text-3xl">`;
                } else {
                    html += `class="text-xl font-bold mb-2 tablet:text-2xl">`;
                }
                html += `${renderText(element)}</h${element.level}>`;
            }
            if (element.type === "quote") {
                html += `<blockquote><p>${renderText(element)}</p></blockquote>`;
            }
            if (element.type === "list") {
                if (element.format === "ordered") {
                    html += `<ol>`;
                }
                if (element.format === "unordered") {
                    html += `<ul class="mb-4">`;
                }
                element.children.forEach((child) => {
                    html += `<li>${renderText(child)}</li>`;
                });
                if (element.format === "ordered") {
                    html += `</ol>`;
                }
                if (element.format === "unordered") {
                    html += `</ul>`;
                }
            }
            if (element.type === "image") {
                html += `<img src="${getMiniatureBaseUrl() + element.image.formats.large.url}" alt="${
                    element.image.alternativeText
                }">`;
            }
        });
        return html;
    };
    const renderText = (element) => {
        let text = "";
        element.children.forEach((child) => {
            if (child.type === "text") {
                if (child.bold) {
                    text += "<strong>";
                }
                if (child.italic) {
                    text += "<span style='font-style: italic'>";
                }
                if (child.underline) {
                    text += "<span style='text-decoration: underline;'>";
                }
                if (child.strikethrough) {
                    text += "<span style='text-decoration: line-through;'>";
                }
                if (child.code) {
                    text += "<pre>";
                }
                text += child.text;
                if (child.code) {
                    text += "</pre>";
                }
                if (child.strikethrough) {
                    text += "</span>";
                }
                if (child.underline) {
                    text += "</span>";
                }
                if (child.italic) {
                    text += "</span>";
                }
                if (child.bold) {
                    text += "</strong>";
                }
            }
            if (child.type === "link") {
                text += `<a href="${child.url}" class="underline">`;
                child.children.forEach((grandchild) => {
                    if (grandchild.type === "text") {
                        text += grandchild.text;
                    }
                });
                text += `</a>`;
            }
        });
        return text;
    };
    const getMiniatureBaseUrl = () => {
        const strapiUrl = config.public.STRAPI_URL;
        return `${strapiUrl}`;
    };
    return {
        provide: {
            rcTranslator: renderer,
        },
    };
});
