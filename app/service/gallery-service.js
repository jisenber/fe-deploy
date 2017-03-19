'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService()');

  let service = {};
  service.galleries = [];

  service.getOneGallery = function(picID) {
    let p;
    service.galleries.forEach(function(gallery) {
      gallery.pics.forEach(function(pic) {
        if (pic._id === picID) {
          console.log('LOGGIGNG GALYYER');
          console.log(gallery);
          p = gallery;
        }
      });
    }); //this seems dumb and inefficient
    // return $q.reject(new Error ('pic not found'));
    return $q.resolve(p);
  };

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then(token => {
      let req = {
        method: 'POST',
        url: `${__API_URL__}/api/gallery`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: {name: gallery.name, desc: gallery.desc}
      };
      return $http(req);
    })
    .then(res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch(err => {
      //$log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.get(url, config);
    })
      .then(res => {
        $log.log('galleries retrieved');
        service.galleries = res.data;
        return service.galleries;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
  };
  service.updateGallery = function(galleryID, galleryData) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      return $http.put(url, galleryData, config);
    })
    .then(res => {
      for (let i=0; i < service.galleries.length; i++) {
        let current = service.galleries[i];
        if(current._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.updateGallery()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for(let i=0; i< service.galleries.length; i++) {
        let current = service.galleries[i];
        if(current._id === galleryID) {
          service.galleries.splice(i, 1);
          break;
        }
      }
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
