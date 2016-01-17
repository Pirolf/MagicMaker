# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
#Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.configure do |env|
  env.unregister_postprocessor 'application/javascript', Sprockets::SafetyColons
end
Rails.application.config.assets.precompile += %w( application.js )
Rails.application.config.assets.precompile += %w( card_edit.js )
Rails.application.config.assets.precompile += %w( card_show.js )
Rails.application.config.assets.precompile += %w( /modules/MagicMaker.js )
Rails.application.config.assets.precompile += %w( /modules/ManaBuilder.js )
Rails.application.config.assets.precompile += %w( /modules/card.js )
Rails.application.config.assets.precompile += %w( /modules/card_presenter.js )
Rails.application.config.assets.precompile += %w( card_all.js )
Rails.application.config.assets.precompile += %w( types.js )