"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Changestatus = () => {
  const router = useRouter();
  const { id } = router.query; // Access the 'id' from the URL using useRouter
  const [status, setStatus] = useState("");

  // Ensure id is available before making requests
  useEffect(() => {
    if (id) {
      // You can add any other logic that depends on 'id' here
    }
  }, [id]);

  // Handle activation request
  const handleActivate = async () => {
    if (!id) return; // Exit if no id is available

    try {
      const response = await axios.post(`https://projectx-backend-escf.onrender.com/api/v1/activate/${id}`);
      setStatus(response.data.message || "Activation successful");
    } catch (error) {
      console.error("Error activating:", error);
      setStatus("Activation failed");
    }
  };

  // Handle pending request
  const handlePending = async () => {
    if (!id) return; // Exit if no id is available

    try {
      const response = await axios.post(`https://projectx-backend-escf.onrender.com/api/v1/peending/${id}`);
      setStatus(response.data.message || "Marked as pending");
    } catch (error) {
      console.error("Error marking as pending:", error);
      setStatus("Failed to mark as pending");
    }
  };

  // Handle cancel request
  const handleCancel = async () => {
    if (!id) return; // Exit if no id is available

    try {
      const response = await axios.post(`https://projectx-backend-escf.onrender.com/api/v1/cancel/${id}`);
      setStatus(response.data.message || "Cancellation successful");
    } catch (error) {
      console.error("Error cancelling:", error);
      setStatus("Cancellation failed");
    }
  };

  return (
    <div className="flex gap-4">
      <button onClick={handleActivate} className="bg-blue-500 text-white p-2 rounded">Activate</button>
      <button onClick={handlePending} className="bg-yellow-500 text-white p-2 rounded">Mark as Pending</button>
      <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded">Cancel</button>

      {status && <p className="mt-4 text-xl">{status}</p>}
    </div>
  );
};

export default Changestatus;
