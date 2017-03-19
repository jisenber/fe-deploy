'use strict';

describe('My angular app components', function () {
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });
  describe('the Edit Gallery Component',() => {
    it('should contain the proper component bindings', () => {
      let mockBindings = {
        gallery: {
          name: 'testName',
          desc: 'testDescription'
        }
      };
      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
      this.$rootScope.$apply();
    });
    describe('editGalleryCtrl.updateGallery()', () => {
      it('should make a valid PUT request', () => {
        let url = `http://localhost:3000/api/gallery/54321`;
        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer test token'
        };

        this.$httpBackend.expectPUT(url, {
          _id: '54321',
          name: 'test update name',
          desc: 'test update description'
        }, headers).respond(200);

        let mockBindings = {
          gallery: {
            _id: '54321',
            name:'test update name',
            desc: 'test update description'
          }
        };

        let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
        editGalleryCtrl.gallery.name = 'test update name';
        editGalleryCtrl.gallery.desc = 'test update description';
        editGalleryCtrl.updateGallery();

        this.$httpBackend.flush();
        this.$rootScope.$apply();
      });
    });
  });
  describe('the Gallery Item component', () => {
    it('should contain the proper component bindings', () => {

      let mockBindings = {
        gallery: {
          name: 'galleryItem testName',
          desc: 'galleryItem testDesc'
        }
      };
      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      expect(galleryItemCtrl.gallery.name).toEqual(mockBindings.gallery.name);
      expect(galleryItemCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);
    });
    describe('galleryItem.deleteGallery()', () => {
      it('should make a valid DELETE request', () => {

        let url = `http://localhost:3000/api/gallery/test`;
        let headers = {
          Authorization: 'Bearer test token'
        };

        this.$httpBackend.expectDELETE(url, headers).respond(204);

        let mockBindings = {
          gallery: {
            _id: 'test'
          },
          deleteGallery: function(data) {
            expect(data.gallery._id).toEqual('test')
          }
        };

        let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);

        galleryItemCtrl.deleteGallery({gallery: galleryItemCtrl.gallery});

        this.$rootScope.$apply();
        // this.$httpBackend.flush();

      });
    });
  });
});
