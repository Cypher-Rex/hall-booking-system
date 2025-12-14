import { useEffect, useState } from "react";
import axios from "axios";

/* ---------------- CONFIG ---------------- */

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/bookings";

/* ---------------- CONSTANTS ---------------- */

const emptyForm = {
  applicantName: "",
  mobileNo: "",
  email: "",
  hallName: "",
  purpose: "",
  rent: "",
  additionalCharges: "",
  total: "",
  receiptNo: "",
  receiptDate: "",
  remark: "",
};

const fieldConfig = [
  { name: "applicantName", label: "Applicant Name", type: "text", required: true },
  { name: "mobileNo", label: "Mobile No", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "hallName", label: "Hall Name", type: "text", required: true },
  { name: "purpose", label: "Purpose", type: "text", required: true },
  { name: "rent", label: "Rent", type: "number", required: true },
  { name: "additionalCharges", label: "Additional Charges", type: "number" },
  { name: "total", label: "Total Amount", type: "number", required: true },
  { name: "receiptNo", label: "Receipt No", type: "text", required: true },
  { name: "receiptDate", label: "Receipt Date", type: "date", required: true },
  { name: "remark", label: "Remark", type: "text" },
];

/* ---------------- APP ---------------- */

function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState("list"); // list | add | edit
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  /* ---------------- FETCH BOOKINGS ---------------- */

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      // ✅ Normalize backend response safely
      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else if (Array.isArray(res.data.data)) {
        setBookings(res.data.data);
      } else if (Array.isArray(res.data.rows)) {
        setBookings(res.data.rows);
      } else {
        console.error("Unexpected API response:", res.data);
        setBookings([]);
        setApiError("Invalid data format from server");
      }
    } catch (err) {
      console.error("API error:", err);
      setApiError("Failed to load bookings. Please check backend.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ---------------- VALIDATION ---------------- */

  const validateForm = (data) => {
    const e = {};

    if (!data.applicantName || data.applicantName.length < 3)
      e.applicantName = "Minimum 3 characters required";

    if (!/^\d{10}$/.test(data.mobileNo))
      e.mobileNo = "Mobile number must be 10 digits";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Invalid email format";

    if (!data.hallName) e.hallName = "Hall name is required";
    if (!data.purpose) e.purpose = "Purpose is required";

    if (data.rent === "" || Number(data.rent) < 0)
      e.rent = "Rent must be a positive number";

    if (Number(data.additionalCharges) < 0)
      e.additionalCharges = "Charges cannot be negative";

    if (!data.receiptNo) e.receiptNo = "Receipt number is required";

    if (!data.receiptDate) e.receiptDate = "Receipt date is required";
    else if (new Date(data.receiptDate) > new Date())
      e.receiptDate = "Receipt date cannot be in the future";

    return e;
  };

  const isFormValid = () => Object.keys(errors).length === 0;

  /* ---------------- INPUT HANDLER ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form, [name]: value };

    const rent = parseFloat(updatedForm.rent) || 0;
    const extra = parseFloat(updatedForm.additionalCharges) || 0;
    updatedForm.total = rent + extra;

    setForm(updatedForm);
    setErrors(validateForm(updatedForm));
  };

  /* ---------------- CRUD ACTIONS ---------------- */

  const submitBooking = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    await axios.post(API_URL, form);
    setForm(emptyForm);
    setErrors({});
    setMode("list");
    fetchBookings();
  };

  const updateBooking = async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    await axios.put(`${API_URL}/${editingId}`, form);
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    setMode("list");
    fetchBookings();
  };

  const deleteBooking = async () => {
    await axios.delete(`${API_URL}/${editingId}`);
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    setMode("list");
    fetchBookings();
  };

  const startEdit = (booking) => {
    setForm(booking);
    setEditingId(booking.id);
    setErrors({});
    setMode("edit");
  };

  /* ---------------- RENDER GUARDS ---------------- */

  if (loading) {
    return (
      <div className="app-container">
        <h2>Loading bookings…</h2>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="app-container">
        <h2 style={{ color: "#dc2626" }}>{apiError}</h2>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="app-container">
      <h2>Hall Booking System</h2>

      {mode === "list" && (
        <>
          <div className="add-button">
            <button className="primary" onClick={() => setMode("add")}>
              Add New Booking
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Receipt</th>
                <th>Applicant</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Hall</th>
                <th>Purpose</th>
                <th>Rent</th>
                <th>Charges</th>
                <th>Total</th>
                <th>Remark</th>
                <th>Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) &&
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.receiptNo}</td>
                    <td>{b.applicantName}</td>
                    <td>{b.mobileNo}</td>
                    <td>{b.email}</td>
                    <td>{b.hallName}</td>
                    <td>{b.purpose}</td>
                    <td>{b.rent}</td>
                    <td>{b.additionalCharges}</td>
                    <td>{b.total}</td>
                    <td>{b.remark}</td>
                    <td>{b.receiptDate}</td>
                    <td>
                      <button onClick={() => startEdit(b)}>Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {(mode === "add" || mode === "edit") && (
        <div className="form-container">
          <h3>{mode === "add" ? "Add Booking" : "Edit Booking"}</h3>

          {fieldConfig.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                readOnly={mode === "edit" && field.name === "receiptNo"}
                style={{
                  borderColor: errors[field.name] ? "#dc2626" : "#ccc",
                  backgroundColor:
                    mode === "edit" && field.name === "receiptNo"
                      ? "#f1f5f9"
                      : "white",
                }}
              />
              {errors[field.name] && (
                <small style={{ color: "#dc2626" }}>
                  {errors[field.name]}
                </small>
              )}
            </div>
          ))}

          <div className="button-row">
            <button
              className="primary"
              onClick={mode === "add" ? submitBooking : updateBooking}
              disabled={!isFormValid()}
            >
              {mode === "add" ? "Submit" : "Update"}
            </button>

            <button onClick={() => setMode("list")}>Back</button>

            {mode === "edit" && (
              <button className="danger" onClick={deleteBooking}>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
