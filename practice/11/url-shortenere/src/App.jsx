import React, { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import { BASE_URL } from "./config";

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [allUrls, setAllUrls] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/`);
        const urls = response.data.data; // Extract the data field
        // console.log('Response data:', urls);
        // console.log('Is array:', Array.isArray(urls));
        setAllUrls(urls);
      } catch (error) {
        console.log("Error fetching URLs", error);
      }
    };

    fetchData();
  }, []);





  const handleURLChange = (e) => {
    setUrl(e.target.value);
  }

  const generateShortURL = async () => {
    if (url) {
      try {
        const response = await axios.post(`${BASE_URL}/shorten`, { url });
        console.log(response.data.data);
        setShortUrl(response.data.data.shortId);
        setUrl('');
      } catch (error) {
        console.log("Error generating short URL", error);
        setUrl('');
      }
    } else {
      console.log("URL is empty");
    }
  }

  return (
    <div className="main">
      <div className='boxx'>
        <h1>URL Shortener</h1>
        <p>Enter any URL:</p>

        <Box
          sx={{
            width: 1000,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="URL"
            id="url-input"
            onChange={handleURLChange}
            sx={{
              '& .MuiInputBase-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'white',
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
          />
        </Box>
        <div className="button">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              onClick={generateShortURL}
            >
              Generate Short URL
            </Button>
          </Stack>
        </div>

        {shortUrl && (
          <div className="short-url">
            <p>Short URL: <a href={`${BASE_URL}/${shortUrl}`}
            >{shortUrl}</a></p>
          </div>
        )}

        <div className="allurls">
          <table>
            <thead>
              <tr>
                <th>Example URL</th>
                <th>Short URL</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(allUrls) ? (
                allUrls.map((urlItem, index) => (
                  <tr key={index}>
                    <td>  <a href={urlItem.redirectUrl}>{urlItem.redirectUrl}</a></td>
                    <td>
                      <a href={`${BASE_URL}/${urlItem.shortId}`}>
                       {urlItem.shortId}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No URLs found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="custom-shape-divider-top-1720003003">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App;
