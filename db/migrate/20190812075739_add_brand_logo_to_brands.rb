class AddBrandLogoToBrands < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :image, :string
  end
end
