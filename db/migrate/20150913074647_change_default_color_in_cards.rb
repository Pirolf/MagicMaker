class ChangeDefaultColorInCards < ActiveRecord::Migration
  def change
  	change_column :cards, :color, :string, {default: 'None', index: true}
  end
end
