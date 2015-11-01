/**
* Days.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    long: { type: 'float' },
    lat:  { type: 'float' },
    elev: { type: 'integer' },
    Julian_Day: { type: 'integer'},
    'AOTExt438-T': { type: 'float' },
    'AOT_1020': { type: 'float' },
    'Water(cm)': { type: 'float' }

  }
};
