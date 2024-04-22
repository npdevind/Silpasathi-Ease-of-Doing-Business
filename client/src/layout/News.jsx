import React from "react";

const News = () => {
  return (
    <>
      <div className="what-news">
        <div className="container">
          <div className="row">
            <div className="col-md-12 what-news-text">
              <div className="marquee-container">
                <div className="marquee-content">
                  <span>
                    <i className="bi bi-info-circle"></i> The
                    <strong>Silpasathi Portal</strong> is now
                    <strong>LIVE</strong> with
                    <strong className="service_count blink_me"> 106 </strong>
                    Industrial related Licenses / Approvals / NoCs and Renewals
                    |<i className="bi bi-envelope-open"></i> For any technical
                    query, critical issues or difficulties faced while
                    submitting application please call to our
                    <strong>Quick Response Team</strong> at
                    <a href="tel:+3322622004">
                      <strong className="text-decoration-underline">
                        03322622004
                      </strong>
                    </a>
                    in between
                    <strong>
                      10am to 6pm on Monday to Friday (Except Holidays)
                    </strong>
                    | Silpa Sathi Single Window Cell -
                    <a href="tel:+18003455562">
                      <strong className="text-decoration-underline">
                        Helpline no. (Toll free) 1800-345-5562
                      </strong>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
