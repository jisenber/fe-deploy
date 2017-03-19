'use strict';

describe('my Services', function() {
    beforeEach(() => {
      angular.mock.module('cfgram');
      angular.mock.inject(($rootScope, authService, galleryService, picService, $window, $httpBackend) => {
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.galleryService = galleryService;
        this.picService = picService;
        this.$httpBackend = $httpBackend;
      })
    });
      describe('the Auth Service', () => {
        describe('authService.getToken()', () => {
          it('should return a token', () => {
            this.authService.token = null;
            this.$window.localStorage.setItem('token', 'test me');

            this.authService.getToken()
            .then(token => {
              expect(token).toEqual('test me');
            })
          .catch(err => {
            expect(err).toEqual(null);
          });

          this.$rootScope.$apply();
          });
        });
        describe('authService.logout()', () => {
          it('should nullify the token and remove it from localStorage', ()=> {
            this.$window.localStorage.setItem('token', 'test me');

            this.authService.logout()
            .then(() => {
              expect(this.$window.localStorage.getItem('token')).toEqual(null);
            })
            .catch(err => {
              console.log(err);
            });
            this.$rootScope.$apply();
          });
        });
      });
      describe('the Gallery Service', () => {
        describe('galleryService.createGallery()', () => {
          it('should create a gallery and add it to an array of available galleries', () => {
            this.$window.localStorage.setItem('token', 'test token');

            let galleryData = {
              name: 'test',
              desc: 'a test'
            };

            let headers = {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer test token'
            };

            this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)
            .respond(200, {
              _id: '4321', //totally different from class example,
              username: 'testuser',
              name: galleryData.name,
              desc: galleryData.desc,
              pics: []
            });
            this.galleryService.createGallery(galleryData)
            .then(gallery => {
              expect(this.galleryService.galleries.length).toEqual(1);
            })
            // this.$httpBackend.flush();
            this.$rootScope.$apply();
          });
        });
        describe('galleryService.fetchGalleries()', () => {
          it('should return the available array of postedgalleries', () => {
            this.$window.localStorage.setItem('token', 'test token');

            let headers = {
              Accept: 'application/json',
              Authorization: 'Bearer test token'
            };

            this.$httpBackend.expectGET('http://localhost:3000/api/gallery', headers)
            .respond(200);

            this.galleryService.fetchGalleries()
            .then(galleries => {
              expect(galleries).toEqual(undefined);
            });
            this.$rootScope.$apply();
            this.$httpBackend.flush();

          });
        });
    });
});
