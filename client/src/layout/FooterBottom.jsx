import React from "react";
import { Link } from "react-router-dom";

const FooterBottom = () => {
    return (
        <>
            <div className="footer-bottom">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="copyright">
                                Copyright &copy; All Rights Reserved
                            </p>
                        </div>
                        <div className="col-md-6 text-right">
                            <p>
                                <Link to="#">Site Map</Link> &nbsp;|&nbsp;{" "}
                                <Link to="#">Privacy Policy</Link> &nbsp;|&nbsp;{" "}
                                <Link to="#">Disclaimer</Link> &nbsp;|&nbsp;{" "}
                                <Link to="#">Related Links</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterBottom;
