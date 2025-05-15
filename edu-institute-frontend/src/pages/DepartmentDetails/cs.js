import React from "react";
import "./cs.css"; // Shared CSS for all departments
import { motion } from "framer-motion";

const CSDepartment = ({ onClose }) => {
  return (
    <motion.div
      className="department-popup"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Department of Computer Engineering
        </motion.h2>

        <motion.div
          className="popup-images"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img src="https://picsum.photos/id/1011/800/400" alt="CS Lab 1" />
          <img src="https://picsum.photos/id/1005/800/400" alt="CS Lab 2" />
          <img src="https://picsum.photos/id/1016/800/400" alt="CS Event" />
        </motion.div>

        <p>
          The Department of Computer Engineering started in the year 1999 with
          an initial intake of 60 students, now expanded to 180 as of 2023-24.
          It also offers a two-year Master's program since 2011-12. Both programs
          are AICTE approved and affiliated with SPPU, Pune.
        </p>

        <p>
          With state-of-the-art laboratories and collaborations with NVIDIA,
          Zensar, Oracle, and others, the department emphasizes Project-Based
          Learning and real-world tech exposure. Student clubs, seminars, coding
          contests, and online certification tie-ups with IITs foster continuous
          learning.
        </p>

        <p>
          Alumni are placed in top firms like Google, Microsoft, Infosys, TCS,
          Accenture, and many more. Students also actively participate in
          cultural and social initiatives, making them well-rounded professionals.
        </p>

        <h3>Vision:</h3>
        <p>• To achieve excellence in the field of computing through quality education.</p>

        <h3>Mission:</h3>
        <p>• To develop promising professionals in the field of computing.</p>
        <p>• To provide exposure to emerging technologies and inculcate ethics.</p>
        <p>• To strengthen association with alumni and industry.</p>
      </div>
    </motion.div>
  );
};

export default CSDepartment;
