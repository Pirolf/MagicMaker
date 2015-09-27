class SetDefaultAttackDefense < ActiveRecord::Migration
  def change
  	change_column :cards, :attack, :integer, :default=>0
  	change_column :cards, :defense, :integer, :default=>0
  	change_column :cards, :desc, :text, :limit=>1024
  end
end
