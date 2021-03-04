import React from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { useForm } from "react-hook-form";
import serviceAtom from "atoms/service";
import { useRecoilState } from "recoil";
import { Button } from "components/General/Basic";
import api from "api";

const AdminServiceCategory: React.FC = () => {

  const [serviceState, setServiceState] = useRecoilState(serviceAtom);
  const { register, handleSubmit, errors, reset } = useForm();
  const [status, setStatus] = React.useState('');

  const submit = async (data: any) => {

    setStatus('submit');

    const response = await api.post('/service/category_create', {
      name: data.name,
      description: data.description,
    });

    if (response.status === 200) {
      reset();
      setStatus('success');
      if (serviceState.init) {
        setServiceState({
          ...serviceState,
          categories: [
            ...serviceState.categories,
            response.data
          ]
        });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <AdminLayout title="New Category">
      <div className="max-w-xl mx-auto space-y-8">
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
            <span className="text-gray-700 ">Description (optional)</span>
            <input
              type="password"
              name="description"
              className="inputText w-full"
              ref={register()}
            />
          </label>

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
    </AdminLayout>
  );
};

export default AdminServiceCategory;