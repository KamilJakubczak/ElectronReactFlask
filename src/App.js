import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header';
import Test from "./components/test/test";
import {Fragment} from "react";

function App() {
    return (
        <Fragment>
            <Header/>
            <Test/>
        </Fragment>
    );
}

export default App;
