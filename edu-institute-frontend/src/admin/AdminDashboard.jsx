import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DepartmentsAdmin from './DepartmentsAdmin';
import RegistrationsView from "./RegistrationsView";
import MessagesView from "./MessagesView";
import AdminFaculty from "./AdminFaculty";
import CourseManagement from "./CourseManagement";

import { BarChart, Users, MessageSquare, BookOpen, ListChecks } from "lucide-react";

import "./AdminDashboard.css";

const tabLabels = {
  departments: "Departments",
  faculty: "Faculty",
  courses: "Courses",
  messages: "Messages",
  registrations: "Registrations"
};

const icons = {
  departments: <ListChecks size={16} />,
  faculty: <Users size={16} />,
  courses: <BookOpen size={16} />,
  messages: <MessageSquare size={16} />,
  registrations: <BarChart size={16} />
};

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('departments');

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Edu Institute Admin</div>
        <div className="nav-links">
          {Object.keys(tabLabels).map(tab => (
            <a
              key={tab}
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="icon">{icons[tab]}</span> {tabLabels[tab]}
            </a>
          ))}
        </div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin/login");
            if (onLogout) onLogout();
          }}
        >
          Logout
        </button>
      </nav>

      <div className="container">
        <h2>Welcome, Admin!</h2>
        <div className="content">
          {activeTab === "departments" && <DepartmentsAdmin />}
          {activeTab === "faculty" && <AdminFaculty />}
          {activeTab === "courses" && <CourseManagement />}
          {activeTab === "messages" && <MessagesView />}
          {activeTab === "registrations" && <RegistrationsView />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
