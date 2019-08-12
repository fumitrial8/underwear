class Brand < ApplicationRecord
  validates :name, presence: true
  validates :country, presence: true
  mount_uploader :image, ImageUploader
end
