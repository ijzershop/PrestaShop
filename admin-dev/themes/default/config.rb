#require 'compass/import-once/activate'
# Require any additional compass plugins here.
Encoding.default_external = 'utf-8'

css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"
fonts_dir = "fonts"

output_style = :compressed
environment = :production

sass_options = {:unix_newlines => true}

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
line_comments = false
color_output = false

preferred_syntax = :sass
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
