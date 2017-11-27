var alias = {
    '@': './',
    '@dao': './mvc/dao',
    '@service': './mvc/service',
    '@controller': './mvc/controller',
    '@util': './util'
};

Object.keys( alias ).map( k => {
    global[ k ] = alias[ k ];
});
