
interface MemberCardProps {
  first_name: string;
  last_name: string;
  membership_type: string;
  membership_status: string;
  join_date: string;
  expiry_date: string;
  image?: string;
}

export default function MemberCard({
  first_name,
  last_name,
  membership_type,
  membership_status,
  join_date,
  expiry_date,
  image,
}: MemberCardProps) {
  const fullName = `${first_name} ${last_name}`;
  return (
    <div className="bg-gray-300 shadow p-6 flex flex-col items-center justify-center border-[6px] border-pink-500 rounded-2xl h-60 transition-transform duration-300 hover:scale-110 cursor-pointer">
      {/* Avatar */}
      <img
        src={
          image ||
          `https://ui-avatars.com/api/?name=${first_name}+${last_name}&background=ec4899&color=fff`
        }
        alt={`${first_name} ${last_name}` }
        className="w-16 h-16 rounded-full border-2 border-pink-500 mb-3 object-cover"
      />

      {/* Name */}
      <h3 className="text-gray-700 font-semibold text-lg">
        {fullName || `${first_name} ${last_name}`}
      </h3>

      {/* Membership Info */}
      <p className="text-sm text-gray-600 font-medium">
        {membership_type} Member
      </p>

      {/* Status */}
      <p
        className={`text-sm font-semibold mt-1 ${
          membership_status === 'Active'
            ? 'text-green-600'
            : membership_status === 'Pending'
            ? 'text-yellow-600'
            : 'text-red-600'
        }`}
      >
        {membership_status}
      </p>

      {/* Dates */}
      <div className="text-xs text-gray-600 mt-2 text-center">
        <p>Joined: {join_date}</p>
        <p>Expires: {expiry_date}</p>
      </div>
    </div>
  )
}
