'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};
//return a new promise that looks through galleries and finds the pic with the same ID as the parameter you pass in. resolve with the gallery ID

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');
    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      let data = {
        name: picData.name,
        desc: picData.desc,
        file: picData.file
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: data
      });
    })
    .then(res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(galleryData, picData) {
    $log.debug('picService.deletePic()');

    return authService.getToken()
    .then(token => {
      let url = `${API_URL}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config); //will remove from mongo
    })
    .then(() => {
      for (let i=0; i< galleryData.pics; i++) {
        let current = galleryData.pics[i];
        if(current._id === picData._id) {
          galleryData.pics.splice(i, 1);
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
