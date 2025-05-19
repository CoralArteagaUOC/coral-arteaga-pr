import GoogleButton from 'react-google-button';
import { UserAuth } from './context/UserAuth';
import {useNavigate} from 'react-router-dom';


const Signin = () => {
  // one call, grab everything you need
 const { user, googleSignIn, logOut } = UserAuth();
 const navigate = useNavigate()


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/page2');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Sign In</h1>
      <div className="max-w-[240px] m-auto p-4">
        {user ? (
          <button onClick={handleSignOut}>Log Out</button>
        ) : (
          <GoogleButton onClick={handleGoogleSignIn} />
        )}
      </div>
    </div>
  );
};

export default Signin;
