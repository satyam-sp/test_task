import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './helpers';
import ReduxToastr from 'react-redux-toastr'

ReactDOM.render(
  <React.StrictMode>
  	<Provider store={store}>
  		<ReduxToastr
	      timeOut={4000}
	      newestOnTop={false}
	      preventDuplicates
	      position="top-right"
	      transitionIn="bounceIn"
	      transitionOut="bounceOut"
	      progressBar
	      closeOnToastrClick/>
       <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


