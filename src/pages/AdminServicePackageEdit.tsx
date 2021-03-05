import React from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { Loading, SelectPrimary } from "components/General/Basic";
import serviceAtom, { Package } from "atoms/service";
import { useRecoilState } from "recoil";
import { Button } from "components/General/Basic";
import api from "api";

const serviceTargetOptions = [
  { value: 'ALL', label: 'All' },
  { value: 'MEN', label: 'Men' },
  { value: 'WOMEN', label: 'Women' },
];

const serviceTargetOptionsHash = {
  ALL: { value: 'ALL', label: 'All' },
  MEN: { value: 'MEN', label: 'Men' },
  WOMEN: { value: 'WOMEN', label: 'Women' },
};

const serviceTypeOptions = [
  { value: 'SINGLE', label: 'Single' },
  { value: 'MIXED', label: 'Mixed' },
];

const serviceTypeOptionsHash = {
  SINGLE: { value: 'SINGLE', label: 'Single' },
  MIXED: { value: 'MIXED', label: 'Mixed' },
};

const findCategoryOption = (options: any[], value: string) => {
  const option = options.filter(option => option.value === value);
  if (option.length) {
    return option[0];
  }
  return null;
};

const findPackageOptions = (options: any[], values: string[]) => {
  const result = options.filter(option => values.includes(option.value.id));
  return result;
};

const AdminServicePackageEdit: React.FC = () => {

  const { id }: any = useParams();
  const [serviceState, setServiceState] = useRecoilState(serviceAtom);
  const [pack, setPack] = React.useState<Package | null>(null);
  const { register, handleSubmit, errors, reset, control } = useForm();
  const serviceType: any = useWatch({
    control,
    name: 'type',
  });
  const packages: any = useWatch({
    control,
    name: 'packages',
  });
  const [packageError, setPackageError] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [categoryOptions, setCategoryOptions] = React.useState<any[]>([]);
  const [packageOptions, setPackageOptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!pack) {
      const load = async () => {
        const response = await api.post('/service/package', { id });
        if (response.status === 200) {
          setPack(response.data.pack);
          setServiceState({
            init: true,
            categories: response.data.categories,
            packages: response.data.packages
          });
        }
      };
      load();
    }
  }, [id, pack, setServiceState]);

  React.useEffect(() => {
    if (!categoryOptions.length) {
      setCategoryOptions(serviceState.categories.map(category => ({
        value: category.id,
        label: category.name
      })));
    }

    if (!packageOptions.length) {
      setPackageOptions(serviceState.packages.filter(p => p.type === 'SINGLE').map(pack => ({
        value: pack,
        label: pack.name
      })));
    }

  }, [serviceState, categoryOptions, packageOptions]);

  const submit = async (data: any) => {

    setStatus('submit');

    const { name, description, categoryId, time, price, target, type, packages } = data;
    let request = {};

    if (type === 'SINGLE') {
      request = {
        id,
        name,
        description,
        categoryId,
        time: parseInt(time),
        price: parseInt(price),
        target,
        type,
      };
    } else {
      if (packages.length < 2) {
        setPackageError(true);
        return;
      }
      let time = 0;
      let price = 0;
      let ids: any[] = [];
      for (let i = 0; i < packages.length; i++) {
        time += packages[i].value.time;
        price += packages[i].value.price;
        ids.push(packages[i].value.id);
      }
      request = {
        id,
        name,
        description,
        categoryId,
        time,
        price,
        target,
        type,
        packages: ids
      };
    }

    const response = await api.post('/service/package_update', request);

    if (response.status === 200) {
      setPackageError(false);
      reset();
      setStatus('success');
      if (serviceState.init) {
        setServiceState({
          ...serviceState,
          packages: [
            ...serviceState.packages,
            response.data
          ]
        });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <AdminLayout title={pack ? `Sevice Package - ${pack.name}` : ''}>
      {(!serviceState.init || !pack) ?
        <Loading />
        :
        <div className="max-w-xl mx-auto space-y-8">
          {categoryOptions.length === 0 ?
            <Link to="/admin/service/category" className="btnPrimary">
              Create Category
            </Link>
            :
            <form className="bg-white shadow p-8 space-y-4" onSubmit={handleSubmit(submit)}>

              <div className="block text-sm space-y-2">
                <span className="text-gray-700">Type</span>
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: true }}
                  defaultValue={serviceTypeOptionsHash[pack.type].value}
                  render={({ onChange }) => (
                    <SelectPrimary
                      defaultValue={serviceTypeOptionsHash[pack.type]}
                      options={serviceTypeOptions}
                      onChange={(d: any) => onChange(d.value)}
                    />
                  )}
                />
                {errors.type && <div className="text-red-600">This field is required</div>}
              </div>

              <div className="block text-sm space-y-2">
                <span className="text-gray-700">Category</span>
                <Controller
                  control={control}
                  name="categoryId"
                  rules={{ required: true }}
                  defaultValue={findCategoryOption(categoryOptions, pack.categoryId).value}
                  render={({ onChange }) => (
                    <SelectPrimary
                      options={categoryOptions}
                      onChange={(d: any) => onChange(d.value)}
                      defaultValue={findCategoryOption(categoryOptions, pack.categoryId)}
                    />
                  )}
                />
                {errors.categoryId && <div className="text-red-600">This field is required</div>}
              </div>

              <div className="block text-sm space-y-2">
                <span className="text-gray-700">Target</span>
                <Controller
                  control={control}
                  name="target"
                  rules={{ required: true }}
                  defaultValue={serviceTargetOptionsHash[pack.target].value}
                  render={({ onChange }) => (
                    <SelectPrimary
                      options={serviceTargetOptions}
                      onChange={(d: any) => onChange(d.value)}
                      defaultValue={serviceTargetOptionsHash[pack.target]}
                    />
                  )}
                />
                {errors.target && <div className="text-red-600">This field is required</div>}
              </div>

              <label className="block text-sm space-y-2">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  name="name"
                  className="inputText w-full"
                  defaultValue={pack.name}
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
                  defaultValue={pack.description}
                  ref={register()}
                />
              </label>

              {serviceType === 'SINGLE' &&
                <>
                  <label className="block mt-4 text-sm space-y-2">
                    <span className="text-gray-700 ">Time (unit: minute)</span>
                    <input
                      type="number"
                      name="time"
                      className="inputText w-full"
                      defaultValue={pack.time}
                      ref={register({ required: true })}
                    />
                    {errors.time && <div className="text-red-600">This field is required</div>}
                  </label>

                  <label className="block mt-4 text-sm space-y-2">
                    <span className="text-gray-700 ">Price (unit: RON)</span>
                    <input
                      type="number"
                      name="price"
                      className="inputText w-full"
                      defaultValue={pack.price}
                      ref={register({ required: true })}
                    />
                    {errors.price && <div className="text-red-600">This field is required</div>}
                  </label>
                </>
              }

              {(serviceType === 'MIXED' || pack.type === 'MIXED') &&
                <div className="block text-sm space-y-2">
                  <span className="text-gray-700">Packages</span>
                  {packageOptions.length > 0 ?
                    <Controller
                      control={control}
                      name="packages"
                      defaultValue={findPackageOptions(packageOptions, pack.packages)}
                      render={({ onChange }) => (
                        <SelectPrimary
                          isMulti
                          options={packageOptions}
                          onChange={onChange}
                          defaultValue={findPackageOptions(packageOptions, pack.packages)}
                        />
                      )}
                    />
                    :
                    <div className="py-3 px-4 bg-gray-100 rounded-md">No Single Packages to Select</div>
                  }
                  {packageError && packages.length < 2 && <div className="text-red-600">Minimum Length: 2</div>}
                </div>
              }

              <Button
                className="btnPrimary w-32"
                waiting={status === 'submit'}
                success={status === 'success'}
                error={status === 'error'}
              >
                Submit
              </Button>

            </form >
          }
        </div>
      }
    </AdminLayout>
  );
};

export default AdminServicePackageEdit;