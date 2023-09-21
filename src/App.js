import React from 'react'
import RouteWrapper from './routes'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import { store } from './store'
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
