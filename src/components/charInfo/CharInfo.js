import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';


import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar()
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        onCharLoading();
        marvelService.getCharacter(charId)
                     .then(onCharLoaded)
                     .catch(onError);
    }

    const onCharLoaded = () => {
        setChar(char  => char = true);
        setLoading(loading => false);
    }

    const onCharLoading = () => {
        setLoading(loading => true);
    }

    const onError = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const skeleton =  char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char = {char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let  comicsItems = comics.map((item, i) => {
            return (
                <li key={i} className="char__comics-item">
                    {item.name}
                </li>
            )
        })
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail.includes('image_not_available')) {
        imgStyle = {'objectFit' : 'unset'};
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description : 'There\' no description for this char'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'The Avengers haven\'t seen this character yet'}
                {comicsItems}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;