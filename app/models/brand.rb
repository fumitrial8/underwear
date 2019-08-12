class Brand < ApplicationRecord
  validates :name, presence: true
  validates :country, presence: true
end
