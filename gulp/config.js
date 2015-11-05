var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    },
    port: 3005
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest + '/css',
    settings: {
      //indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'img' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/img/**",
    dest: dest + "/img"
  },
  sound: {
    src: src + "/snd/**",
    dest: dest + "/snd"
  },
  markup: {
    src: src + "/*.{html,htm,php}",
    dest: dest
  },
  favicon: {
    src: src + "/favicon.ico",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/index.js',
      dest: dest,
      outputName: 'index.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest
  }
};
