class AddSnsSites < ActiveRecord::Migration[5.2]
  def change
    remove_column :brands, :instagram_view, :string
    remove_column :brands, :instagram_one_shot, :string
    add_column :brands, :youtube, :string
    add_column :brands, :line, :string
    add_column :brands, :vimeo, :string
    add_column :brands, :pinterest, :string
    add_column :brands, :tumblr, :string
    add_column :brands, :linkedin, :string
    add_column :brands, :snapchat, :string
    add_column :brands, :flickr, :string
  end
end
