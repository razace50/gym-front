import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    const fetchMember = async () => {
      const res = await api.get(`/members/${id}`);
      setMember(res.data);
    };

    fetchMember();
  }, [id]);

  if (!member) {
    return <div className="p-6 text-white">Loading member...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">{member.user.fullName}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">Profile</h2>
          <p>Email: {member.user.email}</p>
          <p>Phone: {member.user.phone || "N/A"}</p>
          <p>Age: {member.age || "N/A"}</p>
          <p>Gender: {member.gender || "N/A"}</p>
          <p>Address: {member.address || "N/A"}</p>
          <p>Status: {member.status}</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">Membership</h2>
          <p>Plan: {member.membership?.name || "No Plan"}</p>
          <p>Price: {member.membership?.price || "N/A"}</p>
          <p>Start: {member.membershipStart ? new Date(member.membershipStart).toLocaleDateString() : "N/A"}</p>
          <p>End: {member.membershipEnd ? new Date(member.membershipEnd).toLocaleDateString() : "N/A"}</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">Trainer</h2>
          <p>{member.trainer?.user?.fullName || "No trainer assigned"}</p>
          <p>{member.trainer?.specialization || ""}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">Payment History</h2>
          {member.payments.map((payment: any) => (
            <div key={payment.id} className="mb-2 rounded bg-slate-900 p-3">
              ${payment.amount} - {payment.status} -{" "}
              {new Date(payment.createdAt).toLocaleDateString()}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">Attendance History</h2>
          {member.attendance.map((item: any) => (
            <div key={item.id} className="mb-2 rounded bg-slate-900 p-3">
              In: {new Date(item.checkIn).toLocaleString()}
              <br />
              Out: {item.checkOut ? new Date(item.checkOut).toLocaleString() : "Still inside"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}