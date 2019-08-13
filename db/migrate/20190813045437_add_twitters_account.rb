class AddTwittersAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :twitter, :string
    add_column :brands, :facebook, :string
  end
end
