class RemoveNoneFromColorDefault < ActiveRecord::Migration
  def change
  	change_column :cards, :color, :string, :default => "White"
  end
end
