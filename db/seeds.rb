# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

csv_data = CSV.read('db/underwear.csv', headers: true)
csv_data.each do |data|
  Brand.create!(
    name: data[1],
    country: data[2],
    image: data[3],
    url: data[4],
    instagram: data[5],
    twitter: data[6],
    facebook: data[7],
    youtube: data[8],
    line: data[9],
    vimeo: data[10],
    pinterest: data[11],
    tumblr: data[12],
    linkedin: data[13],
    snapchat: data[14],
    flickr: data[15]
  )
end

user = User.create(
  user: "example",
  email: "example@example.com",
  password: "11111111",
  password_confirmation: "11111111",
  admin: true
)
