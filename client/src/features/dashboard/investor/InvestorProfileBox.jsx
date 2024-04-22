import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const InvestorProfileBox = () => {
  const user = useSelector((state) => state.user.user);
  const [profileDone] = useState({
    series: [75],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "20px",
            },
            value: {
              formatter: function (val) {
                return val + "%";
              },

              color: "#111",
              fontSize: "32px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [""],
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="card profile-box bg-white mb-3 p-4">
        <h4 className="card-title text-center fw-bold">Profile</h4>
        <h6 className="card-subtitle  text-body-secondary text-center">Update your details</h6>
        <ReactApexChart options={profileDone.options} series={profileDone.series} type="radialBar" height={200} />
        {/* Demo info */}
        <div className="row text-center">
          <div className="col-12">
            <div className="h5 font-weight-bold mb-0">
              {user?.fname} {user?.mname} {user?.lname}
              <i className="bi bi-patch-check-fill text-success"></i>
            </div>
            <span className="small text-secondary">
              <i className="bi bi-envelope"></i> {user?.email}
            </span>
          </div>

          <button type="button" className="btn btn-warning btn-sm mt-2" onClick={() => navigate("/edit-profile")}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default InvestorProfileBox;
