import { useForm } from 'react-hook-form';
import './LoginPage.css';
import { login } from '../../services/userServices';
import { useState } from 'react';

const LoginPage = () => {
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = async (formData) => {
    try {
      await login(formData);
    } catch (error) {
      setFormError(error.response.data.message);
    }
  };
  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register('email', { required: '이메일을 입력해주세요.' })}
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
            {errors.email && <em className="form_error">{errors.email.message}</em>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: '패스워드를 입력해주세요.',
                minLength: { value: 4, message: '패스워드는 최소 4자 이상.' },
              })}
              id="password"
              className="form_text_input"
              placeholder="패스워드"
            />
            {errors.password && <em className="form_error">{errors.password.message}</em>}
          </div>

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
