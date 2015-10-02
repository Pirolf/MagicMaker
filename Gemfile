source 'https://rubygems.org'

ruby '2.1.2'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

gem 'bootstrap-sass', '~> 3.3.5.1'
gem 'bootstrap-will_paginate', '~> 0.0.10'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# Use paperclip for image upload
gem "paperclip", "~> 4.3"

gem 'will_paginate', '~> 3.0.7'
# paperclip requires < 2.0 aws sdk
gem 'aws-sdk',  '< 2.0'
gem "rmagick", "~> 2.15"
# Use jquery as the JavaScript library
gem 'jquery-rails'

#gem "browserify-rails", "~> 1.4.0"
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'sqlite3',  '1.3.10'
  gem 'rspec-rails', '~> 3.3.3'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '3.4.0'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '1.1.3'
end

group :production do
  gem 'pg',             '0.17.1'
  gem 'rails_12factor', '0.0.2'
end

