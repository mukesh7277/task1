import axios from 'axios';
import {geoToH3} from 'h3-reactnative';
import jwt_decode from 'jwt-decode';
import {makeAutoObservable} from 'mobx';
import endpoints from './api/endpoints/auth';
//maintain authentication,authorization and user meta data(viz. bio, kyc, location, status,etc)
class AuthStore {
  constructor({apiManager = null}) {
    this.jwt = null;
    this.authState = 'UNKNOWN';
    this.user = null;
    this.providerName = null;
    this.providerAccessToken = null;
    this.isHyderated = false;
    this.storeName = 'AuthStore';
    this.delivery_partner_coordinates = {
      lat: null,
      long: null,
      h3Index: null,
      last_updated_at: null,
    };
    if (apiManager) {
      this.apiManager = apiManager;
    }
    
    this.storageExclusions = ['authStore'];
    makeAutoObservable(this);
  }

  hyderated = () => {
    this.isHyderated = true;
  };

  // All setter actions go here. All observable must be set through an action in order to allow state tracking
  setAuthStateToAuthenticated = () => {
    this.authState = 'AUTHENTICATED';
  };

  setAuthStateToLoginFailed = () => {
    this.authState = 'LOGINFAILED';
  };

  setAuthStateToAuthFailed = () => {
    this.authState = 'AUTHFAILED';
  };

  setAuthStateToUnknown = () => {
    this.authState = 'UNKNOWN';
  };

  setAuthStateToLoggedOut = () => {
    this.authState = 'LOGGEDOUT';
  };

  setAuthStateToLoggingIn = () => {
    this.authState = 'LOGGINGIN';
  };

  setAuthStateToLoggingOut = () => {
    this.authState = 'LOGGINGOUT';
  };

  // Shouldn't happen on client side
  setJwt = (jwt) => {
    this.jwt = jwt;
  };
  setUser = (user) => {
    this.user = user;
  };

  setProviderAccessToken = (providerName, accessToken) => {
    this.providerName = providerName;
    this.providerAccessToken = accessToken;
  };

  setProviderTokenType = (tokentype) => {
    this.providerTokenType = tokentype;
  };

  setProviderTokenExpiresIn = (expiresIn) => {
    this.providerTokenExpiresIn = expiresIn;
  };

  // All sideeffect/api call actions go here.
  authProvider = async () => {
    let url;
    // if (this.providerName == 'facebook')
    // url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/${this.providerName}/callback?access_token=${this.providerAccessToken}&raw[token_type]=${this.providerTokenType}&raw[expires_in]=${this.providerTokenExpiresIn}`
    url = endpoints.auth.provider_callback({
      providerName: this.providerName,
      providerAccessToken: this.providerAccessToken,
      providerTokenType: this.providerTokenType,
      providerTokenExpiresIn: this.providerTokenExpiresIn,
    });
    // if (this.providerName == 'google')
    // 	url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/google/callback?access_token=${this.providerAccessToken}&raw[token_type]=${this.facebookRawTokenType}&raw[expires_in]=${this.facebookRawExpiresIn}`;
    try {
      var res = await axios.get(url);
      this.setJwt(res.data.jwt);
      this.setUser(res.data.user);
      this.setAuthStateToAuthenticated();
      return 1;
    } catch (error) {
      console.log('loginfailedauthprovider', error);
      this.setAuthStateToLoginFailed();
      return 0;
    }
  };

  login = async ({identifier, password}) => {
    this.setAuthStateToLoggingIn();
    try {
      var res = await axios.post(endpoints.auth.login, {identifier, password});
      console.log(res.data.user.delivery_partner, 'DELIVERY PARTNER');
      if (!res.data.user.delivery_partner) {
        console.log('loginfailed', error);
        console.log(endpoints.auth.login);
        this.setAuthStateToLoginFailed();
        return 0;
      }
      if (res.data.jwt) {
        this.setJwt(res.data.jwt);
        this.setUser(res.data.user);
        this.setAuthStateToAuthenticated();
        return 1;
      }
    } catch (error) {
      console.log('loginfailed', error);
      console.log(endpoints.auth.login);
      this.setAuthStateToLoginFailed();
      return 0;
    }
  };

  register = async ({email, username, password}) => {
    try {
      var res = await axios.post(endpoints.auth.register, {
        email,
        username,
        password,
      });
      if (res.data.jwt) {
        this.setJwt(res.data.jwt);
        this.setUser(res.data.user);
        this.setAuthStateToAuthenticated();
        return 1;
      }
    } catch (error) {
      console.log('loginfailed', error);
      console.log(endpoints.auth.login);
      this.setAuthStateToLoginFailed();
      return 0;
    }
  };

  // shouldn't really do it on client side. do serverside
  isJwtValid = (jwt) => {
    let jwtDecoded = null;
    // decode the jwt
    if (jwt) {
      jwtDecoded = jwt_decode(jwt);
      // Currently we are only validating if jwt is expired or not
      const now = Date.now().valueOf() / 1000;
      if (typeof jwtDecoded.exp !== 'undefined' && jwtDecoded.exp < now) {
        // console.log('Houston, jwt is not valid (expired)')
        return 0;
      } else {
        // console.log('Houston, jwt is valid (not expired)')
        this.setAuthStateToAuthenticated();
        // this.loadUserFromLocalStorage()
        return 1;
      }
    } else {
      return 0;
    }
  };

  storeUserToLocalStorage = () => {};

  postLogoutClientCleanup = () => {
    // localForage.clear()
    this.setAuthStateToLoggedOut();
    this.setJwt(null);
    this.setUser(null);
  };

  postLoginClientSetup = () => {};

  redirectToHome = () => {};

  postLoginRedirect = () => {};

  postLogoutRedirect = () => {};

  postAuthFailedRedirect = () => {};

  set_delivery_partner_last_known_coordinates = ({
    lat = null,
    long = null,
    h3Index = null,
  }) => {
    let coords = {
      lat: lat ? lat : null,
      long: long ? long : null,
      h3Index: h3Index ? h3Index : lat && long ? geoToH3(lat, long, 7) : null,
      last_updated_at: new Date(),
    };
    this.delivery_partner_coordinates = coords;
  };

  setDeliveryPartnerStatus = async (status) =>
  {

    console.log("setDeliveryPartnerStatus -> "+endpoints.auth.delPrtnrStatus+this.user.delivery_partner.id)
      //this.apiManager.put(endpoints.auth.delPrtnrStatus+this.user.delivery_partner.id,{status: status?"ACTIVE_ACCEPTING":INACTIVE});
    var data = await axios.put(endpoints.auth.delPrtnrStatus+this.user.delivery_partner.id,{status: status?"ACTIVE_ACCEPTING":INACTIVE});
    console.log("responce ")
    console.log(data.data)
  }
}

export default AuthStore;
