import React, { useState, useEffect, useMemo } from "react";
import Apology_Letter_KarthikeyanJV from "/assets/Apology_Letter_KarthikeyanJV.pdf";
import Apology_Letter_KishoreK from "/assets/Apology_Letter_KishoreK.pdf";
import Apology_Letter_RahulK from "/assets/Apology_Letter_RahulK.pdf";
import Apology_Letter_SangeethM from "/assets/Apology_Letter_SangeethM.pdf";
import Apology_Letter_HenryM from "/assets/Apology_Letter_HenryM.pdf";
import { Button } from "@mui/material";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const pdfs = [
  { id: "7376242AD199", name: "Apology Letter 7376242AD199", src: Apology_Letter_KarthikeyanJV },
  { id: "7376242CS111", name: "Apology Letter 7376242CS111", src: Apology_Letter_KishoreK },
  { id: "7376242AD267", name: "Apology Letter 7376242AD267", src: Apology_Letter_RahulK },
  { id: "7376242IT201", name: "Apology Letter 7376242IT201", src: Apology_Letter_SangeethM },
  { id: "7376242AL165", name: "Apology Letter 7376242AL165", src: Apology_Letter_HenryM },
];

export default function Admin4() {
  const [heading, setHeading] = useState("");
  const fullHeading = "  Your uploads:";
  const headingLength = fullHeading.length;
  const [studentId, setStudentId] = useState("");
  const [studentPdf, setStudentPdf] = useState({});


  // Fetching all PDFs from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/student-pdfs")
      .then((response) => response.json())
      .then((data) => {
        const pdfData = data.reduce((acc, pdf) => {
          if (!acc[pdf.student_id]) acc[pdf.student_id] = [];
          acc[pdf.student_id].push({ id: pdf.student_id, name: pdf.pdf_name, src: pdf.pdf_src });
          return acc;
        }, {});
        setStudentPdf(pdfData);
      })
      .catch((error) => console.error("Error fetching PDFs:", error));
  }, []);

  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < headingLength - 1) {
        setHeading((prev) => prev + fullHeading[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);


  const uploadPDF = () => {
    let inp = document.getElementById("inp");
    inp.style.visibility = "visible";
  };

  const processStudentId = () => {
    const normalizedStudentId = studentId.trim().toUpperCase();
    const matchedPdf = pdfs.find((pdf) => pdf.id === normalizedStudentId);

    if (matchedPdf) {
      const newPdf = {
        student_id: normalizedStudentId,
        pdf_name: matchedPdf.name,
        pdf_src: matchedPdf.src,
      };

      // Adding the PDF to the backend
      fetch("http://localhost:5000/api/student-pdfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPdf),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);

          
          setStudentPdf((prev) => ({
            ...prev,
            [normalizedStudentId]: [...(prev[normalizedStudentId] || []), matchedPdf],
          }));
          alert(`PDF for Student ID ${normalizedStudentId} has been added.`);
        })
        .catch((error) => console.error("Error adding PDF:", error));
    } else {
      alert("No PDF found for the entered Student ID.");
    }

    setStudentId(""); 
  };

  const combinedPdfs = useMemo(() => {
    const dynamicPdfs = Object.values(studentPdf).flat();
    const uniqueDynamicPdfs = dynamicPdfs.filter(
      (dynamicPdf) => !pdfs.some((staticPdf) => staticPdf.id === dynamicPdf.id)
    );
    return [...pdfs, ...uniqueDynamicPdfs];
  }, [studentPdf]);

  

  return (
    <div className="container mt-5" style={{ marginLeft: "150px", marginBottom: "320px" }}>
      {/* Heading and Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            fontFamily: "tahoma",
            fontWeight: "500",
            color: "#875D7B",
            marginTop: "50px",
            fontSize: "1.7rem",
          }}
        >
          {heading}
        </h2>

        <input
          type="text"
          id="inp"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              processStudentId();
            }
          }}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            marginTop: "50px",
            fontFamily: "tahoma",
            visibility: "hidden",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#1f80e0",
            color: "white",
            marginTop: "50px",
            marginRight: "5px"
          }}
          onClick={uploadPDF}
        >
          Upload PDF <i class="bi bi-folder-plus" style={{marginLeft: "10px", marginTop: "2px"}}></i>
        </Button>
      </div>

      {/* PDF Grid */}
      <div
        className="row"
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {combinedPdfs.map((pdf, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 calc(30% - 20px)",
              maxWidth: "calc(30% - 20px)",
              marginBottom: "10px",
            }}
          >
            <a
              href={pdf.src}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "30px",
                  backgroundColor: "#f0f4f8",
                  cursor: "pointer",
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  {pdf.name}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}