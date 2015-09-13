class RemoveTimestampsInColors < ActiveRecord::Migration
  def change
  	remove_column :colors, :created_at, :datetime
  	remove_column :colors, :updated_at, :datetime
  end
end
