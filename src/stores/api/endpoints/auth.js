import constants from "./constants"
const authEndpoints = {}
authEndpoints.auth = {
  login: `${constants.apiHostUrl}/auth/local`,
  register: `${constants.apiHostUrl}/auth/local/register`,
  delPrtnrStatus: `${constants.apiHostUrl}/delivery-partners/`,
  provider_callback: ({
    providerName,
    providerAccessToken,
    providerTokenType,
    providerTokenExpiresIn,
  }) =>
    `${constants.apiHostUrl}/auth/${providerName}/callback?access_token=${providerAccessToken}&raw[token_type]=${providerTokenType}&raw[expires_in]=${providerTokenExpiresIn}`,
}
authEndpoints.setApiHost = (apiHost) => (constants.apiHostUrl = apiHost)

export default authEndpoints
