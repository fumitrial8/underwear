class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :comment
      t.integer :sexy_rate
      t.string :animal
      t.references :brand, foreign_key: true
      t.timestamps
    end
  end
end
