import React from "react";
import serviceAtom from "atoms/service";
import { useRecoilState } from "recoil";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { Loading, Empty } from "components/General/Basic";
import AddMenu from "components/Pages/Admin/Services/AddMenu";
import CategoryAction from "components/Pages/Admin/Services/CategoryAction";
import PackageAction from "components/Pages/Admin/Services/PackageAction";
import api from "api";
import { BsFile, BsFiles } from 'react-icons/bs';

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
        <div className="max-w-3xl mx-auto space-y-8">
          <AddMenu />
          {serviceState.categories.length > 0 ?
            <div className="bg-white rounded-md overflow-hidden shadow divide-y">
              {serviceState.categories.map(category =>
                <div key={category.id}>
                  <div className="py-1 px-4 flex items-center justify-between">
                    <span>
                      {category.name}
                    </span>
                    <CategoryAction categoryId={category.id} />
                  </div>
                  {serviceState.packages.filter(p => p.categoryId === category.id).map(pack =>
                    <div className="py-1 px-4 flex items-center justify-between border-t border-gray-200" key={pack.id}>
                      <div className="flex items-center space-x-2 ml-2 text-gray-500">
                        {pack.type === 'SINGLE' ? <BsFile className="text-xl" /> : <BsFiles className="text-xl" />}
                        <span>{pack.name}</span>
                      </div>
                      <PackageAction packageId={pack.id} />
                    </div>
                  )}
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