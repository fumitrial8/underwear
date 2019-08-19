class AddInstaView < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :instagram_view, :string
  end
end
