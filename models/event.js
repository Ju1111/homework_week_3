'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
  }, {
    timestamps: false
  });
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};
