class AddCountryToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :country, :string
  end
end
