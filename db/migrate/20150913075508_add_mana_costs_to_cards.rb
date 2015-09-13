class AddManaCostsToCards < ActiveRecord::Migration
  def change
  	add_column :cards, :mana_none, :integer, { default: 0 }
  	add_column :cards, :mana_red, :integer, { default: 0 }
  	add_column :cards, :mana_green, :integer, { default: 0 }
  	add_column :cards, :mana_blue, :integer, { default: 0 }
  	add_column :cards, :mana_black, :integer, { default: 0 }
  	add_column :cards, :mana_white, :integer, { default: 0 }
  end
end
