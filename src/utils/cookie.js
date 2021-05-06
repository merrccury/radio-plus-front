// возвращает cookie с именем name, если есть, если нет, то undefined
export function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
export function setCookie(name, value, options) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date)
        options.expires = options.expires.toUTCString();

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    console.log(updatedCookie);
    document.cookie = updatedCookie;
}

// удаляет cookie с именем name
export function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}
//---------------------------------------------



