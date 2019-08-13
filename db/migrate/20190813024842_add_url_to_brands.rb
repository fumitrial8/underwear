class AddUrlToBrands < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :url, :string
  end
end
