import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "components/AdminLayout/AdminLayout";
import teamAtom from "atoms/team";
import { useRecoilState } from "recoil";
import api from "api";
import { Loading, Empty } from "components/General/Basic";
import { IoIosArrowForward } from "react-icons/io";

const AdminTeam: React.FC = () => {

  const [teamState, setTeamState] = useRecoilState(teamAtom);

  React.useEffect(() => {
    if (!teamState.init) {
      const load = async () => {
        const response = await api.post('/member/all');
        if (response.status === 200) {
          setTeamState({
            init: true,
            members: response.data
          });
        }
      };
      load();
    }
  }, [teamState, setTeamState]);

  return (
    <AdminLayout title="Team">
      {!teamState.init ?
        <Loading />
        :
        <div className="max-w-3xl mx-auto space-y-8">
          <Link className="btnPrimary w-32" to="/admin/team/new">
            New Member
          </Link>
          {teamState.members.length === 0 ?
            <Empty />
            :
            <div className="space-y-4">
              {teamState.members.map(member =>
                <Link to={`/admin/team/${member.id}`} className="block p-4 bg-white rounded-md overflow-hidden shadow hover:text-primary" key={member.id}>
                  <div className="py-1 px-4 flex items-center justify-between">
                    <div className="flex items-center flex-wrap">
                      <span className="w-60">
                        {member.name}
                      </span>
                      <div className="text-sm text-info w-60">
                        <div>{member.email}</div>
                        <div>{member.phone}</div>
                      </div>
                    </div>
                    <IoIosArrowForward className="text-xl" />
                  </div>
                </Link>
              )}
            </div>
          }
        </div>
      }
    </AdminLayout>
  );
};

export default AdminTeam;