const getPercentage = (value, max) => {
    return Math.round((value * 100) / max);
};

const getMonthName = (locale = 'default', index = 0) => {
    let date = new Date();
    date.setDate(1); // Fix for the 31st day for months that don't have it
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