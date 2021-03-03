import React from "react";
import { useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import { useSetRecoilState } from "recoil";
import AuthLayout from "components/AuthLayout";
import { Button } from "components/General/Basic";
import api from "api";
import { useForm } from "react-hook-form";

const Login: React.FC = () => {

  const history = useHistory();
  const setAuthState = useSetRecoilState(authAtom);
  const { register, handleSubmit, errors } = useForm();
  const [status, setStatus] = React.useState('');

  const submit = async (data: any) => {

    setStatus('submit');

    const response = await api.post('/auth/login', {
      email: data.email,
      password: data.password,
    });

    if (response.status === 201) {

      const { access_token, user } = response.data;

      // token & localStorage
      api.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
      });
      localStorage.setItem('token', access_token);

      // user
      setAuthState({
        init: true,
        user
      });

      // redirect
      if (user.role === 'admin') {
        history.push("/admin");
      } else {
        history.push("/user");
      }

    } else {
      setStatus('error');
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>

        <div className="w-32 px-8 mx-auto bg-black rounded-md">
          <img src="/logo-white.png" alt="" />
        </div>

        {status === 'error' &&
          <div className="py-4 text-red-600 text-center">
            Email or Password incorrect
          </div>
        }

        <label className="block text-sm space-y-2">
          <span className="text-gray-700">Email</span>
          <input type="text" className="inputText w-full" name="email" ref={register({ required: true })} />
          {errors.email && <div className="text-red-600">This field is required</div>}
        </label>

        <label className="block mt-4 text-sm space-y-2">
          <span className="text-gray-700 ">Password</span>
          <input type="password" className="inputText w-full" name="password" ref={register({ required: true })} />
          {errors.password && <div className="text-red-600">This field is required</div>}
        </label>

        <Button className="btnPrimary w-full" waiting={status === 'submit'}>
          Login
        </Button>

      </form >
    </AuthLayout>
  );
};

export default Login;