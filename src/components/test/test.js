import {Fragment, useEffect, useState} from "react";
import {Button} from "react-bootstrap";

const axios = require('axios');


const Test = () => {
    const [sample, setSample] = useState([]);

    // useEffect(() => {
    // }, [])
    const getData = () => {

        const config = {
            headers:
                {'Access-Control-Allow-Origin': '*'}
        };

        axios.get('http://localhost:5000/', config)
            .then(function (response) {
                console.log(response)
                setSample(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    return (
        <Fragment>
            <Button onClick={getData}>Dane z server</Button>
        {sample?.data && sample.data.map((r) => {
            return <div>{r}</div>
        })
    }
        </Fragment>
    )
}
export default Test;