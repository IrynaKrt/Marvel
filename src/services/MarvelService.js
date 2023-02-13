class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; //такой синтаксис говорит, что эти значения менять нельзя!
    _apiKey = 'apikey=e5a7c35d5e11dc243a894f2e791957c1'
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => { //вызов функции с определенным адрессом - получение всех персонажей для карточек
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => { //получение только одного персонажа с уникальным id
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); //АСИНХРОННАЯ
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, //превьюшка
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;
