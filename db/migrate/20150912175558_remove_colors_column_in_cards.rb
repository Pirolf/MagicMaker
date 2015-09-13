class RemoveColorsColumnInCards < ActiveRecord::Migration
  def change
  	remove_column :cards, :colors
  end
end
