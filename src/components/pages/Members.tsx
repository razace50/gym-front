import React from 'react'
import MemberCard from '../DashboardComponents/MemberCard'
import members from '../../../public/members.json'

export default function DashboardMembers() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Gym Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-6">
        {members.map((member) => (
          <MemberCard
            key={member.member_id}
            first_name={member.first_name}
            last_name={member.last_name}
            membership_type={member.membership_type}
            membership_status={member.membership_status}
            join_date={member.join_date}
            expiry_date={member.expiry_date}
          />
        ))}
      </div>
    </div>
  )
}
