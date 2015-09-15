class AddImageArtColumnToCards < ActiveRecord::Migration
  def up
  	add_attachment :cards, :image_art
  end

  def down
  	remove_attachment :cards, :image_art
  end
end
