import constants from './constants';
const orderEndpoints = {};
orderEndpoints.order = {
  get: `${constants.apiHostUrl}/orders`,
  assignOrder: `${constants.apiHostUrl}/delivery-partners`,
};
orderEndpoints.setApiHost = (apiHost) => (constants.apiHostUrl = apiHost);

export default orderEndpoints;
