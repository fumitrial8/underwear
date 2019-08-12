class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.string :name 
      t.string :country

      t.timestamps
    end
  end
end
