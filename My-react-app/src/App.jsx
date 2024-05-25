import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/jobs', {
        params: { searchTerm }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className='centerit'>
     
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 style={{textAlign:'center'}}>Job Search</h1>
      <div className="mode-toggle">
        <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
      <div className='bundleit'>
      <input
        style={{  borderRadius: '10px'}}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      <div className="job-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <h3 style={{backgroundColor:'red',borderRadius:'10px'}}><marquee>{job.company.display_name}</marquee></h3>
            <p>Location: {job.location.display_name}</p>
            <p>Salary: {job.salary_min}</p>
            <button onClick={() => handleRedirect(job.redirect_url)}>View Job</button>
          </div>
        ))}
      </div>
      </div>
      <p style={{textAlign:'center'}}>All copyrights reserved 2024 @shaik fazil basha</p>
        <h1 style={{textAlign:'center'}}>Follow for more <a href='https://github.com/FaZil-shaik'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg></a></h1>
    </div>
  );
}

export default App;
