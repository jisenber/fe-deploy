module.exports = function() {
  return function fuzz(galleries, str='') {
    let pattern = `.*${str.split('').join('.*')}.*`;
    let result =  new RegExp(pattern, 'i', 'g');
    return galleries.filter(gallery => result.test(gallery.name.toUpperCase()));
  };
};

//think of: not just uppercasing everything but also the first letter of the word
