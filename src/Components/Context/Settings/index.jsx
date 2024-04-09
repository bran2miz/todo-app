import React, { useContext, useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { GlobalContext } from '../../../App';
import { Typography } from '@mui/material';


const Settings = () => {

    const {userSettings,displayCount, hideCompleted, sortWord, setUserSettings} = useContext(GlobalContext);

    const [formData, setFormData] = useState(null);

    useEffect(()=> {
        const retrieveUserSettings = localStorage.getItem('userSettings');
        
        if (retrieveUserSettings) {
            const parsedTheSettings = JSON.parse(retrieveUserSettings);
            setUserSettings(parsedTheSettings);
        }
    }, [setUserSettings]);

    // saves settings to local storage when ever the dependencies of displaycount hideCompleted or sortWord change.
    useEffect(()=> {
        const userSettings = {displayCount, hideCompleted, sortWord};

        localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }, [displayCount, hideCompleted, sortWord]);

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value, type, checked} = e.target;
        const typeOfValue = type === 'checkbox' ? checked : value;

        setUserSettings({...userSettings, [name]: typeOfValue});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({...userSettings, sortWord: e.target.value});
        setUserSettings({...userSettings, sortWord: e.target.value});
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h2' gutterBottom><SettingsIcon/>Manage Settings</Typography>

            <Typography variant='h3' gutterBottom>Update Settings</Typography>
            <label>
                <input 
                type="checkbox"
                name="hideCompleted"
                className="slider"
                checked={hideCompleted}
                onChange={handleChange}
                />
                <span className='slider round'></span>
                <span>Show Completed ToDos</span>
            </label>

            <label>
                <span>Items Per Page</span>
                <input 
                type="number"
                name="displayCount"
                value={displayCount}
                onChange={handleChange}
                />
            </label>

            <label>
                <span>Sort Keyword</span>
                <input 
                type="text"
                name="sortWord"
                value={sortWord || ''}
                onChange={handleChange}
                />
            </label>

            <label>
                <button type="submit">Updated Settings</button>
            </label>

            { formData && (
                <>
                <Typography variant='p' gutterBottom>Show Completed ToDos: {formData.hideCompleted.toString()}</Typography>
                <Typography variant='p' gutterBottom>Items Per Page: {formData.displayCount} 
                </Typography>
                <Typography variant='p' gutterBottom>Sort Keyword: {formData.sortWord}
                </Typography>

                </>
            )
            }

        </form>
    )
}

export default Settings;