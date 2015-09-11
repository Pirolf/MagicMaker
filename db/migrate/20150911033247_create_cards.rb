class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :image_path
      t.string :colors
      t.integer :attack
      t.integer :defense
      t.string :desc

      t.timestamps null: false
    end
  end
end
