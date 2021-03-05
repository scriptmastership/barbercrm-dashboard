import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { useForm } from "react-hook-form";
import serviceAtom, { Category } from "atoms/service";
import { useRecoilState } from "recoil";
import { Button, Loading } from "components/General/Basic";
import api from "api";

const AdminServiceCategoryEdit: React.FC = () => {

  const { id }: any = useParams();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [serviceState, setServiceState] = useRecoilState(serviceAtom);
  const { register, handleSubmit, errors } = useForm();
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    if (category === null) {
      const load = async () => {
        const response = await api.post('/service/category', { id });
        if (response.status === 200) {
          setCategory(response.data);
        }
      };
      load();
    }
  }, [id, category]);

  const handleUpdate = async (data: any) => {

    setStatus('submit');

    const response = await api.post('/service/category_update', {
      id,
      name: data.name,
      description: data.description,
    });

    if (response.status === 200) {
      setStatus('success');
      setCategory(response.data);
      if (serviceState.init) {
        setServiceState({
          ...serviceState,
          categories: serviceState.categories.map(category => {
            if (category.id === id) {
              return response.data
            }
            return category;
          })
        });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <AdminLayout title={category ? `Service Category - ${category.name}` : ''}>
      {category ?
        <div className="max-w-3xl mx-auto space-y-8">
          <form className="bg-white shadow p-8 space-y-4" onSubmit={handleSubmit(handleUpdate)}>

            <label className="block text-sm space-y-2">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                className="inputText w-full"
                defaultValue={category.name}
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
                defaultValue={category.description}
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
        :
        <Loading />
      }

    </AdminLayout>
  );
};

export default AdminServiceCategoryEdit;