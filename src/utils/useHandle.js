import {useState} from 'react'

export const useHandle = (callback) => {
    const [error, setError] = useState('');

    const handling = async () => {
        try {
            await callback();
            setError('');
        } catch (e) {
            setError(e.message);
        }
    }

    return [handling, error];
}