import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";
import SpinnerLoader from "../loader/SpinnerLoader";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaGlobe,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("/scholar.json")
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data[parseInt(id)]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleApplyScholarship = () => {
    Swal.fire({
      title: "🎓 Application Started",
      text: `Applicant: ${user?.email}`,
      icon: "info",
      confirmButtonText: "Continue",
      confirmButtonColor: "#5b3cc4",
    });
  };

  if (!scholarship) return <SpinnerLoader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* ===== Hero Image ===== */}
        <div className="relative h-80">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {scholarship.scholarshipName}
            </h1>
            <p className="text-gray-300 mt-1">{scholarship.universityName}</p>
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="p-8 text-gray-200">
          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoCard icon={<FaUniversity />} label="University">
              {scholarship.universityName}
            </InfoCard>

            <InfoCard icon={<FaMapMarkerAlt />} label="Location">
              {scholarship.universityCity}, {scholarship.universityCountry}
            </InfoCard>

            <InfoCard icon={<FaGlobe />} label="World Rank">
              #{scholarship.universityWorldRank}
            </InfoCard>

            <InfoCard icon={<FaGraduationCap />} label="Degree">
              {scholarship.degree}
            </InfoCard>

            <InfoCard icon={<FaGraduationCap />} label="Subject">
              {scholarship.subjectCategory}
            </InfoCard>

            <InfoCard icon={<FaMoneyBillWave />} label="Scholarship Type">
              {scholarship.scholarshipCategory}
            </InfoCard>

            <InfoCard icon={<FaMoneyBillWave />} label="Tuition Fees">
              {scholarship.tuitionFees === 0
                ? "Fully Funded"
                : `$${scholarship.tuitionFees}`}
            </InfoCard>

            <InfoCard icon={<FaMoneyBillWave />} label="Application Fee">
              ${scholarship.applicationFees}
            </InfoCard>

            <InfoCard icon={<FaMoneyBillWave />} label="Service Charge">
              ${scholarship.serviceCharge}
            </InfoCard>

            <InfoCard icon={<FaCalendarAlt />} label="Deadline">
              {new Date(scholarship.applicationDeadline).toLocaleDateString()}
            </InfoCard>
          </div>

          {/* Apply Button */}
          <div className="flex justify-center">
            <button
              onClick={handleApplyScholarship}
              className="px-10 py-3 rounded-full font-semibold text-white
              bg-linear-to-r from-[#5b3cc4] to-[#22049b]
              hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Apply for Scholarship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== Reusable Info Card ===== */
const InfoCard = ({ icon, label, children }) => (
  <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex gap-3 items-start">
    <div className="text-[#5b3cc4] text-xl mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold">{children}</p>
    </div>
  </div>
);

export default ScholarshipDetails;
