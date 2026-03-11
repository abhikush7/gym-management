import { User } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { getInitials, formatDate, isExpired } from '@/lib/utils/helpers';

interface MemberCardProps {
  member: User;
  onClick?: () => void;
}

export default function MemberCard({ member, onClick }: MemberCardProps) {
  const expired = member.membershipExpiry ? isExpired(member.membershipExpiry) : false;

  return (
    <div
      className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#1f1f1f]/50 transition-all cursor-pointer hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
          {getInitials(member.displayName)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{member.displayName}</p>
          <p className="text-gray-500 text-xs truncate">{member.email}</p>
        </div>
        <Badge
          text={member.isActive && !expired ? 'Active' : 'Inactive'}
          variant={member.isActive && !expired ? 'success' : 'danger'}
        />
      </div>
      {member.membershipExpiry && (
        <p className="text-gray-500 text-xs">
          Expires: {formatDate(member.membershipExpiry)}
        </p>
      )}
    </div>
  );
}
