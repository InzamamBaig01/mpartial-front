import React from "react";
import pkg from '../../../package.json';
import { withRouter } from "react-router-dom";

const BuildDetails = () => {
    return (
        <>
        <h1>{pkg.version}</h1>
        </>
    )
}

export default withRouter(BuildDetails);
