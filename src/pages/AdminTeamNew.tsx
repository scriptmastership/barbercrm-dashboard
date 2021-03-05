import React from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { useForm, Controller } from "react-hook-form";
import { Loading, SelectPrimary } from "components/General/Basic";
import serviceAtom from "atoms/service";
import teamAtom from "atoms/team";
import { useRecoilState } from "recoil";
import { Button } from "components/General/Basic";
import api from "api";

const AdminTeamNew: React.FC = () => {

  const [serviceState, setServiceState] = useRecoilState(serviceAtom);
  const [teamState, setTeamState] = useRecoilState(teamAtom);
  const { register, handleSubmit, errors, reset, control } = useForm();
  const [status, setStatus] = React.useState('');
  const [packageOptions, setPackageOptions] = React.useState<any[]>([]);

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

  React.useEffect(() => {
    const options = serviceState.packages.map(p => {
      return {
        value: p.id,
        label: p.name
      };
    });
    setPackageOptions(options);
  }, [serviceState.packages]);

  const submit = async (data: any) => {

    setStatus('submit');

    const { name, email, phone, packages } = data;

    const response = await api.post('/member/create', {
      name,
      email,
      phone,
      packages: packages.map((p: any) => p.value)
    });

    if (response.status === 200) {
      reset();
      setStatus('success');
      if (teamState.init) {
        setTeamState({
          ...teamState,
          members: [
            ...teamState.members,
            response.data
          ]
        });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <AdminLayout title="New Member">
      {!serviceState.init ?
        <Loading />
        :
        <div className="max-w-3xl mx-auto space-y-8">

          <form className="bg-white shadow p-8 space-y-4" onSubmit={handleSubmit(submit)}>

            <label className="block text-sm space-y-2">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                className="inputText w-full"
                ref={register({ required: true })}
              />
              {errors.name && <div className="text-red-600">This field is required</div>}
            </label>

            <label className="block mt-4 text-sm space-y-2">
              <span className="text-gray-700 ">email</span>
              <input
                type="text"
                name="email"
                className="inputText w-full"
                ref={register({ required: true })}
              />
              {errors.email && <div className="text-red-600">This field is required</div>}
            </label>

            <label className="block mt-4 text-sm space-y-2">
              <span className="text-gray-700 ">phone</span>
              <input
                type="text"
                name="phone"
                className="inputText w-full"
                ref={register({ required: true })}
              />
              {errors.phone && <div className="text-red-600">This field is required</div>}
            </label>

            <div className="block text-sm space-y-2">
              <span className="text-gray-700">Packages</span>
              {packageOptions.length > 0 ?
                <Controller
                  control={control}
                  name="packages"
                  defaultValue={[]}
                  render={({ onChange }) => (
                    <SelectPrimary isMulti options={packageOptions} onChange={onChange} />
                  )}
                />
                :
                <div className="py-3 px-4 bg-gray-100 rounded-md">No Single Packages to Select</div>
              }
            </div>

            <Button
              className="btnPrimary w-32"
              waiting={status === 'submit'}
              success={status === 'success'}
              error={status === 'error'}
            >
              Submit
            </Button>

          </form >
        </div>
      }
    </AdminLayout>
  );
};

export default AdminTeamNew;