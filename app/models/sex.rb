class Sex < ActiveHash::Base
  self.data = [
  {:id=>1, :name=>"Male"},
  {:id=>2, :name=>"Female"}, 
  {:id=>3, :name=>"Trans"},
  {:id=>4, :name=>"Bi"}
]
end