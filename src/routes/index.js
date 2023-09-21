import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import TestTask from '../pages/test-task/TestTask'
const RouteWrapper = () => {       
    return (
        <Routes>
            <Route path="/" element={<TestTask />} />           
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes >
    )
};

export default RouteWrapper;
