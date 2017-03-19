'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', '$rootScope', 'picService', 'galleryService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
};

function ThumbnailController($log, $rootScope, picService, galleryService) {

    $log.debug('ThumbnailController');

    this.deletePic = function() {
      $log.debug('picService.deletePic');
      galleryService.getOneGallery(this.pic._id)
      .then(gallery => {
        picService.deletePic(gallery, this.pic);
      })
      .then(()=> {
        $rootScope.$apply();
      })
      .catch(console.error);
    };
}
