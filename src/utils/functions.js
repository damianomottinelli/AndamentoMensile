const getPercentage = (value, max = 1) => {
    return Math.round((value * 100) / max);
};

const getMonthName = (index = 0, locale = 'default') => {
    let date = new Date();
    date.setDate(1); // Fix per mesi senza 31 giorni
    date.setMonth(index);
    return date.toLocaleString(locale, { month: 'long' });
};

const getJsonData = (url = 'http://localhost:80', onSuccess = () => {}, onError = () => {}) => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => onError(error));
};

export {getPercentage, getMonthName, getJsonData};