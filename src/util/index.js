const crypto = require('crypto');

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}

function pbkdf ( certificate, salt ){
  salt = salt || uuid( 32 );
  return new Promise(( resolve, reject ) => {
    crypto.pbkdf2( certificate, salt, 1, 32, 'sha256', ( err, derivedKey ) => {
      if( err ){
        return reject( err );
      }
      return resolve({
        key: derivedKey.toString('hex'),
        salt
      });
    }); 
  });
}

function paging ( req ){
    var pageIndex = 1,
        limit = 20;

    if( req.query.pageIndex ){
        pageIndex = 0 | req.query.pageIndex;
    }
    if( req.query.pageNumber ){
        limit = 0 | req.query.pageNumber;
    }
    var offset = (pageIndex - 1) * limit;
    
    return {
        offset,
        limit
    };
}

function parasmDetect ( arr, obj ){
  let failItem = null;
  for( let i = 0, len = arr.length; i < len; i++ ){
    if( !obj[ arr[ i ] ] ){
      failItem = arr[ i ];
      break;  
    }
  }
  if( failItem ){
    return {  
      failure: true,
      message: `params missing:${ failItem }`
    };
  }
  return {
    success: true
  };
}

/**
 * 从schema提取非allowNull的key
 */
function extractMeta ( obj ){
  var ks = Object.keys( obj );
  return ks.filter( k => {
    if( !k.allowNull ) return k;
  });
}

module.exports = {
    uuid,
    pbkdf,
    paging,
    extractMeta,
    parasmDetect
};