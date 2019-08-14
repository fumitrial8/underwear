class Comment < ApplicationRecord
  belongs_to :brand

  def rating_average
    self.average(:sexy_rate)
  end

end
