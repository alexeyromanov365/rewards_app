require 'rails_helper'

RSpec.describe Reward, type: :model do
  let(:reward) { build(:reward) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(reward).to be_valid
    end

    it 'is not valid without a name' do
      reward.name = nil

      expect(reward).not_to be_valid
      expect(reward.errors[:name]).to include("can't be blank")
    end

    it 'is not valid without a description' do
      reward.description = nil

      expect(reward).not_to be_valid
      expect(reward.errors[:description]).to include("can't be blank")
    end

    it 'is not valid with zero points cost' do
      reward.points_cost = 0

      expect(reward).not_to be_valid
      expect(reward.errors[:points_cost]).to include('must be greater than 0')
    end

    it 'is not valid with negative points cost' do
      reward.points_cost = -1

      expect(reward).not_to be_valid
      expect(reward.errors[:points_cost]).to include('must be greater than 0')
    end
  end
end
