export const localize = (key, req, module = null, disableTitleCase = false) => {
    if (module) {
        return req.i18n.t(key).replaceAll('{module}', disableTitleCase ? module : _toTitleCase(module));
    }
    return req.i18n.t(key);
};

export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};