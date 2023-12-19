import { useForm } from 'react-hook-form';
import './LoginPage.css';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const submitData = (formData) => console.log(formData);
  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              id="password"
              className="form_text_input"
              placeholder="패스워드"
            />
          </div>

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
