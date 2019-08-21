class AddInstagramShotToHome < ActiveRecord::Migration[5.2]
  def change
    add_column :brands, :instagram_one_shot, :string
  end
end
