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

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await api.get<NotificationsData>("/notifications");
      setData(res.data);
    };

    fetchNotifications();
  }, []);

  if (!data) {
    return <div className="p-6 text-white">Loading notifications...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Notifications ({data.total})
      </h1>

      <Section title="Expiring Memberships">
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

      <Section title="Expired Members">
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

      <Section title="Pending Payments">
        {data.pendingPayments.map((payment) => (
          <AlertRow
            key={payment.id}
            title={payment.member.user.fullName}
            subtitle={`Pending amount: $${payment.amount}`}
          />
        ))}
      </Section>

      <Section title="Inactive Members">
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 rounded-xl bg-slate-800 p-5">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="space-y-3">
        {children || <p className="text-sm text-gray-400">No records found.</p>}
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