import { useEffect, useState } from "react";
import api from "../../api/api";

type UserInfo = {
  fullName: string;
};

type MemberNotification = {
  id: number;
  membershipEnd: string;
  user: UserInfo;
};

type PaymentNotification = {
  id: number;
  amount: number;
  member: {
    user: UserInfo;
  };
};

type NotificationsData = {
  total: number;
  expiringMembers: MemberNotification[];
  expiredMembers: MemberNotification[];
  pendingPayments: PaymentNotification[];
  inactiveMembers: MemberNotification[];
};

export default function NotificationsPage() {
  const [data, setData] = useState<NotificationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get<NotificationsData>("/notifications");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-white">
        <h1 className="mb-4 text-3xl font-bold">Notifications</h1>
        <p className="rounded bg-red-900 p-4 text-red-200">{error}</p>
        <button
          onClick={fetchNotifications}
          className="mt-4 rounded bg-pink-600 px-4 py-2 font-bold hover:bg-pink-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-white">No notifications found.</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Notifications ({data.total})
      </h1>

      <Section title="Expiring Memberships" empty={data.expiringMembers.length === 0}>
        {data.expiringMembers.map((member) => (
          <AlertRow
            key={member.id}
            title={member.user.fullName}
            subtitle={`Expires on ${new Date(
              member.membershipEnd
            ).toLocaleDateString()}`}
          />
        ))}
      </Section>

      <Section title="Expired Members" empty={data.expiredMembers.length === 0}>
        {data.expiredMembers.map((member) => (
          <AlertRow
            key={member.id}
            title={member.user.fullName}
            subtitle={`Expired on ${new Date(
              member.membershipEnd
            ).toLocaleDateString()}`}
          />
        ))}
      </Section>

      <Section title="Pending Payments" empty={data.pendingPayments.length === 0}>
        {data.pendingPayments.map((payment) => (
          <AlertRow
            key={payment.id}
            title={payment.member.user.fullName}
            subtitle={`Pending amount: $${payment.amount}`}
          />
        ))}
      </Section>

      <Section title="Inactive Members" empty={data.inactiveMembers.length === 0}>
        {data.inactiveMembers.map((member) => (
          <AlertRow
            key={member.id}
            title={member.user.fullName}
            subtitle="Member is inactive"
          />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  empty,
}: {
  title: string;
  children: React.ReactNode;
  empty: boolean;
}) {
  return (
    <section className="mb-8 rounded-xl bg-slate-800 p-5">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="space-y-3">
        {empty ? (
          <p className="text-sm text-gray-400">No records found.</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

function AlertRow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-lg bg-slate-900 p-4">
      <p className="font-bold">{title}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}