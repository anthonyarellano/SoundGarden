'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs',
      [
        {
          userId: 2,
          url: "https://tonesbucket.s3.amazonaws.com/floyd.mp3",
          title: "Floyd",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/anthony-profile-picture.jpg",
        },
        {
          userId: 2,
          url: "https://tonesbucket.s3.amazonaws.com/Strawberry+milkshake.mp3",
          title: "Strawberry Milkshake",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/anthony-profile-picture.jpg",
        },
        {
          userId: 2,
          url: "https://tonesbucket.s3.amazonaws.com/Summer+Days.mp3",
          title: "Summer Days",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/anthony-profile-picture.jpg",
        },
        {
          userId: 3,
          url: "https://tonesbucket.s3.amazonaws.com/wash.mp3",
          title: "Wash",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/wash-art.png",
        },
        {
          userId: 4,
          url: "https://tonesbucket.s3.amazonaws.com/Shine+On+Me.mp3",
          title: "Shine On Me",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/shine+on+me.PNG",
        },
        {
          userId: 4,
          url: "https://tonesbucket.s3.amazonaws.com/Shutter+-+Call+Me+Back+(Official+Music+Video).mp3",
          title: "Call Me Back",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/call+me+back.PNG",
        },
        {
          userId: 4,
          url: "https://tonesbucket.s3.amazonaws.com/Shutter+-+Missing+You+(Official+Music+Video).mp3",
          title: "Missing You",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/missing+you.PNG",
        },
        {
          userId: 5,
          url: "https://tonesbucket.s3.amazonaws.com/2.+Pretty+Girls.mp3",
          title: "Pretty Girls",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/prettygirls-pic.PNG",
        },
        {
          userId: 5,
          url: "https://tonesbucket.s3.amazonaws.com/3.+Outta+This+World!.mp3",
          title: "Outta This World!",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/outta-world-pic.PNG",
        },
        {
          userId: 5,
          url: "https://tonesbucket.s3.amazonaws.com/9.+Aphrodite's+Gun+Shoes.mp3",
          title: "Aphrodite's Gun Shoes",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/aphrodite-pic.PNG",
        },
        {
          userId: 6,
          url: "https://tonesbucket.s3.amazonaws.com/Afterglow.mp3",
          title: "Afterglow",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/toneflow-pro-pic.png"
        },
        {
          userId: 6,
          url: "https://tonesbucket.s3.amazonaws.com/bulbasaur+used+sleep+powder.mp3",
          title: "bulbasaur used sleep powder",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/toneflow-pro-pic.png"
        },
        {
          userId: 6,
          url: "https://tonesbucket.s3.amazonaws.com/Reverie_Final(Master2).mp3",
          title: "Reverie",
          imgUrl: "https://tonesbucket.s3.amazonaws.com/toneflow-pro-pic.png"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      Example:
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
