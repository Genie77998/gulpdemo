var src = "src/static";
var min = 'src/min';
var tepm = 'src/temp';
module.exports = {
    temp: {
        sass: {
            src: src + '/sass/**/*',
            dest: src + '/css'
        },
        css: {
            src: src + '/css/**/*',
            dest: tepm + '/css'
        },
        js: {
            src: src + '/js/**/*',
            dest: tepm + '/js'
        },
        images: {
            src: src + '/images/**/*',
            dest: tepm + '/images'

        }
    },
    min: {
        css: {
            src: tepm + '/css/**/*',
            dest: min + '/css'
        },
        js: {
            src: tepm + '/js/**/*',
            dest: min + '/js'
        },
        images: {
            src: tepm + '/images/**/*',
            dest: min + '/images'

        }
    },

}
