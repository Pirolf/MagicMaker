class AddIndexToColorId < ActiveRecord::Migration
  def change
  	add_index :colors, :color_id
  end
end
