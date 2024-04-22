import InnerPageHead from "../../layout/InnerPageHead";
import Footer from "../../layout/Footer";
import DocumentTitle from "../../components/DocumentTitle";

const About = () => {
  return (
    <>
      <DocumentTitle title={"About Silpa Sathi"} />
      <InnerPageHead />
      <div className="inner-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="panel-header">About Silpasathi</div>
              <p>
                Silpasathi – Single Window Services can be accessed through an
                Online Single Window Portal{" "}
                <a href="/">https://silpasathi.wb.gov.in/</a> using IT-enabled
                devices which includes desktop PCs and laptops.
              </p>
              <p>
                Later, this facility will also be available on tablets and
                smartphones.
              </p>
              <ul>
                <li>
                  It serves as a digital gateway for providing the necessary
                  statutory compliances under the applicable Acts, Rules,
                  Policies and Schemes of the Govt of West Bengal.
                </li>
                <li>
                  Investors can get certificates and licences required for
                  setting up and operating business in the State in a smooth and
                  time-bound manner, without the need to visit any government
                  department or office.
                </li>
                <li>
                  In addition, SilpaSathi Kiosks are available at 23 Industry
                  Facilitation Centres (IFCs) located in every district of the
                  State. The IFCs provide handholding support to the investors
                  seeking statutory compliance services from SilpaSathi portal.
                </li>
              </ul>
              <p>
                Silpa Sathi is a dedicated set up in West Bengal Industrial
                Development Corporation Ltd. (WBIDCL) to facilitate investors in
                obtaining services required for setting up and operate business
                in the State in smooth and time bound manner/
              </p>
              <p>
                Industry Facilitation Centre (IFC) in every district of the
                State provides handholding support to the investors seeking
                services from Silpa Sathi
              </p>
              <p>
                Online Single Window Portal serves as a digital gateway for
                providing the necessary services under the applicable Acts,
                Rules, Policies and Schemes made thereunder from a single point
                in a time-bound manner.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
