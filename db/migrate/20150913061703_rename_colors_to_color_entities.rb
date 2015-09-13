class RenameColorsToColorEntities < ActiveRecord::Migration
  def change
  	rename_table :colors, :color_entities
  end
end
