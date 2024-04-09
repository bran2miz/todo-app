import React, { useContext, useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { GlobalContext } from '../../../App';
import { Typography, Card } from '@mui/material';

const Settings = () => {
    const { userSettings, displayCount, hideCompleted, sortWord, setUserSettings } = useContext(GlobalContext);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const retrieveUserSettings = localStorage.getItem('userSettings');
        
        if (retrieveUserSettings) {
            const parsedTheSettings = JSON.parse(retrieveUserSettings);
            setUserSettings(parsedTheSettings);
        }
    }, [setUserSettings]);
    // saves settings to local storage when ever the dependencies of displaycount hideCompleted or sortWord change.
    useEffect(() => {
        const userSettings = { displayCount, hideCompleted, sortWord };
        localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }, [displayCount, hideCompleted, sortWord]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type, checked } = e.target;
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h4' gutterBottom style={{ display: "flex", background: "#263238", color: "#eceff1", margin: 30, padding: 20, alignItems: "center", maxWidth: '600px', width: "100%" }}>
                    <SettingsIcon />Manage Settings
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
                    <Card style={{ maxWidth: '280px', marginRight: '10px', padding:20 }}>
                        <Typography variant='h4' gutterBottom>Update Settings</Typography>
                        <p>
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
                        </p>
                        <p>
                            <label>
                                <span>Items Per Page</span>
                                <input 
                                    type="number"
                                    name="displayCount"
                                    value={displayCount}
                                    onChange={handleChange}
                                />
                            </label>
                        </p>
                        <p>
                            <label>
                                <span>Sort Keyword</span>
                                <input 
                                    type="text"
                                    name="sortWord"
                                    value={sortWord || ''}
                                    onChange={handleChange}
                                />
                            </label>
                        </p>
                        <p>
                            <label>
                                <button type="submit">Update Settings</button>
                            </label>
                        </p>
                    </Card>
                    {formData && (
                        <Card style={{ 
                            maxWidth: '280px', 
                            marginLeft: '10px',
                            marginTop: '-10px',
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding:30 
                        }}>
                            <Typography variant='p' gutterBottom>Show Completed ToDos: {formData.hideCompleted.toString()}</Typography>
                            <Typography variant='p' gutterBottom>Items Per Page: {formData.displayCount}</Typography>
                            <Typography variant='p' gutterBottom>Sort Keyword: {formData.sortWord}</Typography>
                        </Card>
                    )}
                </div>
            </div>
        </form>
    )
}

export default Settings;
