import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, MessageCircleQuestionIcon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

interface NavibarProps {
  toggleSidebar?: () => void;
}

type User = {
  role: string;
};

type Member = {
  id: number;
  user: {
    fullName: string;
    email: string;
    phone?: string;
  };
};

type PageItem = {
  type: "page";
  name: string;
  path: string;
  keywords: string[];
  roles: string[];
};

type MemberItem = {
  type: "member";
  id: number;
  name: string;
  email: string;
  phone?: string;
  path: string;
};

const pageItems: PageItem[] = [
  {
    type: "page",
    name: "Dashboard",
    path: "/dashboard",
    keywords: ["dashboard", "home", "stats", "charts"],
    roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
  },
  {
    type: "page",
    name: "Members",
    path: "/members",
    keywords: ["members", "member", "clients", "users"],
    roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"],
  },
  {
    type: "page",
    name: "Payments",
    path: "/payments",
    keywords: ["payments", "payment", "receipt", "invoice", "money"],
    roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
  },
  {
    type: "page",
    name: "Attendance",
    path: "/attendance",
    keywords: ["attendance", "check in", "check out"],
    roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"],
  },
  {
    type: "page",
    name: "Reports",
    path: "/reports",
    keywords: ["reports", "summary", "revenue"],
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    type: "page",
    name: "Activity Logs",
    path: "/activity-logs",
    keywords: ["activity", "logs", "audit", "history"],
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    type: "page",
    name: "Settings",
    path: "/settings",
    keywords: ["settings", "gym", "logo"],
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
];

export default function Navibar({ toggleSidebar }: NavibarProps) {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  const userData = localStorage.getItem("user");
  const user: User | null = userData ? JSON.parse(userData) : null;
  const role = user?.role || "";

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members");
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to fetch members for search", error);
      }
    };

    if (role) {
      fetchMembers();
    }
  }, [role]);

  const pageResults = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();

    if (!keyword) return [];

    return pageItems
      .filter((item) => item.roles.includes(role))
      .filter((item) => {
        const text = [item.name, ...item.keywords].join(" ").toLowerCase();
        return text.includes(keyword);
      });
  }, [searchQuery, role]);

  const memberResults: MemberItem[] = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();

    if (!keyword) return [];

    return members
      .filter((member) => {
        const text = [
          member.user.fullName,
          member.user.email,
          member.user.phone || "",
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(keyword);
      })
      .slice(0, 5)
      .map((member) => ({
        type: "member",
        id: member.id,
        name: member.user.fullName,
        email: member.user.email,
        phone: member.user.phone,
        path: `/members/${member.id}`,
      }));
  }, [searchQuery, members]);

  const hasResults = pageResults.length > 0 || memberResults.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const goToPage = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (memberResults.length > 0) {
      goToPage(memberResults[0].path);
      return;
    }

    if (pageResults.length > 0) {
      goToPage(pageResults[0].path);
    }
  };

  return (
    <div>
      <div className="flex h-[70px] w-full items-center justify-between rounded-2xl border-[3px] border-pink-600 bg-slate-950 p-4 px-6">
        <Menu
          className="cursor-pointer text-white lg:hidden"
          size={30}
          onClick={toggleSidebar}
        />

        <div className="relative ml-auto" ref={searchRef}>
          {!showSearch && (
            <Search
              className="cursor-pointer text-white"
              size={26}
              onClick={() => setShowSearch(true)}
            />
          )}

          {showSearch && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder="Search pages or members..."
                autoFocus
                className="h-10 w-80 rounded-md border border-pink-500 bg-slate-800 pl-4 pr-10 text-white placeholder-gray-300 outline-none"
              />

              <Search
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              />

              {searchQuery && (
                <div className="absolute right-0 top-12 z-50 max-h-96 w-80 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
                  {memberResults.length > 0 && (
                    <>
                      <p className="px-4 pt-3 text-xs font-bold uppercase text-pink-400">
                        Members
                      </p>

                      {memberResults.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => goToPage(member.path)}
                          className="block w-full px-4 py-3 text-left hover:bg-slate-800"
                        >
                          <p className="font-semibold text-white">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {member.email}
                          </p>
                        </button>
                      ))}
                    </>
                  )}

                  {pageResults.length > 0 && (
                    <>
                      <p className="px-4 pt-3 text-xs font-bold uppercase text-pink-400">
                        Pages
                      </p>

                      {pageResults.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => goToPage(item.path)}
                          className="block w-full px-4 py-3 text-left text-white hover:bg-slate-800"
                        >
                          {item.name}
                        </button>
                      ))}
                    </>
                  )}

                  {!hasResults && (
                    <p className="px-4 py-3 text-sm text-gray-400">
                      No result found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <MessageCircleQuestionIcon className="ml-4 text-white" size={30} />
      </div>
    </div>
  );
}