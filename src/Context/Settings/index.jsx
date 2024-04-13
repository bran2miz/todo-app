import React, { useContext, useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { GlobalContext } from '../../App';
import { Typography, Card, Button } from '@mui/material';
import Auth from '../../Components/Auth';

const Settings = () => {
    const { userSettings, displayCount, hideCompleted, sortWord, setUserSettings } = useContext(GlobalContext);
    const [formData, setFormData] = useState(null);
    // when I set user settings, I will retreive the localStorage and parse the data and set the userSettings to the parsed data. 
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

    // all variables are reference to the targets in the form submission. If the input type is 'checkbox' mark it as e.target.checked. Otherwise keep it as the e.target.value.
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type, checked } = e.target;
        const typeOfValue = type === 'checkbox' ? checked : value;
        // use spread to set the userSettings with the e.target.name to the type of value
        // ie Items Per Page. name = displayCount so in userSettings, displayCount will now have a value of a number(displayCount: number). 
        setUserSettings({...userSettings, [name]: typeOfValue});
        // Used on every input when onChange happens. 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        const sortWordValue = userSettings.sortWord || '';
        setFormData({displayCount, hideCompleted, sortWord: sortWordValue});
        setUserSettings({displayCount, hideCompleted, sortWord: sortWordValue});
        console.log("userSettings", userSettings);
    };

    return (
        <Auth capability={"update"}>
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
                                    placeholder='difficulty'
                                />
                            </label>
                        </p>
                        <p>
                            <label>
                                <Button type="submit" variant="contained" color="secondary" style={{ margin: 10, padding: '10px 20px' }}>Show New Settings</Button>
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
        </Auth>
    )
}

export default Settings;