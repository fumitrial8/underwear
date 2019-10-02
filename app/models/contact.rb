class Contact < ApplicationRecord
  belongs_to :brand
  validates :subject, presence: true
  validates :age, presence: true
  validates :text, presence: true
  validates :sex, presence: true
  validates :nickname, presence: true

end
