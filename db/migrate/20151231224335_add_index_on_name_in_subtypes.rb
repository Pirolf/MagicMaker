class AddIndexOnNameInSubtypes < ActiveRecord::Migration
  def change
    add_index :subtypes, :name, order: { name: :asc }
  end
end
