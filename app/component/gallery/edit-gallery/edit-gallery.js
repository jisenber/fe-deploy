'use strict';

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService', EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<'
  }
};

function EditGalleryController($log, galleryService) {
  $log.debug('EditGalleryController');

  this.visible = false;

  this.toggle = function() {
    if (!this.visible) {
      this.visible = true;
      return this.visible;
    } else {
      this.visible = false;
      return this.visible;
    }
  };

  this.updateGallery = function() {
    galleryService.updateGallery(this.gallery._id, this.gallery);
  };
}
