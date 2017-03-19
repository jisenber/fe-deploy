'use strict';

require('./_gallery-item.scss');

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<' //bindings create an instance of a component
  }
};

function GalleryItemController($log, galleryService) {
  this.$onInit = () => {
    $log.debug('GalleryItemController');
    this.showEditGallery = false;
    this.deleteGallery = function(galleryID) {
      return galleryService.deleteGallery(galleryID);
    };
  };
}
