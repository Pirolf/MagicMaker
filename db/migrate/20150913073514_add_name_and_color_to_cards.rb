class AddNameAndColorToCards < ActiveRecord::Migration
  def change
  	add_column :cards, :name, :string
  	add_column :cards, :color, :string, {default: '', index: true}
  end
end
