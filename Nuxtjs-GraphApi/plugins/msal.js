import Vue from 'vue' //import Vue if you want to use the framework.globalMixin option
import MSAL from 'vue-msal'

require('dotenv').config();
const {
  API
} = process.env;

export default ({
  app,
  error,
  $axios
}, inject) => {
  console.log(process.env.GRAPH_CLIENT_ID);
  inject('msal', new MSAL({
    auth: {
      clientId: process.env.GRAPH_CLIENT_ID
    }
  }, Vue /* [optional] should be passed as an argument if you want to the framework.globalMixin option*/ ))
}
