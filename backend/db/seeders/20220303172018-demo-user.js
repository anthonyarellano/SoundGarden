'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users',
      [
        {
          email: 'demo@user.io',
          username: 'VarianWrynn',
          hashedPassword: bcrypt.hashSync('dualwield'),
          imgUrl: "https://static.wikia.nocookie.net/wowwiki/images/5/53/Varian_Wrynn.jpg/revision/latest/scale-to-width-down/1000?cb=20151108215419",
          bannerUrl: "https://i.pinimg.com/originals/7b/d5/df/7bd5df5ea4c35fae72d6b0dff4907503.jpg"
        },
        {
          email: 'anthonyarellano@user.io',
          username: 'Anthony Arellano',
          hashedPassword: bcrypt.hashSync('password'),
          imgUrl: "https://tonesbucket.s3.amazonaws.com/anthony-profile-picture.jpg",
          bannerUrl: "https://tonesbucket.s3.amazonaws.com/anthony-banner-pic.jpg"
        },
        {
          email: 'cocoblue@user.io',
          username: "Coco Blue",
          hashedPassword: bcrypt.hashSync('password'),
          imgUrl: "https://tonesbucket.s3.amazonaws.com/cocoblue-profile-pic.jpg",
          bannerUrl: "https://tonesbucket.s3.amazonaws.com/coco-blue-wide-banner-pic.png"
        },
        {
          email: 'shutter@user.io',
          username: "Shutter",
          hashedPassword: bcrypt.hashSync('password'),
          imgUrl: "https://tonesbucket.s3.amazonaws.com/shutter-profile-picture.jpg",
          bannerUrl: "https://tonesbucket.s3.amazonaws.com/shutter-banner-pic-wide.png"
        },
        {
          email: 'theneverends@user.io',
          username: "The Neverends",
          hashedPassword: bcrypt.hashSync('password'),
          imgUrl: "https://tonesbucket.s3.amazonaws.com/theneverends-profile-picture.jpg",
          bannerUrl: "https://tonesbucket.s3.amazonaws.com/neverends-banner-pic-wide.png"
        },
        {
          email: 'toneflow@user.io',
          username: "Toneflow",
          hashedPassword: bcrypt.hashSync('password'),
          imgUrl: "https://tonesbucket.s3.amazonaws.com/toneflow-pro-pic.png",
          bannerUrl: "https://tonesbucket.s3.amazonaws.com/toneflow-banner-pic.png"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['VarianWrynn'] }
    }, {});
  }
};
