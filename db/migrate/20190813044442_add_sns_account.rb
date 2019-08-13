class AddSnsAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :instagram, :string
  end
end
