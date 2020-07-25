const API_HOST = 'http://localhost:5000';

const sendRequest = (resourceName, userOptions = {}, id) => {
    const defaultOptions = {
        mode: 'cors',
    };

    const defaultHeaders = {
        "Content-Type": 'application/json',
    };

    const options = {
        ...defaultOptions,
        ...userOptions,
        headers: {
        ...defaultHeaders,
        ...userOptions.headers,
        }
    };

    let url = `${API_HOST}/${resourceName}`;

    if (id) {
        url = `${url}/${id}`;
    }

    console.log(options)
    console.log(url)

    return fetch(url, options).then(responseObject => {
        console.log(responseObject)
        if (responseObject.status > 400) {
            console.log('ERROR')
            return responseObject.json()
        } else if (responseObject.status == 200) {
            return responseObject.json()
        }
    });
}

const Countries = () => {
    return sendRequest('countries', {method:'GET'})
}

const CountriesByCode = (code) => {
    return sendRequest('country/' + code, {method:'GET'})
}

export default { CountriesWhereCoronavirusHasSpread, ReportsByCountries, Countries, CountriesByCode } ;