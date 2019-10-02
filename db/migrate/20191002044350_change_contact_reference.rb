class ChangeContactReference < ActiveRecord::Migration[5.2]
  def up
    remove_reference :contacts, :brands,index: true
  end
  
  def change
    
    
    add_reference :contacts, :brand, foreign_key: true
  end
end
