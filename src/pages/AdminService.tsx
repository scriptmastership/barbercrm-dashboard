import React from "react";
import serviceAtom from "atoms/service";
import { useRecoilState } from "recoil";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { Loading, Empty } from "components/General/Basic";
import AddMenu from "components/Pages/Admin/Services/AddMenu";
import CategoryAction from "components/Pages/Admin/Services/CategoryAction";
import api from "api";

const AdminServices: React.FC = () => {

  const [serviceState, setServiceState] = useRecoilState(serviceAtom);

  React.useEffect(() => {
    if (!serviceState.init) {
      const load = async () => {
        const response = await api.post('/service/all');
        if (response.status === 200) {
          setServiceState({
            init: true,
            categories: response.data.categories,
            packages: response.data.packages
          });
        }
      };
      load();
    }
  }, [serviceState, setServiceState]);

  return (
    <AdminLayout title="Services">
      {!serviceState.init ?
        <Loading />
        :
        <div className="max-w-xl mx-auto space-y-8">
          <AddMenu />
          {serviceState.categories.length > 0 ?
            <div className="bg-white rounded-md overflow-hidden shadow divide-y">
              {serviceState.categories.map(category =>
                <div className="py-1 px-4 flex items-center justify-between" key={category.id}>
                  <span>
                    {category.name}
                  </span>
                  <CategoryAction categoryId={category.id} />
                </div>
              )}
            </div>
            :
            <Empty />
          }
        </div>
      }
    </AdminLayout>
  );
};

export default AdminServices;