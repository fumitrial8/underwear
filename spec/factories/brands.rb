FactoryBot.define do
  factory :brand do
    name {Faker::Company.name}
    country {Faker::Nation.nationality}
    image {File.open("#{Rails.root}/public/images/sample.png")}
  end
end