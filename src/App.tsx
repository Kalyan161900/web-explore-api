// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreens/HomeScreen';
import ApiDetailsScreen from './Screens/ApiDetailsScreens/ApiDetailsScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<HomeScreen />} />
        <Route path="/api-details/:provider" element={<ApiDetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
