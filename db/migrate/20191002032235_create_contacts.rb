class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.text :subject
      t.text :text
      t.string :nickname
      t.string :country
      t.string :sex
      t.integer :age
      t.references :brands
      t.timestamps
    end
   
  end
end
