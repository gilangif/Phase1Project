'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.hasMany(models.PostTag, { foreignKey: "TagId"})
      Tag.belongsToMany(models.Post, {through: 'PostTag', foreignKey: 'TagId'})
    }

    
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
    hooks:{
      beforeCreate : (instance, opt)=>{
        if(instance.name === '#Artis'){
          return instance.name = `#Artis-AT`
        }else if(instance.name === '#Sport'){
          return instance.name = `#Sport-SP`
        }else if(instance.name === '#Skandal'){
          return instance.name = `#Skandal-SK`
        }else if(instance.name === '#Race'){
          return instance.name = `#Race-RC`
        }
      }
    }
  });
  return Tag;
};