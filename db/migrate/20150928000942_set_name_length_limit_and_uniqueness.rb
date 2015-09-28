class SetNameLengthLimitAndUniqueness < ActiveRecord::Migration
  def change
  	change_column :cards, :name, :string, limit: 64, null: false, index: true
  	change_column :cards, :attack, :integer, in: 0.99, default: 0
  	change_column :cards, :defense, :integer, in: 0.99, default: 0
  	
  	change_column :cards, :mana_red, :integer, in: 0..99, default: 0
  	change_column :cards, :mana_green, :integer, in: 0..99, default: 0
  	change_column :cards, :mana_blue, :integer, in: 0..99, default: 0
  	change_column :cards, :mana_black, :integer, in: 0..99, default: 0
  	change_column :cards, :mana_white, :integer, in: 0..99, default: 0
  	change_column :cards, :mana_none, :integer, in: 0..99, default: 0
  end
end
