require 'rails_helper'
RSpec.describe Brand, type: :model do
  describe '#create' do
    context 'can save' do 
      it 'is valid with name country image' do
        expect(build(:brand)).to be_valid
      end

      it 'is valid with name country without image' do
        expect(build(:brand, image: nil)).to be_valid
      end
    end

    context 'cannot save' do
      it 'is invalid without name' do
        brand = build(:brand, name: nil)
        brand.valid?
        expect(brand.errors[:name]).to include('can\'t be blank')
      end
      
      it 'is invalid without country' do
        brand = build(:brand, country: nil)
        brand.valid?
        expect(brand.errors[:country]).to include('can\'t be blank')
      end
      
    end
  end
end