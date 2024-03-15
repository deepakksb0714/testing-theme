//Include Both Helper File with needed methods


import { getFirebaseBackend } from '../../helpers/firebase_helper';
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { postFakeLogin, postJwtLogin } from '../../helpers/fakebackend_helper';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';






export const loginUser = (user: any, history: any, clientId: string, userPoolId: string) => async (dispatch: any) => {


const poolData = {
  UserPoolId: userPoolId || 'us-east-1_6GoE7M6nV',
  ClientId: clientId || '4o6eqfi6dkc3u6vvmrq5um475r'
};
// const poolData = {
//   UserPoolId: 'us-east-1_6GoE7M6nV',
//   ClientId:  '4o6eqfi6dkc3u6vvmrq5um475r'
// };
  const userPool = new CognitoUserPool(poolData);
  try {
    console.log('Data to be sent:', { user });

    const authenticationData = {
      Username: user.email,
      Password: user.password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: user.email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Sign in Successful');
        
        // Store user data in session storage
        sessionStorage.setItem('authUser', JSON.stringify(result));

        // Redirect to dashboard
        history('/dashboard');
      },
      onFailure: (error) => {
        console.error('Sign in error:', error);
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        delete userAttributes.email_verified;
        delete userAttributes.email;
      
        const newPassword = prompt('Please enter a new password:');
        if (newPassword) {
          cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess: (session) => {
              console.log('Password changed successfully');
              alert('Password changed successfully');
              history('/dashboard');
            },
            onFailure: (err) => {
              console.error('Failed to change password:', err);
            }
          });
        } else {
          console.error('New password is required but no password provided');
        }
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
  }
};



export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type: any, history: any) => async (dispatch: any) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
      
    }
    //  else {
    //   response = postSocialLogin(data);
    // }

    const socialdata = await response;
    if (socialdata) {
      localStorage.setItem("authUser", JSON.stringify(socialdata));
      dispatch(loginSuccess(socialdata));
      history('/dashboard');
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};