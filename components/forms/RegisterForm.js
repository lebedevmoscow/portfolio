import { useForm } from 'react-hook-form'

const RegisterForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="text"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    ref={register}
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    ref={register}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    ref={register}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    ref={register}
                />
            </div>
            <div className="form-group">
                <label htmlFor="passwordConfirmation">
                    Password Confirmation
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    ref={register}
                />
            </div>
            <button type="submit" className="btn btn-main bg-blue py-2 ttu">
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
