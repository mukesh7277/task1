import axios from 'axios';
// do not use api manager for external api calls. only to be used with strapi backend api
class Manager {
  constructor(AuthStore = {}) {
    this.AuthStore = AuthStore;
  }

  get = async (url, jwt = null) => {
    let headers = this.setAuthorizationHeader(jwt);
    try {
      var res = await axios.get(url, {headers: headers});
      return await res.data;
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  };

  post = async (url, data, jwt = null) => {
    let headers = this.setAuthorizationHeader(jwt);
    // console.log(url, data, jwt, "POSTPOST")
    // var res = await axios.post(url, data, { headers: headers })
    // console.log(res, "RESinManager")
    try {
      var res = await axios.post(url, data, {headers: headers});
      return res.data;
    } catch (error) {
      this.handleError(error, 'handling error');
      return 0;
    }
  };

  put = async (url, data, jwt = null) => {
    let headers = this.setAuthorizationHeader(jwt);
    try {
      var res = await axios.put(url, data, {headers: headers});
      // console.log(res)
      // let {data} = res
      return await res.data;
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  };

  delete = async (url, data, jwt = null) => {
    let headers = this.setAuthorizationHeader(jwt);
    let response = null;
    try {
      if (data) response = await axios.delete(url, data, {headers: headers});
      else response = await axios.delete(url, {headers: headers});
      // console.log(res)
      // let {data} = res
      return await response.data;
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  };

  handleError = (error) => {
    // console.log(error, "handling error")
    let response =
      typeof error.response !== 'undefined' ? error.response : null;

    if (response) {
      let responseStatusExists = typeof response.status !== 'undefined';
      if (responseStatusExists) {
        switch (response.status) {
          case 401:
            this.AuthStore.setAuthStateToAuthFailed();
            if (response.data.message == 'Invalid token.') {
              this.AuthStore.postAuthFailedRedirect();
            }
            break;
          case 403:
            console.log(
              'Please make sure you are LoggedIn and have the access to use this feature. Thank you!',
            );
            break;
          case 404:
            console.log(
              'Oops, something  went wrong.. Please wait while we inform our team',
            );
            break;
          case 405:
            console.log('NOT ALLOWED');
            break;
          default:
            break;
        }
      }
    } else {
      if (error.isAxiosError && error.message == 'Network Error') {
        console.log(
          'Uh oh! there seems to be an issue with the web app communication module. We have taken note of this issue and will fix it shortly!',
          error,
        );
      } else {
        console.log('Something went wrong, Please try again later');
      }
    }

    return false;
  };

  setAuthorizationHeader = (jwt) => {
    let headers;
    jwt != null
      ? (headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        })
      : this.AuthStore.jwt != null && typeof this.AuthStore.jwt != 'undefined'
      ? (headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.AuthStore.jwt,
        })
      : (headers = {});
    return headers;
  };
}

export default Manager;
