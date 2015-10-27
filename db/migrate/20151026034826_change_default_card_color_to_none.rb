class ChangeDefaultCardColorToNone < ActiveRecord::Migration
  def change
  	change_column :cards, :color, :string, default: "None"
  end
end
