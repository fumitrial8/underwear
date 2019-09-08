class Brand < ApplicationRecord
  validates :name, presence: true
  mount_uploader :image, ImageUploader
  has_many :comments

  
end
