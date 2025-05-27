import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    phone: "",
    altPhone: "",
    email: "",
    studentClass: "",
    dob: "",
    village: "",
    taluka: "",
    district: "",
    declaration: false,
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ submitted: false, error: false, message: "" });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
    setCapturing(false);
  };

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCapturing(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        alert("Could not access camera.");
        setCapturing(false);
      }
    } else {
      alert("Camera not supported in this browser.");
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 300);
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], "captured.png", { type: "image/png" });
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    });
    stopCamera();
  };

  const stopCamera = () => {
    let stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCapturing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.declaration) {
      setStatus({ submitted: false, error: true, message: "Please agree to the declaration terms." });
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePic) data.append("profilePic", profilePic);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ submitted: true, error: false, message: res.data.message });
      setFormData({
        name: "",
        parentName: "",
        phone: "",
        altPhone: "",
        email: "",
        studentClass: "",
        dob: "",
        village: "",
        taluka: "",
        district: "",
        declaration: false,
      });
      setProfilePic(null);
      setPreview(null);
    } catch (err) {
      setStatus({
        submitted: false,
        error: true,
        message: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form" encType="multipart/form-data">
      <label>Profile Photo</label>
      {!capturing && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="button" onClick={startCamera}>Capture from Camera</button>
        </>
      )}
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Profile Preview" className="preview-image" />
          <button type="button" onClick={() => { setProfilePic(null); setPreview(null); }}>Remove</button>
        </div>
      )}
      {capturing && (
        <div className="camera-capture">
          <video ref={videoRef} width="300" height="300" />
          <canvas ref={canvasRef} width="300" height="300" style={{ display: "none" }} />
          <div>
            <button type="button" onClick={capturePhoto}>Capture</button>
            <button type="button" onClick={stopCamera}>Cancel</button>
          </div>
        </div>
      )}

      <label>Student Full Name</label>
      <input
        name="name"
        placeholder="Student Full Name"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label>Parent Full Name</label>
      <input
        name="parentName"
        placeholder="Parent Full Name"
        required
        value={formData.parentName}
        onChange={handleChange}
      />

      <label>Mobile No (+91)</label>
      <div className="phone-input">
        <span className="country-code">+91</span>
        <input
          name="phone"
          placeholder="Mobile Number"
          required
          value={formData.phone}
          onChange={handleChange}
          maxLength={10}
          pattern="\d{10}"
          title="10 digit mobile number"
        />
      </div>

      <label>Alternate Mobile No (+91)</label>
      <div className="phone-input">
        <span className="country-code">+91</span>
        <input
          name="altPhone"
          placeholder="Alternate Mobile Number"
          value={formData.altPhone}
          onChange={handleChange}
          maxLength={10}
          pattern="\d{10}"
          title="10 digit mobile number"
        />
      </div>

      <label>Email (optional)</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Class</label>
      <input
        name="studentClass"
        placeholder="Class"
        required
        value={formData.studentClass}
        onChange={handleChange}
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        required
        value={formData.dob}
        onChange={handleChange}
      />

      <fieldset className="address-fieldset">
        <legend>Address</legend>
        <input
          name="village"
          placeholder="Village"
          required
          value={formData.village}
          onChange={handleChange}
        />
        <input
          name="taluka"
          placeholder="Taluka"
          required
          value={formData.taluka}
          onChange={handleChange}
        />
        <input
          name="district"
          placeholder="District"
          required
          value={formData.district}
          onChange={handleChange}
        />
      </fieldset>

      <label className="terms-label">
        <input
          type="checkbox"
          name="declaration"
          checked={formData.declaration}
          onChange={handleChange}
          required
        />
        I agree to the declaration terms.
      </label>

      <button type="submit">Submit</button>

      {status.message && (
        <p className={status.error ? "error-message" : "success-message"}>{status.message}</p>
      )}
    </form>
  );
};

export default RegistrationForm;
