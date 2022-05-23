import React, { useState, useEffect } from 'react';
const axios = require('axios');

const fetchRandomData = (pageNumber) => {
  return axios.get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
    });
}

const getFullUserName = (userInfo) => {
  const { name: { first, last } } = userInfo;
  return `${first} ${last}`;
}

function App() {
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState([]);

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then(randomData => {
      const newUserInfos = [
        ...userInfos,
        ...randomData.results,
      ]
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1)
    });
  }

  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div>
      <p>Fetch and Append Name and Thumbnail On Click</p>
      <button onClick={() => { fetchNextUser(); }}>
        Fetch Next User
      </button>
      {
        userInfos.map((userInfo, idx) => (
          <div key={idx}>
            <p>{getFullUserName(userInfo)}</p>
            <img src={userInfo.picture.thumbnail}></img>
          </div>
        ))
      }
    </div>
  );
}

export default App;