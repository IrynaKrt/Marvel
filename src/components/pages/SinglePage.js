import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {process, setProcess, getComics, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
            // eslint-disable-next-line
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                default:
                    throw new Error('Unexpected request');
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;