import React from "react";
import { Link } from "react-router-dom";

import nicLogo from "../../public/images/nic_logo_eodbswo.png";
import swasLogo from "../../public/images/swas_icon.png";
import FooterBottom from "./FooterBottom";

const Footer = () => {
    return (
        <>
            <footer className="home-footer footer">
                <div className="container-lg wow fadeIn">
                    <div className="row">
                        <div className="col-md-10">
                            <p>
                                {" "}
                                All efforts have been made to make the
                                information as accurate as possible. Contents of
                                the this site are owned and maintained by
                                Department of Industry & Commerce, Govt of West
                                Bengal as well as WBIDC(West Bengal Industrial
                                Development Corporation ). National Informatics
                                Centre (NIC), will not be responsible for any
                                loss to any person caused by inaccuracy in the
                                information available on this Website. Any
                                discrepancy found may be brought to the notice
                                of Department of Industry & Commerce, Govt of
                                West Bengal as well as WBIDC(West Bengal
                                Industrial Development Corporation). This site
                                is best viewed in Firefox, Chrome.{" "}
                            </p>
                        </div>
                        <div className="col-md-2">
                            <Link href="http://www.nic.in/" target="_blank">
                                <img
                                    src={nicLogo}
                                    alt="Design By NIC"
                                    loading="lazy"
                                />
                            </Link>
                            <Link href="#" className="swas-icon">
                                <img
                                    src={swasLogo}
                                    alt="SWAS-Service With A Smile"
                                    loading="lazy"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <FooterBottom />
            </footer>
            <div className="query-side-btn">
                <Link href="#">Query / Grievance</Link>
            </div>
        </>
    );
};

export default Footer;
