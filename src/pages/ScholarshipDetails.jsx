import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";
import SpinnerLoader from "../loader/SpinnerLoader";

const ScholarshipDetails = () => {
  const { id } = useParams(); // index from route
  const [scholarship, setScholarship] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("/scholar.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedScholarship = data[parseInt(id)];
        setScholarship(selectedScholarship);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleApplyScholarship = () => {
    Swal.fire({
      title: "Application Started",
      text: `Applicant: ${user?.email}`,
      icon: "info",
      confirmButtonText: "Okay",
    });
  };

  if (!scholarship) return <SpinnerLoader />;

  return (
    <div className="bg-[#081613] p-6 flex justify-center min-h-screen">
      <div className="bg-[#1E1A29] p-6 rounded-2xl max-w-3xl w-full shadow-lg">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full h-72 object-cover rounded-md mb-4"
        />

        <h2 className="text-3xl text-white font-semibold mb-2">
          {scholarship.scholarshipName}
        </h2>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">University:</span>{" "}
          {scholarship.universityName}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Location:</span>{" "}
          {scholarship.universityCity}, {scholarship.universityCountry}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">World Rank:</span> #
          {scholarship.universityWorldRank}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Subject:</span>{" "}
          {scholarship.subjectCategory}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Degree:</span> {scholarship.degree}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Scholarship Type:</span>{" "}
          {scholarship.scholarshipCategory}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Tuition Fees:</span>{" "}
          {scholarship.tuitionFees === 0
            ? "Fully Funded"
            : `$${scholarship.tuitionFees}`}
        </p>

        <p className="text-gray-400 mb-1">
          <span className="font-semibold">Application Fee:</span> $
          {scholarship.applicationFees}
        </p>

        <p className="text-gray-400 mb-3">
          <span className="font-semibold">Service Charge:</span> $
          {scholarship.serviceCharge}
        </p>

        <p className="text-gray-400 mb-4">
          <span className="font-semibold">Deadline:</span>{" "}
          {new Date(scholarship.applicationDeadline).toLocaleDateString()}
        </p>

        <button
          onClick={handleApplyScholarship}
          className="bg-white text-[#112e29] py-2 px-5 rounded-md font-semibold hover:bg-[#ffc108] transition"
        >
          Apply Scholarship
        </button>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
